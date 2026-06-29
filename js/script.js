// ===== Data Produk =====
const products = [
  {
    name: "Aura Black Garlic",
    weight: "Kemasan 100 gram",
    price: 45000,
    emoji: "🧄",
    featured: false,
  },
  {
    name: "Aura Black Garlic",
    weight: "Kemasan 250 gram",
    price: 99000,
    emoji: "🧄🧄",
    featured: true,
  },
  {
    name: "Aura Black Garlic",
    weight: "Kemasan 500 gram",
    price: 185000,
    emoji: "🧄🧄🧄",
    featured: false,
  },
];

// Nomor WhatsApp tujuan (format internasional tanpa tanda +)
const WHATSAPP_NUMBER = "6281234567890";

// ===== Helper format Rupiah =====
const formatRupiah = (angka) =>
  "Rp " + angka.toLocaleString("id-ID");

// ===== Render Produk =====
const productGrid = document.getElementById("productGrid");
let cartCount = 0;

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (p, i) => `
      <div class="product-card ${p.featured ? "featured" : ""}">
        <div class="product-emoji">${p.emoji}</div>
        <h3>${p.name}</h3>
        <p class="product-weight">${p.weight}</p>
        <div class="product-price">${formatRupiah(p.price)}</div>
        <button class="btn btn-primary" data-index="${i}">Tambah ke Keranjang</button>
      </div>`
    )
    .join("");

  // Pasang event tombol
  document.querySelectorAll(".product-card .btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      cartCount++;
      document.getElementById("cartCount").textContent = cartCount;
      const idx = btn.getAttribute("data-index");
      flashCart(products[idx]);
    });
  });
}

// ===== Animasi feedback keranjang =====
function flashCart(product) {
  const cartBtn = document.getElementById("cartBtn");
  cartBtn.style.transform = "scale(1.15)";
  setTimeout(() => (cartBtn.style.transform = "scale(1)"), 200);
  showToast(`${product.weight} ditambahkan ke keranjang!`);
}

// ===== Toast notifikasi =====
function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.style.cssText =
      "position:fixed;bottom:24px;left:50%;transform:translateX(-50%);background:#e0a92e;color:#1a1306;padding:12px 22px;border-radius:50px;font-weight:600;z-index:999;box-shadow:0 8px 24px rgba(0,0,0,.4);opacity:0;transition:opacity .3s,bottom .3s;";
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.style.opacity = "1";
  toast.style.bottom = "40px";
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.bottom = "24px";
  }, 2500);
}

// ===== Navbar scroll effect =====
const navbar = document.getElementById("navbar");
window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 40);
});

// ===== Mobile menu toggle =====
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");
hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.querySelectorAll("a").forEach((link) =>
  link.addEventListener("click", () => navLinks.classList.remove("open"))
);

// ===== Form pemesanan -> WhatsApp =====
const orderForm = document.getElementById("orderForm");
orderForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const product = document.getElementById("product").value;
  const message = document.getElementById("message").value.trim();

  if (!name || !phone || !product) {
    document.getElementById("formNote").textContent =
      "Mohon lengkapi semua data wajib.";
    return;
  }

  const text =
    `Halo Aura Black Garlic, saya ingin memesan:%0A%0A` +
    `Nama: ${name}%0A` +
    `No. WhatsApp: ${phone}%0A` +
    `Produk: ${product}%0A` +
    `Catatan: ${message || "-"}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
  window.open(url, "_blank");

  document.getElementById("formNote").textContent =
    "Mengarahkan ke WhatsApp... Terima kasih!";
  orderForm.reset();
});

// ===== Tahun footer =====
document.getElementById("year").textContent = new Date().getFullYear();

// ===== Init =====
renderProducts();
