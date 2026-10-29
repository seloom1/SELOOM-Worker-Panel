# ⚡ SELOOM Panel 🇮🇶

<div align="center">

![SELOOM Panel](https://img.shields.io/badge/SELOOM-Panel%20v1.0.0-0284c7?style=for-the-badge&logo=cloudflare&logoColor=white)
![Platform](https://img.shields.io/badge/Platform-Cloudflare%20Pages%20%7C%20Workers-f97316?style=for-the-badge&logo=cloudflare)
![License](https://img.shields.io/badge/License-GPL--3.0-green?style=for-the-badge)
![Maintained by](https://img.shields.io/badge/Maintained%20by-Seloom-38bdf8?style=for-the-badge)

<p align="center">
  <b>لوحة سلوم المتطورة لإدارة وتوزيع بروكسيات كلاودفلير المجانية بسرعة فائقة ودعم الرصيد الصفري في العراق والعالم</b><br>
  <b>A Powerful, Modern Cloudflare Proxy Panel with Zero-Balance Support & 1-Click Fast Deployment</b>
</p>

[✨ تثبيت سريع بنقرة واحدة (SELOOM Wizard)](https://github.com/Seloom1/SELOOM-Wizard) • [📖 الدليل وطريقة الاستخدام](#-دليل-الاستخدام) • [🚀 النشر اليدوي](#-النشر-اليدوي)

---
</div>

## 🌟 المميزات الرئيسية (Features)

- 🇮🇶 **دعم الرصيد الصفري في العراق**: مدمج بآي بي نظيف مسبق الإعداد (`104.18.26.180`) متوافق مع شبكات زين وأودي العراقية ويخرج بآي بي بغداد (`104.28.157.136`).
- ⚡ **تخطي حظر كلاودفلير (Error 1101)**: مبني ليعمل عبر **Cloudflare Pages** بدلاً من الروابط التقليدية لتفادي الحظر المؤقت وضمان استقرار الاتصال 24/7.
- 📱 **دعم شامل لجميع التطبيقات**:
  - **v2rayNG** / **v2rayN**
  - **Sing-box** (Outbounds جاهزة ومقسمة)
  - **Clash Verge Rev** / **Clash Meta**
  - **NekoBox** / **Streisand** / **Shadowrocket** / **Karing**
- 🛡️ **بروتوكولات متعددة**: يدعم VLESS (WebSocket / gRPC) و Trojan و WARP و WireGuard.
- 🎨 **واجهة تحكم عصرية كاملة**: لوحة إدارة أنيقة تدعم الوضع الليلي، إدارة النودات، وتوليد الاشتراكات والباركود (QR Code).
- 🤖 **بوت تيليجرام مدمج**: إمكانية ربط اللوحة ببوت تيليجرام للتحكم وتوزيع الاشتراكات تلقائياً.

---

## 🚀 التثبيت السريع عبر SELOOM Wizard (موصى به)

أسرع وأسهل طريقة لنشر لوحتك الخاصة خلال أقل من دقيقة دون الحاجة لكتابة أي كود:

1. افتح أداة التثبيت: [SELOOM Wizard](https://github.com/Seloom1/SELOOM-Wizard).
2. أنشئ توكن من حساب كلاودفلير بصلاحيات `Workers & Pages`.
3. الصق التوكن في المعالج واختر **Cloudflare Pages**.
4. اضغط **Install**، وسيتم بناء ونشر اللوحة في حسابك وتزويدك برابط اللوحة وبيانات الدخول فوراً!

---

## 🛠️ النشر اليدوي (Manual Deployment)

إذا أردت نشر اللوحة يدوياً باستخدام كود المشروع:

```bash
# 1. استنساخ المستودع
git clone https://github.com/Seloom1/SELOOM-Worker-Panel.git
cd SELOOM-Worker-Panel

# 2. تثبيت الحزم
npm install

# 3. بناء المشروع وتوليد الحزمة
node scripts/build.js
```

الملف الناتج `dist/worker.js` أو مجلد `deploy_to_pages/_worker.js` يمكنك رفعه مباشرة إلى **Cloudflare Pages**.

---

## 📄 الحقوق والترخيص (License & Credits)

- المشروع مفتوح المصدر ومبني تحت رخصة [GNU General Public License v3.0](LICENSE).
- تم تطوير وتخصيص هذا المشروع وإعداده بواسطة **[Seloom (Seloom1)](https://github.com/Seloom1)**.
- تحية تقدير للمشروع الأصلي والمطورين في مجتمع البرمجيات الحرة ومطوري أدوات مكافحة حجب الإنترنت.

---
<div align="center">
  <b>Made with ❤️ by SELOOM 🇮🇶 | All Rights Reserved</b>
</div>
