# 🧄 Aura Black Garlic

Landing page produk **Aura Black Garlic** — bawang hitam premium hasil fermentasi alami yang kaya antioksidan untuk kesehatan dan imunitas tubuh.

## ✨ Fitur

- **Hero section** dengan headline produk, statistik, dan call-to-action
- **Tentang produk** — penjelasan apa itu black garlic
- **Manfaat** kesehatan dalam bentuk kartu
- **Daftar produk** dinamis (dirender dari JavaScript) dengan harga & tombol keranjang
- **Keranjang sederhana** dengan penghitung dan notifikasi toast
- **Testimoni** pelanggan
- **Form pemesanan** yang langsung mengarahkan ke WhatsApp
- **Desain responsif** (mobile, tablet, desktop) dengan menu hamburger
- Tema gelap elegan dengan aksen emas

## 📁 Struktur Proyek

```
Aura-Black-Garlic/
├── index.html        # Halaman utama
├── css/
│   └── style.css     # Seluruh styling
├── js/
│   └── script.js     # Interaktivitas (produk, keranjang, form WA)
└── README.md
```

## 🚀 Cara Menjalankan

Karena ini website statis, cukup buka file `index.html` di browser.

Atau jalankan server lokal sederhana:

```bash
# Dengan Python 3
python3 -m http.server 8000

# Lalu buka di browser
# http://localhost:8000
```

## ⚙️ Kustomisasi

- **Nomor WhatsApp**: ubah variabel `WHATSAPP_NUMBER` di `js/script.js`
- **Daftar produk & harga**: edit array `products` di `js/script.js`
- **Warna & tema**: ubah variabel CSS di bagian `:root` pada `css/style.css`

## 🛠️ Teknologi

- HTML5
- CSS3 (Flexbox, Grid, custom properties, animasi)
- Vanilla JavaScript (tanpa framework)

---

Dibuat untuk produk Aura Black Garlic 🖤
