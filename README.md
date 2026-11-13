# Shirin Buyurtma — Qandolatchi buyurtmalar boshqaruvi

> **Qandolatchi ustaning buyurtmalar daftari** — mustaqil qandolatchilar va kichik novvoyxonalar uchun qulay, nafis va zamonaviy raqamli buyurtmalar boshqaruv tizimi.

![Shirin Buyurtma Banner](https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=80)

---

## 🎂 Loyiha haqida

**Shirin Buyurtma** — shaxsiy qandolatchi ustalarning kundalik buyurtmalarini hisobga olish, mijozlar talablarini vaqtida bajarish va mahsulot topshirilish holatini tezkor nazorat qilish uchun mo‘ljallangan professional veb-ilova.

### Asosiy imkoniyatlar:
- 📊 **Dinamik statistika paneli:** Jami buyurtmalar, yangi (jarayondagi) buyurtmalar, tayyor bo‘lganlar va bugungi faol buyurtmalar soni real vaqtda hisoblanadi.
- 📋 **Professional buyurtmalar jadvali:** T/r, mijoz ismi, buyurtma tavsifi, topshirish sanasi (`DD.MM.YYYY`), rangli holat nishonlari va amallar.
- 🔍 **Qidiruv va filtrlash:** Mijoz ismi va buyurtma tavsifi bo‘yicha tezkor qidiruv, holati bo‘yicha filtrlash (`Barchasi`, `Yangi`, `Tayyor`).
- ➕ **Yangi buyurtma qo‘shish:** To‘liq tekshiruvli (validation) modal oyna orqali yangi buyurtmalarni kiritish.
- 👁 **Batafsil ma’lumot oynasi:** Har bir buyurtma tafsilotlarini alohida ko‘rish va bir bosishda "Tayyor deb belgilash".
- 🔔 **Xabarnomalar (Toasts):** Har bir amal bo‘yicha chiroyli bildirishnomalar.
- 📱 **Moslashuvchan (Responsive) dizayn:** Mobil, planshet va kompyuter ekranlariga to‘liq moslashgan, qulay yon panel va kartalar ko‘rinishi.

---

## 🎨 Dizayn tizimi

- **Asosiy fon:** `#FAF8F5` (Iliq fil suyagi)
- **Yuza (Surface):** `#FFFFFF`
- **Asosiy rang (Primary):** `#70452F` (To‘q shokolad jigarrang)
- **Urg‘u rangi (Accent):** `#D99A66` (Karamel va muloyim shaftoli)
- **Matn rangi:** `#29231F`
- **Muted matn:** `#8D8178`
- **Muvaffaqiyat (Success):** `#16865B` (Zumrad yashil)
- **Hoshiyalar (Border):** `#EEE8E1`
- **Tipografika:** Plus Jakarta Sans & Inter
- **Ikonkalar:** Lucide Icons

---

## 🚀 Texnologik stek

- **Frontend:** React 18
- **Yig‘uvchi (Bundler):** Vite 5
- **Til:** TypeScript
- **Stillar:** Tailwind CSS
- **Ikonkalar:** Lucide React
- **Komponentlar arxitekturasi:** shadcn/ui printsiplari asosida toza modulli tuzilma

---

## 📦 Mahalliy ishga tushirish

```bash
# Qaramliklarni o'rnatish
npm install

# Dasturchi rejimida ishga tushirish
npm run dev

# Ishlab chiqarish uchun yig'ish (Production build)
npm run build

# Yig'ilgan loyihani ko'rish
npm run preview
```

---

## 📋 Qabul testlari (Acceptance Criteria)

- [x] **TEST 1 — Boshlang‘ich holat:** Sinovchi 01 (Yangi), Sinovchi 02 (Tayyor), Sinovchi 03 (Yangi) aniq 3 ta dastlabki buyurtma.
- [x] **TEST 2 — Yangi buyurtma:** Sinovchi 04 muvaffaqiyatli qo‘shilishi va Yangi holatda chiqishi.
- [x] **TEST 3 — Tayyor deb belgilash:** Faqat tanlangan buyurtmaning holati o‘zgarishi va statistika darhol yangilanishi.
- [x] **TEST 4 & 5 — Validatsiya:** Bo‘sh yoki to‘liq bo‘lmagan maydonlar kiritilganda aniq o‘zbekcha xatoliklar chiqishi va kiritish bloklanishi.
- [x] **TEST 6 — Tafsilotlar:** Tayyor bo‘lgan buyurtma tafsilotlari ko‘rilganda holati va tayyor indikatori saqlanishi.
- [x] **TEST 7 — Qidiruv va filtrlar:** Real vaqt rejimida qidiruv va holatlar bo‘yicha saralash.
