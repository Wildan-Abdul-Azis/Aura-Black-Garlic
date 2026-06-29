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

// ===== Keranjang =====
const productGrid = document.getElementById("productGrid");
let cartCount = 0;
let cartItems = [];

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
      const idx = btn.getAttribute("data-index");
      const product = products[idx];
      // Cek apakah produk sudah ada di keranjang
      const existing = cartItems.find((item) => item.weight === product.weight);
      if (existing) {
        existing.qty++;
      } else {
        cartItems.push({ ...product, qty: 1 });
      }
      cartCount++;
      document.getElementById("cartCount").textContent = cartCount;
      flashCart(product);
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

// ===== Cart Modal =====
function createCartModal() {
  const modal = document.createElement("div");
  modal.id = "cartModal";
  modal.innerHTML = `
    <div class="cart-overlay" id="cartOverlay"></div>
    <div class="cart-panel">
      <div class="cart-header">
        <h3>🛒 Keranjang Belanja</h3>
        <button class="cart-close" id="cartClose">&times;</button>
      </div>
      <div class="cart-body" id="cartBody"></div>
      <div class="cart-footer" id="cartFooter"></div>
    </div>
  `;
  document.body.appendChild(modal);

  document.getElementById("cartOverlay").addEventListener("click", closeCart);
  document.getElementById("cartClose").addEventListener("click", closeCart);
}

function openCart() {
  const modal = document.getElementById("cartModal");
  modal.classList.add("active");
  renderCart();
}

function closeCart() {
  const modal = document.getElementById("cartModal");
  modal.classList.remove("active");
}

function renderCart() {
  const cartBody = document.getElementById("cartBody");
  const cartFooter = document.getElementById("cartFooter");

  if (cartItems.length === 0) {
    cartBody.innerHTML = `<p class="cart-empty">Keranjang masih kosong.</p>`;
    cartFooter.innerHTML = "";
    return;
  }

  let total = 0;
  cartBody.innerHTML = cartItems
    .map((item, i) => {
      const subtotal = item.price * item.qty;
      total += subtotal;
      return `
        <div class="cart-item">
          <div class="cart-item-info">
            <strong>${item.name}</strong>
            <span>${item.weight}</span>
            <span class="cart-item-price">${formatRupiah(item.price)} x ${item.qty}</span>
          </div>
          <div class="cart-item-actions">
            <span class="cart-item-subtotal">${formatRupiah(subtotal)}</span>
            <button class="cart-item-remove" data-index="${i}">&times;</button>
          </div>
        </div>`;
    })
    .join("");

  cartFooter.innerHTML = `
    <div class="cart-total">
      <strong>Total:</strong>
      <strong>${formatRupiah(total)}</strong>
    </div>
    <button class="btn btn-primary full" id="checkoutBtn">Checkout via WhatsApp</button>
  `;

  // Event hapus item
  document.querySelectorAll(".cart-item-remove").forEach((btn) => {
    btn.addEventListener("click", () => {
      const idx = parseInt(btn.getAttribute("data-index"));
      cartCount -= cartItems[idx].qty;
      cartItems.splice(idx, 1);
      document.getElementById("cartCount").textContent = cartCount;
      renderCart();
    });
  });

  // Event checkout
  document.getElementById("checkoutBtn").addEventListener("click", () => {
    let pesanan = cartItems
      .map((item) => `- ${item.name} (${item.weight}) x${item.qty} = ${formatRupiah(item.price * item.qty)}`)
      .join("%0A");
    const text =
      `Halo Aura Black Garlic, saya ingin memesan:%0A%0A${pesanan}%0A%0ATotal: ${formatRupiah(total)}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank");
  });
}

// Pasang event klik keranjang
document.getElementById("cartBtn").addEventListener("click", openCart);
createCartModal();

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
