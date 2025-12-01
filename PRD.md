# 📄 Product Requirements Document (PRD) - Website PJBL
## "Inovasi AI: Mendorong Usaha Lokal dengan AI Inklusif"
**Versi**: 2.0 (Hackathon Edition)  
**Disusun oleh**: Tim PJBL  
**Tanggal**: Desember 2025  

---

## 1. 🎯 Deskripsi Produk
Website adalah platform **AI-first** yang membantu UMKM mikro membuat **ide konten, caption, dan layout poster** promosi secara instan. Tidak sekadar template, tapi **AI yang diprompt dengan data 250+ promosi UMKM asli** dari Instagram, TikTok, dan WhatsApp.

**Key Differentiator**: AI yang "belajar" dari data promosi lokal, backend simpel (transparan ke juri), frontend vanilla (bisa dijelaskan line-by-line).

---

## 2. 🧭 Target Pengguna
- **Persona**: Bu Ani, pemilik warung kopi, HP Android 4GB RAM, gaptek
- **Pain Points**: Bingung konten harian, ga bisa desain/copywriting
- **Goals**: Dapat ide → copy → paste ke Instagram dalam 30 detik

---

## 3. ⭐ Fitur Utama & Integrasi AI

### 3.1 AI Ide Konten Promosi (Core)
**Input**: Jenis usaha, tujuan, platform  
**Proses**:
1. Frontend GET `/api/ideas?jenis_usaha=makanan&tujuan=jualan&platform=Instagram`
2. Backend cari di `training-data.json` (250 data)
3. Kalau ketemu → return 3 ide (top-k matching)
4. Kalau ga ketemu → fallback ke Google Gemini 1.5 Flash

**Output**:
```json
[
  {
    "title": "Behind The Scene Masak",
    "description": "Tunjukkan proses pembuatan makanan dari awal. Bikin 15 detik Reels, + suara ASMR",
    "format": "Reels",
    "platform": "Instagram",
    "confidence": 0.89
  }
]
```

**Acceptance Criteria**:
- [ ] Output minimal 3 ide per request
- [ ] Response time <2 detik (dari data), <5 detik (dari AI)
- [ ] Ide relevan dengan usaha (uji 5 jenis usaha)
- [ ] Ada confidence score (0.8-0.95)

---

### 3.2 AI Caption Generator
**Input**: Ide/tema, tone, panjang  
**Proses**: POST `/api/caption` → backend panggil Gemini dengan prompt fine-tuned

**Output**:
```json
{
  "caption": "Hari ini lagi ngeluarin menu baru...",
  "hashtags": ["#kulinerjogja", "#umkm", "#makananhalal"],
  "cta": "Pesan WA 08123456789"
}
```

**Acceptance Criteria**:
- [ ] Sesuai tone (uji 3 tone berbeda)
- [ ] Panjang caption dalam range (50-100/100-200/200+)
- [ ] Minimal 5 hashtag relevan
- [ ] Bahasa Indonesia natural

---

### 3.3 AI Poster Generator
**Input**: Judul, deskripsi, jenis promo, CTA  
**Proses**: POST `/api/poster` → backend panggil Gemini

**Output**:
```json
{
  "layout": "JUDUL (36pt, Bold)\nSubjudul (18pt)\nDeskripsi (14pt)\nCTA (16pt, Merah)",
  "color_palette": ["#FF0000", "#FFFFFF", "#000000"],
  "font_suggestion": "Montserrat Bold + Open Sans"
}
```

**Acceptance Criteria**:
- [ ] Hierarki teks jelas (judul > subjudul > detail)
- [ ] Format siap copy-paste ke Canva
- [ ] Saran warna minimal 3 warna
- [ ] Saran font spesifik

---

## 4. 🗂 Struktur File Project

```
/project-root
│
├── /backend
│   ├── server.js              # Express.js, 3 endpoint
│   ├── training-data.json     # 250+ data promosi UMKM
│   ├── prompt-templates.js    # Prompt untuk Gemini
│   └── .env                   # API_KEY=...
│
├── /frontend
│   ├── /css
│   │   └── style.css          # Mobile-first, max-width 600px
│   ├── /js
│   │   ├── main.js            # Hash routing (#/ideas)
│   │   ├── api.js             # fetch() ke backend
│   │   └── utils.js           # copyToast, loading
│   └── index.html             # Single page application
│
├── /docs
│   ├── training-dataset.md    # Dokumentasi sumber data
│   └── demo-video.mp4         # Screen recording
│
├── README.md                  # Cara install & deploy
└── package.json               # Root (opsional)
```

---

## 5. 🔄 User Flow Detail (Mobile)

### 5.1 Flow Ide Konten
```
Home → Tap "AI Ide Konten" 
→ Form (3 dropdown vertical) 
→ Tap "Generate Ide" (sticky button) 
→ Spinner + "AI sedang berpikir..." 
→ Fade-in 3 cards 
→ Tap card → Ide tercopy → Toast muncul
```

**Waktu total**: <30 detik (Form:10s + Loading:2-5s + Copy:5s)

---

### 5.2 Flow Caption & Poster
Sama, hanya form input berbeda. Semua hasil bisa di-copy dengan 1 tap.

---

## 6. 🧩 Komponen Teknis

### 6.1 Backend (Node.js + Express)
`server.js` (kurang dari 100 baris):
```javascript
const express = require('express');
const cors = require('cors');
const data = require('./training-data.json');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/ideas', (req, res) => {
  const { jenis_usaha, tujuan, platform } = req.query;
  const matched = data.ideas.filter(d => 
    d.jenis_usaha === jenis_usaha && 
    d.tujuan === tujuan && 
    d.platform === platform
  );
  
  if (matched.length >= 3) {
    return res.json(matched.slice(0, 3));
  }
  
  // Fallback: panggil Gemini
  const geminiResult = await callGemini(req.query);
  res.json(geminiResult);
});

app.listen(process.env.PORT || 3000);
```

### 6.2 Frontend Fetch
`api.js`:
```javascript
const API_BASE = 'https://your-backend.onrender.com';

export async function fetchIdeas(params) {
  const res = await fetch(`${API_BASE}/api/ideas?${new URLSearchParams(params)}`);
  return res.json();
}
```

---

## 7. 🎨 Desain UI/UX

**Color**: Biru (#3B82F6) + Kuning (#EAB308) + Putih  
**Font**: Inter 16px (body), Poppins 24px (header)  
**Layout**: Single column, card padding 20px, button height 48px  
**Animation**: Fade-in (0.3s), toast slide-up, pulse button

---

## 8. 📈 Non-Functional Requirements

| Metric | Target | Cara Ukur |
|--------|--------|-----------|
| Page Load | <2 detik | Lighthouse |
| Time to Interactive | <3 detik | Lighthouse |
| Mobile Performance | 60+ score | Lighthouse mobile |
| Response Time | <2 detik (cache) | Network tab |
| Font Size | Minimal 14px | Manual check |
| Touch Target | 48x48px | Manual check |

---

## 9. 🗂 Roadmap 36 Jam Hackathon

| Jam | Fase | Deliverable |
|-----|------|-------------|
| 0-4 | Setup | Repo, deploy frontend & backend |
| 4-8 | Data | Kumpulkan 200+ data, buat `training-data.json` |
| 8-16 | Core | AI Ide Konten lengkap (backend + frontend) |
| 16-20 | Fitur | Caption & Poster Generator |
| 20-24 | Polish | Copy button, toast, loading |
| 24-28 | Testing | Test 5 UMKM, record demo |
| 28-32 | Dokumen | README, training-dataset.md |
| 32-36 | Backup | Siapkan fallback, slide deck |

---

## 10. 🧪 Testing Strategy

**Unit Test** (opsional di hackathon):
- Test `fetchIdeas()` return array
- Test `copyToast()` muncul 3 detik

**Integration Test**:
- Test `/api/ideas` return 200
- Test Gemini fallback jika data ga ketemu

**User Test**:
- Rekrut 3 UMKM sekitar
- Record waktu dari open website sampai copy ide
- Target: <30 detik

---

## 11. 📌 Risiko & Mitigasi

| Risiko | Mitigasi |
|--------|----------|
| API Gemini down | Siapkan 2 API key, fallback ke data lokal |
| Backend ngelag | Cache di localStorage, animasi loading |
| Juri nanya deep learning | Jawab: "Fine-tune via prompt + 250 data" |
| CORS error pas demo | Deploy frontend & backend di 1 domain |

---

## 12. 📋 Dokumentasi untuk Juri

### `training-dataset.md`
```markdown
# Dataset: 250 Promosi UMKM Lokal

## Sumber
- Instagram: 150 caption (50 UMKM Jogja)
- TikTok: 50 script video
- WhatsApp: 50 status text (survey lapangan)

## Struktur
{ jenis_usaha, tujuan, platform, title, description, format }

## Update: 1 Des 2025
```

### `README.md`
```bash
# Install
cd backend && npm install
cd frontend && npm install -g live-server

# Run
node backend/server.js
live-server frontend

# Deploy
git push origin main  # auto deploy ke Render & Netlify
```

---

## 13. 🎬 Demo Script (2 Menit)

1. **Slide 1** (20s): Masalah UMKM → solusi AI kami
2. **Slide 2** (30s): Tunjukkan `training-data.json` (buka di VS Code)
3. **Slide 3** (40s): Live demo di HP → generate ide "warung kopi"
4. **Slide 4** (20s): Network tab → `/api/ideas` return JSON
5. **Slide 5** (10s): Video testimoni UMKM (10 detik)
6. **Slide 6** (10s): Tech stack & key metrics

---

## 14. 🏆 Kesimpulan

Produk ini **bukan sekadar template**, tapi AI yang:
- ✅ **Terlatih**: 250+ data promosi UMKM asli
- ✅ **Cepat**: Cache data lokal + fallback Gemini
- ✅ **Inklusif**: Mobile-first, tanpa login
- ✅ **Transparan**: Training data bisa di-audit juri

**Key Metrics Hackathon**:
- User dapat ide dalam <30 detik
- 90% output relevan (ujikan 10 kasus)
- Demo lancar di HP Android 4GB

---

## 16. Tech Stack

Tech stack (singkat):
- Frontend: HTML5 + CSS3 + Vanilla JS (hash SPA)
- Backend: Node.js + Express (3 endpoint, CORS enabled)
- AI: Google Gemini 1.5 Flash API
- DB: training-data.json (250 UMKM promosi)
- Hosting: Netlify (frontend) + Render (backend)