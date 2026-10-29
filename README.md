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

### 🌐 [اضغط هنا لفتح موقع التثبيت السريع المباشر (SELOOM Wizard Online)](https://seloom-wizard.pages.dev) 🌐

---
</div>

## 🌟 المميزات الرئيسية (Features)

- 🇮🇶 **دعم الرصيد الصفري في العراق**: مدمج بآي بي نظيف مسبق الإعداد (`104.18.26.180`) متوافق مع شبكات زين وأودي العراقية ويخرج بآي بي بغداد (`104.28.157.136`).
- ⚡ **تخطي حظر كلاودفلير (Error 1101)**: مبني ليعمل عبر **Cloudflare Pages** بدلاً من الروابط التقليدية لتفادي الحظر وضمان استقرار الاتصال 24/7.
- 📱 **دعم شامل لجميع التطبيقات**:
  - **v2rayNG** / **v2rayN**
  - **Sing-box** (Outbounds جاهزة ومقسمة)
  - **Clash Verge Rev** / **Clash Meta**
  - **NekoBox** / **Streisand** / **Shadowrocket** / **Karing**
- 🛡️ **بروتوكولات متعددة**: يدعم VLESS (WebSocket / gRPC) و Trojan و WARP و WireGuard.
- 🎨 **واجهة تحكم عصرية كاملة**: لوحة إدارة أنيقة تدعم الوضع الليلي، إدارة النودات، وتوليد الاشتراكات والباركود (QR Code).
- 🤖 **بوت تيليجرام مدمج**: إمكانية ربط اللوحة ببوت تيليجرام للتحكم وتوزيع الاشتراكات تلقائياً.

---

## 🚀 التثبيت السريع بنقرة واحدة (Web Edition)

افتح الموقع المباشر للمعالج:
👉 **[https://seloom-wizard.pages.dev](https://seloom-wizard.pages.dev)**

1. أنشئ توكن من حساب كلاودفلير بصلاحيات `Workers & Pages`.
2. الصق التوكن في المعالج واختر **Cloudflare Pages**.
3. اضغط **Install SELOOM Panel**، وسيتم بناء ونشر اللوحة في حسابك وتزويدك بالرابط وبيانات الدخول فوراً!

---

## 💻 التثبيت عبر سطر الأوامر (CLI)

- **ويندوز (PowerShell)**:
  ```powershell
  irm https://raw.githubusercontent.com/seloom1/SELOOM-Wizard/main/install.ps1 | iex
  ```

- **أندرويد (Termux) ولينكس**:
  ```bash
  bash <(curl -fsSL https://raw.githubusercontent.com/seloom1/SELOOM-Wizard/main/install.sh)
  ```

---

## 🛠️ النشر اليدوي (Manual Deployment)

```bash
git clone https://github.com/seloom1/SELOOM-Worker-Panel.git
cd SELOOM-Worker-Panel
npm install
node scripts/build.js
```
الملف الناتج `dist/worker.js` جاهز للرفع مباشرة كـ `_worker.js` في **Cloudflare Pages**.

---

## 📄 الحقوق والترخيص (License & Credits)

- المشروع مفتوح المصدر تحت رخصة [GNU General Public License v3.0](LICENSE).
- تم التطوير والإعداد والتخصيص بواسطة **[Seloom (Seloom1)](https://github.com/seloom1)**.
- كل الاحترام والتقدير للمجتمع التقني المفتوح المصدر.

---
<div align="center">
  <b>Made with ❤️ by SELOOM 🇮🇶 | All Rights Reserved</b>
</div>
