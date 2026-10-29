import os
import sys
import json
import uuid
import secrets
import string
import urllib.request
import urllib.error

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
WORKER_PATH = os.path.join(PROJECT_DIR, "dist", "worker.js")

DEFAULT_ACC_ID = "b3d004f2853f355dbd39c6c66eab15f5"
DEFAULT_PROJECT_NAME = "9ebzw1drorvfv-9f5d8973gf"
DEFAULT_SECURE_PATH = "eT3xJsFyKHi30Y5G"

def rand_string(length=18):
    chars = string.ascii_letters + string.digits + "!@$&*_-+"
    return ''.join(secrets.choice(chars) for _ in range(length))

def deploy(api_token, email=None, acc_id=DEFAULT_ACC_ID, project_name=DEFAULT_PROJECT_NAME, secure_path=DEFAULT_SECURE_PATH):
    if not os.path.exists(WORKER_PATH):
        print(f"[-] Error: {WORKER_PATH} not found. Please build first using 'node scripts/build.js'")
        return False

    with open(WORKER_PATH, "r", encoding="utf-8") as f:
        original_worker = f.read()

    main_domain = f"{project_name}.pages.dev"
    vl_uuid = str(uuid.uuid4())
    tr_pass = rand_string(20)

    embeded_settings = {
        "accID": acc_id,
        "accEmail": email or "admin@seloom.iq",
        "apiToken": api_token,
        "vlUUID": vl_uuid,
        "trPass": tr_pass,
        "securePath": secure_path,
        "proxyIpMode": "custom",
        "proxyIPs": [],
        "prefixes": [],
        "fallback": "",
        "dohUrl": "https://cloudflare-dns.com/dns-query",
        "mainDomain": main_domain
    }

    embedded_js = f"const EMBEDED_SETTINGS = {json.dumps(embeded_settings)};\n"
    final_script = embedded_js + original_worker

    boundary = f"----WebKitFormBoundary{secrets.token_hex(16)}"
    
    parts = []
    # Manifest part
    parts.append(f"--{boundary}\r\n".encode())
    parts.append(b'Content-Disposition: form-data; name="manifest"\r\n\r\n')
    parts.append(b"{}\r\n")

    # _worker.js part
    parts.append(f"--{boundary}\r\n".encode())
    parts.append(b'Content-Disposition: form-data; name="_worker.js"; filename="_worker.js"\r\n')
    parts.append(b'Content-Type: application/javascript\r\n\r\n')
    parts.append(final_script.encode("utf-8"))
    parts.append(b"\r\n")
    parts.append(f"--{boundary}--\r\n".encode())

    body = b''.join(parts)

    url = f"https://api.cloudflare.com/client/v4/accounts/{acc_id}/pages/projects/{project_name}/deployments"
    req = urllib.request.Request(url, data=body, method="POST")
    req.add_header("Authorization", f"Bearer {api_token}")
    req.add_header("Content-Type", f"multipart/form-data; boundary={boundary}")

    print(f"[*] Deploying customized SELOOM Panel to project: {project_name} ...")
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode("utf-8"))
            if data.get("success"):
                print("[+] Deployment Successful!")
                print(f"[+] Login URL: https://{main_domain}/{secure_path}/login")
                print(f"[+] Panel URL: https://{main_domain}/{secure_path}/panel")
                return True
            else:
                print("[-] Deployment failed:", data.get("errors"))
                return False
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        print(f"[-] HTTP Error {e.code}: {err_body}")
        return False
    except Exception as e:
        print(f"[-] Error: {e}")
        return False

if __name__ == "__main__":
    if len(sys.argv) > 1:
        token = sys.argv[1]
        email = sys.argv[2] if len(sys.argv) > 2 else "admin@seloom.iq"
        deploy(token, email)
    else:
        print("Usage: python deploy_seloom_panel.py <CF_API_TOKEN> [CF_EMAIL]")
