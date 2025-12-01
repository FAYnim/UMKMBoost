# 📋 TODO.md - Planning Hackathon UMKM AI Website
**Target**: 36 Jam Hackathon  
**Pendekatan**: Vanilla JS, Pemula-Friendly, No OOP  
**Goal**: Website AI untuk promosi UMKM yang simple dan bisa dijelaskan ke juri  

---

## 🎯 FASE 1: Setup & Persiapan (Jam 0-4)

### ✅ Setup Project Structure
- [x] Buat folder struktur sesuai AGENTS.md:
  ```
  /assets
    /icons
    /images
  /src
    /css
      style.css
    /js
      main.js
      ai-ideas.js
      ai-caption.js
      ai-poster.js
    /pages
      home.html
      ideas.html
      caption.html
      poster.html
  index.html
  README.md
  ```

### ✅ Setup Development Environment
- [x] Init git repository
- [x] Buat `.gitignore` (node_modules, .env, dll)
- [ ] Setup folder backend terpisah
- [ ] Install Node.js dependencies untuk backend
- [ ] Test local development server

### ✅ Deploy Infrastructure
- [ ] Deploy frontend ke Netlify (atau GitHub Pages)
- [ ] Setup backend di Render.com atau Heroku
- [ ] Test koneksi frontend-backend
- [ ] Setup environment variables (.env)

### ✅ Netlify Functions Setup (Backend Serverless)
- [ ] Buat folder `netlify/functions` di root repo
- [ ] Buat file `netlify.toml` dengan isi:
  ```toml
  [build]
    functions = "netlify/functions"
  ```
- [ ] Install `node-fetch@2` (CommonJS) untuk dipakai di function:
  ```bash
  npm install node-fetch@2
  ```
- [ ] Tambahkan `.env` lokal (jangan di-commit) berisi `GEMINI_KEY=<api-key>`
- [ ] Di dashboard Netlify → Site settings → Environment variables → tambahkan `GEMINI_KEY`

---

## 🗂 FASE 2: Data Collection & Preparation (Jam 4-8)

### ✅ Kumpulkan Data Training UMKM
- [ ] Riset 50 caption Instagram UMKM makanan
- [ ] Riset 50 caption Instagram UMKM fashion  
- [ ] Riset 50 caption Instagram UMKM jasa
- [ ] Riset 50 script TikTok UMKM (pendek)
- [ ] Survey 50 status WhatsApp UMKM lokal
- [ ] **Total target**: 250 data promosi

### ✅ Struktur Data Training
- [ ] Buat `training-data.json` dengan format:
  ```json
  {
    "ideas": [
      {
        "id": 1,
        "jenis_usaha": "makanan",
        "tujuan": "jualan",
        "platform": "Instagram", 
        "title": "Behind The Scene Masak",
        "description": "Tunjukkan proses pembuatan...",
        "format": "Reels",
        "confidence": 0.89
      }
    ]
  }
  ```
- [ ] Kategorisasi data berdasarkan jenis_usaha
- [ ] Kategorisasi data berdasarkan tujuan (jualan, edukasi, brand awareness)
- [ ] Validasi struktur data dengan sample test

---

## 🏗 FASE 3: Netlify Functions Development (Serverless Backend)

### ✅ Function: ideas
- [ ] Buat `netlify/functions/ideas.js` (GET)
  - import `training-data.json` lokal
  - import `node-fetch` untuk fallback Gemini
  - return 3 data atau hasil Gemini
  - export `exports.handler = async (event, context)`

### ✅ Function: caption
- [ ] Buat `netlify/functions/caption.js` (POST)
  - panggil Google Gemini 1.5 Flash
  - return caption + hashtags + CTA

### ✅ Function: poster
- [ ] Buat `netlify/functions/poster.js` (POST)
  - panggil Google Gemini 1.5 Flash
  - return layout text + color palette + font

### ✅ Test lokal & production
- [ ] Jalankan `netlify dev` untuk test lokal
- [ ] Deploy ke Netlify, cek functions logs
- [ ] Pastikan frontend fetch ke `/.netlify/functions/<nama>`

---

## 🎨 FASE 4: Frontend Core (Jam 12-20)

### ✅ HTML Structure (Semantic & Simple)
- [x] Buat `index.html` sebagai SPA entry point
- [x] Buat `src/pages/home.html` untuk landing
- [x] Buat `src/pages/ideas.html` untuk AI Ide Konten
- [x] Buat `src/pages/caption.html` untuk Caption Generator
- [x] Buat `src/pages/poster.html` untuk Poster Generator
- [x] Pastikan semua HTML semantic dan minimal div

### ✅ CSS Styling (Mobile-First, Flexbox)
- [x] Setup `src/css/style.css` dengan:
  - CSS Reset sederhana
  - Mobile-first responsive (max-width: 600px)
  - Flexbox layout system
  - Color scheme: Biru (#3B82F6) + Kuning (#EAB308) + Putih
  - Font: Inter 16px (body), Poppins 24px (header)
- [x] Button styling: height 48px, touch-friendly
- [x] Card styling dengan padding 20px
- [x] Loading spinner CSS animation
- [x] Toast notification styling

### ✅ JavaScript Core (Vanilla JS, No OOP)
- [x] `src/js/main.js` - Hash routing sederhana:
  ```js
  function handleRoute() {
    const hash = window.location.hash;
    // Simple if-else routing
  }
  ```
- [x] `src/js/utils.js` - Helper functions:
  ```js
  function copyToClipboard(text) { ... }
  function showToast(message) { ... }
  function showLoading() { ... }
  ```
- [ ] Test routing berjalan di browser

---

## 🤖 FASE 5: AI Features Implementation (Jam 20-28)

### ✅ AI Ide Konten Feature
- [x] Buat `src/js/ai-ideas.js` dengan fungsi:
  ```js
  function generateIdeas(businessType, goal, platform) { ... }
  function displayIdeas(ideas) { ... }
  function copyIdea(ideaText) { ... }
  ```
- [x] Form input dengan 3 dropdown
- [x] Integration dengan `/api/ideas` (dummy data untuk testing)
- [x] Display hasil dalam cards
- [x] Copy functionality dengan toast feedback
- [x] Error handling user-friendly

### ✅ Caption Generator Feature  
- [x] Buat `src/js/ai-caption.js`
- [x] Form: tema, tone, panjang caption
- [x] Fetch dari `/api/caption` (dummy data untuk testing)
- [x] Display: caption + hashtags + CTA terpisah
- [x] Copy button untuk masing-masing bagian
- [x] Loading state yang jelas

### ✅ Poster Generator Feature
- [x] Buat `src/js/ai-poster.js`  
- [x] Form: judul, deskripsi, jenis promo, CTA
- [x] Fetch dari `/api/poster` (dummy data untuk testing)
- [x] Display layout dengan preview visual sederhana
- [x] Copy layout text + color suggestion
- [x] Saran font yang actionable

---

## 🎯 FASE 6: UX Polish & Testing (Jam 28-32)

### ✅ User Experience Improvements
- [ ] Tambah animasi fade-in (0.3s) untuk hasil AI
- [ ] Loading spinner dengan text "AI sedang berpikir..."
- [ ] Toast notification: "Berhasil disalin ke clipboard!"
- [ ] Sticky button di mobile (Generate/Copy)
- [ ] Form validation dengan pesan error jelas
- [ ] Responsive test di berbagai ukuran layar

### ✅ Performance Optimization
- [ ] Minimize CSS dan JS (manual, no bundler)
- [ ] Compress images di folder /assets
- [ ] Test loading speed dengan Lighthouse
- [ ] Target: Page Load <2 detik, Mobile Score 60+
- [ ] Cache API responses di localStorage (optional)

### ✅ Browser Testing
- [ ] Test di Chrome mobile
- [ ] Test di Firefox
- [ ] Test di Safari (jika ada akses)
- [ ] Test offline behavior
- [ ] Test dengan koneksi lambat
- [ ] Cek CORS & logs Netlify Functions

---

## 🧪 FASE 7: Real User Testing (Jam 32-34)

### ✅ UMKM User Testing
- [ ] Rekrut 3-5 pemilik UMKM sekitar
- [ ] Test scenario: "Buat ide konten untuk jualan hari ini"
- [ ] Record waktu: dari buka website → copy ide
- [ ] Target: <30 detik total time
- [ ] Kumpulkan feedback UX yang simple

### ✅ Bug Fixing dari Testing
- [ ] Fix bug yang ditemukan user
- [ ] Improve UX berdasarkan feedback
- [ ] Test ulang flow yang diperbaiki
- [ ] Pastikan semua fitur core berjalan lancar

---

## 📋 FASE 8: Documentation & Demo Prep (Jam 34-36)

### ✅ Technical Documentation  
- [ ] Update `README.md` dengan:
  - Cara install dan run local
  - Cara deploy to production
  - Tech stack explanation
  - API endpoints documentation
- [ ] Buat `training-dataset.md` dokumentasi data
- [ ] Comment kode JavaScript yang kompleks
- [ ] Screenshot untuk documentation

### ✅ Demo Preparation
- [ ] Record demo video 2 menit:
  - Show problem → solution
  - Live demo di mobile
  - Show training data di VS Code
  - Show network tab API calls
- [ ] Siapkan slide deck minimal (6 slide)
- [ ] Test demo di HP Android real device
- [ ] Siapkan backup plan jika internet bermasalah

### ✅ Deployment Final Check
- [ ] Test production URL dari mobile
- [ ] Pastikan API backend stable
- [ ] Check CORS configuration
- [ ] Test semua fitur end-to-end di production
- [ ] Setup monitoring/logging minimal

---

## 🎬 Demo Script & Presentation (Jam 36)

### ✅ Presentation Structure (2 menit)
1. **Problem Statement** (20s): UMKM sulit buat konten
2. **Solution Demo** (60s): Live demo 3 fitur di mobile  
3. **Technical Transparency** (30s): Show training data + API calls
4. **Impact & Metrics** (10s): User testing results

### ✅ Demo Backup Plans
- [ ] Offline mode dengan cached data
- [ ] Screenshot backup jika live demo gagal
- [ ] Alternative internet connection
- [ ] Practice demo minimal 3x sebelum presentasi

---

## 📊 Success Metrics

### ✅ Technical Metrics
- [ ] Page Load Speed: <2 detik
- [ ] Mobile Performance Score: 60+
- [ ] API Response Time: <2 detik (cached), <5 detik (AI)
- [ ] Zero critical bugs in core flow

### ✅ User Experience Metrics  
- [ ] Time to get AI idea: <30 detik
- [ ] User task completion rate: >90%
- [ ] Mobile usability: Tombol min 48px, font min 14px
- [ ] Copy success rate: 100% (toast confirmation)

### ✅ Business Metrics
- [ ] 90% AI output relevance (test dengan 10 kasus UMKM)
- [ ] 250+ training data terdokumentasi
- [ ] 3 UMKM testimoni positif
- [ ] Demo berjalan lancar tanpa error

---

## 🚨 Risk Mitigation

### ✅ Technical Risks
- [ ] **API Gemini Down**: Siapkan 2 API key, fallback ke data lokal
- [ ] **CORS Error**: Deploy frontend & backend di domain sama
- [ ] **Mobile Performance**: Optimize images, minimize JS
- [ ] **Internet Lambat**: Implement loading states yang baik

### ✅ Demo Risks  
- [ ] **Live Demo Gagal**: Siapkan video backup + screenshots
- [ ] **Juri Tanya Deep Learning**: Jawab "Fine-tune via prompt engineering + curated dataset"
- [ ] **HP Mati**: Charge 100% + power bank + test di laptop backup
- [ ] **Lupa Script**: Print slide notes + practice 5x minimum

---

## 🏆 Definition of Done

**Setiap task dianggap selesai jika**:
- ✅ **Functionality**: Fitur berjalan sesuai requirement
- ✅ **Code Quality**: Kode vanilla JS, no OOP, ada comment
- ✅ **Mobile Ready**: Test di HP Android, responsive
- ✅ **User Friendly**: UMKM bisa pakai tanpa tutorial
- ✅ **Demo Ready**: Bisa dijelaskan ke juri dalam 2 menit

**Project selesai jika**:
- ✅ 3 fitur AI berjalan lancar (Ideas, Caption, Poster)
- ✅ Training data 250+ terdokumentasi
- ✅ Demo 2 menit practiced & backup ready
- ✅ User testing dengan 3+ UMKM real
- ✅ Documentation lengkap (README, code comments)

---

*Good luck! 🚀 Keep it simple, keep it working, keep it demo-ready!*