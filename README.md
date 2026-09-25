# 🚀 Topdim AI — O‘zbekistondagi Birinchi AI Xarid Agenti

> **Slogan:** *“Nima kerakligini ayting. Bozorni o‘zi qidiradi.”*

[![Vercel Deployment](https://img.shields.io/badge/Vercel-Deployed-black?style=flat&logo=vercel)](https://vercel.com)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8.3-purple?style=flat&logo=vite)](https://vitejs.dev/)
[![Status](https://img.shields.io/badge/Holati-Aktiv-emerald?style=flat)]()

---

## 📌 Loyiha Haqida

O‘zbekiston e-commerce bozorida **Dunno** kabi platformalar narxlarni oddiy mahsulot nomi bo‘yicha taqqoslaydi. Biroq zamonaviy xaridor ko‘pincha qaysi modelni olishni bilmaydi, faqat o‘z ehtiyoji va budjetini biladi.

**Topdim AI** — bu shunchaki narx solishtirgich emas, balki to‘laqonli **AI Xarid Agenti (AI Shopping Agent)**:
* Foydalanuvchi mahsulot nomini emas, o‘z ehtiyojini yozadi *(masalan: «Menga 3 mln so‘mgacha telefon kerak. Batareyasi kuchli bo‘lsin, kamerasi yaxshi bo‘lsin, Yandex Taxi uchun ishlataman»)*.
* Tizim internetdagi manbalar (**Uzum Market**, **Olcha.uz**, **Asaxiy**, **Texnomart**, **MediaPark** va **OLX**) bo‘yicha tahlil o‘tkazadi.
* Bir xil mahsulotlarni birlashtiradi (**Entity Resolution**), yangi va ishlatilganini ajratadi.
* 30 kunlik narxlar medianini hisoblab, **«Bu narx qimmatmi?»** savoliga javob beradi.
* Eng muhimi: har bir mahsulot bo‘yicha **«Nega aynan bu tavsiya qilindi?»** degan aniq faktik sabablarni tushuntirib beradi.

---

## ✨ Asosiy Imkoniyatlar va Funksiyalar

### 1. 🧠 Tabiiy Tildagi AI Qidiruv (NLP Parsing)
* Matndan budjet *(«3 mln gacha» → ≤ 3 000 000 UZS)*, foydalanish maqsadi *(«Yandex Taxi», «Dasturlash», «Blogerlik»)* va ustuvorliklarni *(Batareya, Kamera, AMOLED ekran)* avtomatik ajratadi.
* O‘zbek, rus va ingliz tillaridagi so‘rovlarni tushunadi.

### 2. ⚡ Jonli Ko‘p Manbali Qidiruv (Multi-Source Search)
* **Olcha.uz:** Rasmiy mobil API orqali real vaqtdagi jonli narxlar, aksiyalar va suratlarni tortib oladi.
* **Uzum Market & Asaxiy:** Rasmiy kataloglar va qidiruv feedlari bo‘yicha narxlarni solishtiradi.
* **Texnomart & MediaPark:** Tarmoq do‘konlaridagi narxlar va muddatli to‘lov shartlarini ko‘rsatadi.
* **OLX O‘zbekiston (B/U):** Ishlatilgan mahsulotlar alohida ajratiladi, do‘kon kafolati yo‘qligi haqida ogohlantirish beriladi.

### 3. 🧩 Entity Resolution (Dublikatlarni Yo‘qotish)
Turli do‘konlardagi betartib sarlavhalar:
* *Asaxiy:* `Smartfon Xiaomi Redmi Note 13 8/256GB Midnight Black`
* *Uzum:* `Xiaomi Redmi Note 13 8/256GB qora (Global)`
* *Olcha:* `Xiaomi 13 Note 8/256 GB Qora`
* *Texnomart:* `Redmi Note 13 256GB Black`
* *OLX:* `Redmi note 13 8/256 ideal b/u`

Bularning barchasi bitta **Canonical Product (Yagona Mahsulot)** ga birlashtirilib, foydalanuvchiga bitta kartochka ichida barcha do‘konlar narxlari taqdim etiladi.

### 4. 💡 «Nega aynan bu tavsiya qilindi?» (AI Xulosasi)
Har bir mahsulot uchun foydalanuvchi talabiga mos sabablar yoziladi:
* `+` 3 000 000 so‘m budjetingiz ichida (Eng arzon yangi: 2 790 000 so‘m)
* `+` 5000 mAh batareya (Yandex Taxi smenasiga 9–10 soat GPS bilan bemalol yetadi)
* `+` 1800 nits AMOLED ekran (kunduzgi quyoshda xarita aniq ko‘rinadi)
* `+` Hozirgi narx oxirgi 30 kunlik mediandan 5.4% arzon

### 5. 📊 30 Kunlik Narxlar Tarixi va Bozor Mediani
* Interaktiv SVG grafigi orqali narxlar kunlik tebranishini kuzatish.
* **«Bu narx qimmatmi?»** algoritmi: Joriy narx 30 kunlik median narxdan necha foiz arzon yoki qimmat ekanligini fakt bilan hisoblaydi.

### 6. 🛡️ Sotuvchilar Shaffofligi (Transparency Score)
AI asossiz baho bermaydi. Sotuvchining reytingi, tekshirilgan sharhlar soni, rasmiy kafolat muddati, qaytarish siyosati va do‘kon yoshi asosida **0 dan 100 gacha ob’ektiv shaffoflik ko‘rsatkichi** chiqariladi.

### 7. 🔔 Narx Tushganda Ogohlantirish (Price Drop Alert)
Istalgan mahsulot narxi belgilangan miqdorga tushganda Telegram bot (`@topdim_alert_bot`) yoki SMS orqali tezkor xabarnoma olish imkoniyati.

### 8. ⚖️ Mahsulotlarni Yonma-Yon Taqqoslash
Tanlangan 2–3 ta mahsulotni barcha texnik ko‘rsatkichlari, batareyasi, kamerasi va do‘kon narxlari bo‘yicha bir ekranda solishtirish.

---

## 🛠️ Texnologiyalar Steki

* **Frontend:** [React 19](https://react.dev/), [Vite 8.3](https://vitejs.dev/)
* **Dizayn Tizimi:** Vanilla CSS (Obsidian Glassmorphism, Google Fonts Outfit & Inter)
* **Ikonkalar:** [Lucide React](https://lucide.dev/)
* **API & Proxy:** Vite Dev Proxy & Vercel Serverless Rewrites
* **Deploy:** [Vercel](https://vercel.com)

---

## 📁 Loyiha Tuzilishi

```text
search/
├── public/                 # Statik fayllar va piktogrammalar
├── src/
│   ├── components/         # UI komponentlari
│   │   ├── Header.jsx                # Yuqori panel, status va taqqoslash tugmasi
│   │   ├── SearchHero.jsx            # Tabiiy tildagi qidiruv va namunaviy chiplar
│   │   ├── AiPipelineVisualizer.jsx  # AI tahlili jarayoni animatsiyasi
│   │   ├── UserRequirementSummary.jsx# Foydalanuvchi talabi va platformalar filtri
│   │   ├── FunnelStats.jsx           # Ma'lumotlarni filtrlash va voronka ko'rsatkichlari
│   │   ├── ProductCard.jsx           # Mahsulot kartochkasi va do'konlar jadvali
│   │   ├── PriceHistoryModal.jsx     # 30 kunlik interaktiv narxlar grafigi
│   │   ├── SellerTransparencyModal.jsx# Sotuvchilar shaffofligi tahlili
│   │   ├── PriceAlertModal.jsx       # Telegram narx ogohlantirishini sozlash
│   │   ├── EntityResolutionModal.jsx # Dublikatlarni birlashtirish namoyishi
│   │   ├── ArchitectureModal.jsx     # Startup texnik TZ hujjati
│   │   ├── CompareDrawer.jsx         # Mahsulotlarni yonma-yon solishtirish
│   │   └── Footer.jsx                # Qamrab olingan manbalar va ma'lumotlar
│   ├── data/
│   │   └── mockData.js               # Boshlang'ich katalog va namuna so'rovlar
│   ├── services/
│   │   ├── aiParser.js               # NLP parser, funnel va dinamik reyting
│   │   └── liveSearchService.js      # Olcha Live API, O'zbekiston kengaytirilgan katalogi
│   ├── App.jsx                       # Bosh ilova boshqaruvi va reaktiv holat
│   ├── index.css                     # Master Obsidian dizayn tizimi
│   └── main.jsx                      # React kirish nuqtasi
├── .gitignore              # Git e'tiborsiz qoldiradigan fayllar
├── package.json            # Loyiha paketlari va skriptlari
├── vercel.json             # Vercel deploy va API rewrite sozlamalari
├── vite.config.js          # Vite va Olcha API proxy konfiguratsiyasi
└── README.md               # Loyiha hujjatlashuvi (O'zbek tilida)
```

---

## 🚀 O‘rnatish va Lokal Ishga Tushirish

### 1. Loyihani yuklab olish:
```bash
git clone https://github.com/Tuxtamurod-Jurayev/search.git
cd search
```

### 2. Bog‘liqliklarni o‘rnatish:
```bash
npm install
```

### 3. Dasturni ishga tushirish (Dev Server):
```bash
npm run dev
```
Brauzerda oching: `http://localhost:5173/`

### 4. Ishchi bundle yig‘ish (Production Build):
```bash
npm run build
```

---

## ☁️ Vercel Platformasiga Joylashtirish (Deployment)

Loyiha Vercel platformasi uchun 100% optimallashtirilgan:
1. `vercel.json` faylida barcha SPA yo‘nalishlari (`/(.*) -> /index.html`) to‘g‘ri sozlangan.
2. Olcha jonli API so‘rovlari (`/api/olcha/:path*`) avtomatik ravishda `https://mobile.olcha.uz/api/v2/:path*` manziliga yo‘naltiriladi, bu esa brauzerdagi CORS xatolarining oldini oladi.
3. Vercel dashboardida ushbu repozitoriyni ulab, bitta tugma orqali bexato deploy qilish mumkin.

---

## 📄 Litsenziya va Mualliflik

* **Muallif:** Tuxtamurod Jurayev
* **Repozitoriy:** [github.com/Tuxtamurod-Jurayev/search](https://github.com/Tuxtamurod-Jurayev/search.git)
* **Litsenziya:** MIT License

*Topdim AI — Bozorni o‘zi qidiradi.*
