// ===============================
// 📸 DỮ LIỆU SẢN PHẨM
// ===============================
const app = document.getElementById("app");

const cameras = [
  { name: "Camera IP 4MP", img: "images/cam21.jpg", price: 1500000 },
  { name: "Camera  HD ", img: "images/cam2.jpg", price: 2200000 },
  { name: "Camera Dome 2MP", img: "images/cam3.jpg", price: 1200000 },
  { name: "Camera PTZ 4K", img: "images/cam4.jpg", price: 5500000 },
  { name: "Camera Hành Trình", img: "images/cam5.jpg", price: 2800000 },
  { name: "Camera IP WiFi", img: "images/cam6.jpg", price: 1650000 },
  { name: "Camera Ngoài Trời", img: "images/cam7.jpg", price: 2950000 },
  { name: "Camera Mini ", img: "images/cam8.jpg", price: 1100000 },
  { name: "Camera An Ninh", img: "images/cam9.jpg", price: 1800000 },
  { name: "Camera WiFi 360°", img: "images/cam10.jpg", price: 2400000 },
  { name: "Camera IP 8MP", img: "images/cam11.jpg", price: 4900000 },
  { name: "Camera 4 Kênh", img: "images/cam12.jpg", price: 3800000 },
  { name: "Camera Hồng Ngoại", img: "images/cam13.jpg", price: 1350000 },
  { name: "Camera PTZ Zoom", img: "images/cam14.jpg", price: 6200000 },
  { name: "Camera Ban Đêm", img: "images/cam15.jpg", price: 1950000 },
  { name: "Camera Hành Trình", img: "images/cam16.jpg", price: 2600000 },
  { name: "Camera Trong Nhà", img: "images/cam17.jpg", price: 1250000 },
  { name: "Camera Thông Minh ", img: "images/cam18.jpg", price: 3400000 },
  { name: "Camera  Mini", img: "images/cam19.jpg", price: 1050000 },
  { name: "Camera UltraHD", img: "images/cam20.jpg", price: 5900000 }
];


// ===============================
// 🧩 HÀM HIỂN THỊ DANH SÁCH SẢN PHẨM
// ===============================
function renderProducts(list) {
  app.innerHTML = `
    <main>
      <h1>Chọn sản phẩm</h1>
      <div class="product-grid">
        ${list.map((cam, i) => `
          <div class="product-card">
            <img src="${cam.img}" alt="${cam.name}" class="zoomable">
            <h3>${cam.name}</h3>
            <p>${cam.price.toLocaleString("vi-VN")} ₫</p>
            <div class="qty-wrapper">
              <label for="qty${i}">Số lượng:</label>
              <div class="qty-box">
                <button type="button" class="qty-btn minus" data-id="${i}">−</button>
                <input type="number" min="0" value="0" id="qty${i}" class="qty-input">
                <button type="button" class="qty-btn plus" data-id="${i}">+</button>
              </div>
            </div>
          </div>
        `).join("")}
      </div>

      <div style="text-align:center; margin-top:30px;">
        <button class="btn" id="btn-buy">Thanh toán</button>
      </div>
    </main>

    <footer>
      <h3>Trung tâm Việc làm Vĩnh Long</h3>
      <p>Số 55 Mậu Thân, Phường 3, TP. Vĩnh Long</p>
    </footer>

    <div class="img-overlay" style="display:none;">
      <img src="" alt="Phóng to ảnh">
    </div>
  `;

  attachEvents(list);
}

// ===============================
// 🧠 GẮN SỰ KIỆN SAU KHI HIỂN THỊ
// ===============================
function attachEvents(list) {
 // 🔹 Nút tăng / giảm số lượng (giá trị không nhỏ hơn 0)
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("plus") || e.target.classList.contains("minus")) {
    const id = e.target.dataset.id;
    const input = document.getElementById(`qty${id}`); // ✅ có backtick
    let value = parseInt(input.value) || 0; // nếu rỗng hoặc NaN → gán 0

    if (e.target.classList.contains("plus")) {
      value++;
    } else if (e.target.classList.contains("minus")) {
      value = Math.max(0, value - 1); // ✅ không cho xuống < 0
    }

    input.value = value;
  }
});



  // Nút Thanh toán
  document.getElementById("btn-buy").addEventListener("click", () => {
    const cart = [];

    list.forEach((cam, i) => {
      const qty = parseInt(document.getElementById(`qty${i}`).value) || 0;
      if (qty > 0) cart.push({ ...cam, qty });
    });

    if (cart.length === 0) {
      alert("Vui lòng chọn ít nhất 1 sản phẩm!");
      return;
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.location.href = "thanhtoan.html";
  });

  // Lightbox ảnh
  const overlay = document.querySelector(".img-overlay");
  const overlayImg = overlay.querySelector("img");

  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("zoomable")) {
      overlayImg.src = e.target.src;
      overlay.style.display = "flex";
    }
  });

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.style.display = "none";
  });
}

// ===============================
// 🔎 LỌC THEO GIÁ
// ===============================
function filterProducts() {
  const min = parseInt(document.getElementById("min-price")?.value) || 0;
  const max = parseInt(document.getElementById("max-price")?.value) || Infinity;

  const filtered = cameras.filter(cam => cam.price >= min && cam.price <= max);

  if (filtered.length === 0) {
    app.innerHTML = `<h3 style="text-align:center; margin-top:20px;">Không có sản phẩm nào trong khoảng giá này!</h3>`;
    return;
  }

  renderProducts(filtered);
}

document.getElementById("btn-filter")?.addEventListener("click", filterProducts);

// ===============================
// 🚀 KHỞI CHẠY
// ===============================
renderProducts(cameras);




