import { HttpStatus, respond } from '@common';
import { SignJWT, jwtVerify } from 'jose';
import { getGlobals } from '@settings';

export function logout(): Response {
    return respond(true, HttpStatus.OK, 'Successfully logged out!', null, {
        'Set-Cookie': 'jwtToken=; Path=/; Secure; SameSite=Strict; Max-Age=0; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
        'Content-Type': 'text/plain'
    });
}

export async function generateJWTToken(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'POST') {
        return respond(false, HttpStatus.METHOD_NOT_ALLOWED, 'Method not allowed.');
    }

    const data = await request.json() as any;
    let savedPass = await env.kv.get('pwd');
    const savedEmail = (await env.kv.get('user_email'))?.toLowerCase();
    const { accEmail } = getGlobals();
    const username = data.username?.toLowerCase()?.trim();
    const password = data.password?.trim();

    // If no password configured yet in KV, first login establishes the credentials!
    if (!savedPass) {
        if (!password || password.length < 4) {
            return respond(false, HttpStatus.BAD_REQUEST, 'يرجى إدخال كلمة مرور من 4 خانات أو أكثر.');
        }
        savedPass = password;
        await env.kv.put('pwd', savedPass);
        if (username) {
            await env.kv.put('user_email', username);
        }
    } else {
        // Authenticate password
        if (password !== savedPass) {
            return respond(false, HttpStatus.UNAUTHORIZED, 'كلمة المرور غير صحيحة.');
        }
        // If an email is bound, verify if username was supplied
        const expectedEmail = savedEmail || accEmail?.toLowerCase();
        if (expectedEmail && username && username !== expectedEmail && username !== accEmail?.toLowerCase()) {
            return respond(false, HttpStatus.UNAUTHORIZED, 'اسم المستخدم أو البريد الإلكتروني غير صحيح.');
        }
    }

    let secretKey = await env.kv.get('secretKey');
    if (!secretKey) {
        secretKey = generateSecretKey();
        await env.kv.put('secretKey', secretKey);
    }

    const secret = new TextEncoder().encode(secretKey);
    const { accID } = getGlobals();
    const jwtToken = await new SignJWT({ id: accID })
        .setProtectedHeader({ alg: 'HS256' })
        .setIssuedAt()
        .setExpirationTime('24h')
        .sign(secret);

    return respond(true, HttpStatus.OK, 'Successfully generated Auth token', null, {
        'Set-Cookie': `jwtToken=${jwtToken}; Path=/; HttpOnly; Secure; Max-Age=${24 * 60 * 60}; SameSite=Strict`,
        'Content-Type': 'text/plain',
    });
}

function generateSecretKey(): string {
    const array = new Uint8Array(32);
    crypto.getRandomValues(array);

    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export async function authenticate(request: Request, env: Env): Promise<boolean> {
    try {
        const secretKey = await env.kv.get('secretKey');
        if (secretKey === null) {
            console.log('Secret key not found in KV.');
            return false;
        }

        const secret = new TextEncoder().encode(secretKey);
        const cookie = request.headers.get('Cookie')?.match(/(^|;\s*)jwtToken=([^;]*)/);
        const token = cookie ? cookie[2] : null;
        if (!token) {
            console.log('Unauthorized: Token not available!');
            return false;
        }

        const { payload } = await jwtVerify(token, secret);
        console.log(`Successfully authenticated, User ID: ${payload.id}`);

        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function resetPassword(request: Request, env: Env): Promise<Response> {
    const auth = await authenticate(request, env);
    const oldPwd = await env.kv.get('pwd');
    if (oldPwd && !auth) {
        return respond(false, HttpStatus.UNAUTHORIZED, 'Unauthorized.');
    }

    const data = await request.json() as any;
    const password = data.password?.trim();
    if (!password || password.length < 4) {
        return respond(false, HttpStatus.BAD_REQUEST, 'كلمة المرور يجب أن لا تقل عن 4 خانات.');
    }

    await env.kv.put('pwd', password);
    if (data.username) {
        await env.kv.put('user_email', data.username.toLowerCase().trim());
    }

    return respond(true, HttpStatus.OK, 'تم تغيير كلمة المرور بنجاح!', null, {
        'Set-Cookie': 'jwtToken=; Path=/; Secure; SameSite=Strict; Expires=Thu, 01 Jan 1970 00:00:00 GMT',
        'Content-Type': 'text/plain',
    });
}
