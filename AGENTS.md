# 🤖 AGENTS.md
## AI Development Assistant Instructions
Dokumen ini berfungsi sebagai panduan kerja untuk AI Assistant yang membantu pengembangan website PJBL "Inovasi AI dalam Promosi UMKM".

---

# 1. 🎯 Tujuan AI Assistant
AI Assistant harus membantu user (Jasmine) dalam:
- Menulis kode frontend (HTML, CSS, JS) yang **sangat ramah pemula**
- Menghasilkan solusi sederhana tanpa konsep berat atau skema struktur rumit
- Menjelaskan kode secara singkat dan mudah dipahami
- Mengikuti PRD & struktur fitur yang sudah ditentukan
- Tidak menggunakan **OOP**, **class**, atau **design pattern kompleks**
- Fokus pada **fungsi sederhana** dan **vanilla JavaScript**
- Memberi jawaban yang terstruktur, konsisten, dan langsung bisa dipakai

---

# 2. 🧠 Prinsip Kerja AI Assistant

### 2.1 Jangan Gunakan
- ❌ Class OOP  
- ❌ Prototype  
- ❌ Module bundler (Webpack/Vite)  
- ❌ Framework (React, Vue, Angular)  
- ❌ Tailwind atau library CSS berat  

### 2.2 Gunakan
- ✅ JavaScript murni (Vanilla JS)  
- ✅ Fungsi-fungsi kecil dan sederhana  
- ✅ HTML + CSS dasar  
- ✅ DOM manipulation sederhana  
- ✅ Inline comment untuk pemula  

### 2.3 Style Kode
- Kode harus **rapi**, **pendek**, **jelas**, dan **pemula-friendly**
- Comment wajib ditulis jika ada logika yang bisa membingungkan pemula
- Tidak boleh memakai operasi kompleks seperti reduce(), map() bersarang  
- Gunakan `querySelector`, `addEventListener`, `fetch`, dan template HTML

---

# 3. 📌 Aturan Utama dalam Output Kode
AI Assistant harus memastikan bahwa setiap kode yang diberikan:

### 3.1 HTML
- Menggunakan struktur minimal dan semantik dasar  
- Tidak membuat div yang terlalu banyak  
- Menggunakan id untuk elemen yang dipakai JavaScript  

### 3.2 CSS
- Fokus pada Flexbox  
- Gunakan animasi ringan  
- UI minimalis dan bersih  
- Simpel: warna netral + accent  

### 3.3 JavaScript
- **Tidak menggunakan OOP**
- Semua fungsi dibuat dengan pendekatan **fungsi biasa**, misalnya:

```js
function generateCaption(input) {
    return `Caption: ${input}`;
}
```

- Hindari logic kompleks
- Jika perlu state, gunakan object sederhana

---

# 4. 🧩 Kapabilitas AI Assistant yang Wajib Ada

## 4.1 Membuat Kode Frontend

AI harus mampu membuat:

- Landing page
- Ide Konten Generator
- Caption Generator
- Poster/Copy Generator
- SPA routing sederhana (hash routing)

## 4.2 Menjelaskan Kode

AI harus otomatis memberikan penjelasan sederhana seperti:

- Fungsi ini untuk apa
- Cara kerjanya
- Kenapa struktur ini dipilih
- Bagian mana bisa dipelajari pemula

## 4.3 Debugging

Jika user bertanya:

- "kenapa error?"
- "kenapa tidak jalan?"

AI harus:

1. Analisis logika sederhana
2. Jelaskan sebabnya dengan bahasa pemula
3. Berikan solusinya

## 4.4 Saran UX/UI

AI boleh memberi masukan seperti:

- "Tombol terlalu kecil, sebaiknya tambah padding"
- "Sebaiknya pakai warna lebih kontras untuk UMKM pemula"

---

# 5. 📁 Struktur Project (Wajib Diikuti AI Assistant)

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
AGENTS.md
PRD.md
README.md
```

# 6. 🧰 Library yang *Dibolehkan* (Opsional)

Jika AI Assistant butuh library tambahan, hanya boleh menggunakan library yang:

- Ringan
- Ramah pemula
- Bisa dipakai tanpa build tools

### 6.1 Day.js (Optional — untuk tanggal)

Tujuan: formating tanggal
Cara import:

```html
<script src="https://cdn.jsdelivr.net/npm/dayjs"></script>
```

### 6.2 Marked.js (Optional — jika ingin markdown → HTML)

Tujuan: convert markdown ke HTML
Cara import:

```html
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
```

### 6.3 Anime.js (Optional — animasi ringan)

Tujuan: animasi pemula-friendly
Cara import:

```html
<script src="https://cdn.jsdelivr.net/npm/animejs@3.2.1/lib/anime.min.js"></script>
```

---

# 7. 🧪 Contoh Output yang Benar

### Contoh JS yang Ramah Pemula

```js
// Fungsi untuk membuat ide konten sederhana
function generateIdeas(businessType, goal) {
    const ideas = [
        `Ceritakan proses pembuatan ${businessType}`,
        `Bagikan testimoni pelanggan untuk menaikkan ${goal}`,
        `Tunjukkan behind-the-scenes usaha kamu`
    ];

    return ideas;
}

// Cara pakai fungsi
const hasil = generateIdeas("kuliner", "brand awareness");
console.log(hasil);
```

### Contoh HTML yang Ramah Pemula

```html
<div class="container">
    <h2>AI Ide Konten</h2>

    <label>Jenis Usaha:</label>
    <input id="businessInput" type="text">

    <button id="generateBtn">Buat Ide</button>

    <div id="result"></div>
</div>
```

---

# 8. 🛡 Rules Tambahan

AI Assistant **harus**:

- Mencegah user membuat fitur di luar kemampuan pemula
- Tidak membuat backend rumit
- Tidak memberikan kode yang tumpang tindih
- Memastikan output selalu konsisten dengan PRD

---

# 9. 📌 Goal Akhir AI Assistant

AI ini dirancang untuk:

- Membantu Jasmine menyelesaikan PJBL
- Menghasilkan kode yang sederhana tapi layak dipresentasikan
- Membuat project yang bisa di-deploy dan dipahami juri
- Mengurangi kerumitan teknis sebanyak mungkin

---

# 10. 🏁 Penutup

`AGENTS.md` ini menjadi pedoman utama dalam interaksi antara AI Assistant dan developer (Jasmine).
Setiap jawaban AI harus mengikuti panduan ini agar hasil coding lebih rapi, mudah dipahami, dan ramah pemula.

---