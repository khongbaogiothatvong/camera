const checkout = document.getElementById("checkout");
const cart = JSON.parse(localStorage.getItem("cart")) || [];

function formatVND(price) {
  return price.toLocaleString("vi-VN") + " VNĐ";
}

if (cart.length === 0) {
  checkout.innerHTML = `
    <h2>Không có sản phẩm nào trong giỏ hàng</h2>
    <div style="text-align:center; margin-top:30px;">
      <a class="btn" href="camera.html">&larr; Quay lại mua hàng</a>
    </div>
  `;
} else {
  let subtotal = 0;
  const rows = cart.map((item, i) => {
    const lineTotal = item.price * item.qty;
    subtotal += lineTotal;
    return `
      <tr>
        <td>${i + 1}</td>
        <td>${item.name}</td>
        <td>${item.qty}</td>
        <td>${formatVND(item.price)}</td>
        <td>${formatVND(lineTotal)}</td>
      </tr>
    `;
  }).join('');

  const vat = subtotal * 0.1; // 10% VAT
  const total = subtotal + vat;

  checkout.innerHTML = `
<header class="bill-header">
  <h2>Hóa đơn thanh toán</h2>
</header>
    <main>
      <table border="1" cellspacing="0" cellpadding="8" style="width:100%; text-align:center;">
        <tr>
          <th>STT</th>
          <th>Tên sản phẩm</th>
          <th>Số lượng</th>
          <th>Đơn giá</th>
          <th>Thành tiền</th>
        </tr>
        ${rows}
        <tr>
          <td colspan="4"><strong>Tổng chưa VAT</strong></td>
          <td><strong>${formatVND(subtotal)}</strong></td>
        </tr>
        <tr>
          <td colspan="4"><strong>VAT (10%)</strong></td>
          <td><strong>${formatVND(vat)}</strong></td>
        </tr>
        <tr>
          <td colspan="4"><strong>Tổng thanh toán</strong></td>
          <td><strong>${formatVND(total)}</strong></td>
        </tr>
      </table>

      <div style="text-align:center; margin-top:30px;">
        <div class="btn-group">
  <a class="btn-back" href="index.html">← Quay lại mua hàng</a>
  <button id="btn-buy">Thanh toán</button>
</div>
      </div>
    </main>
  `;
}
// Sự kiện nút Thanh toán (In hóa đơn)
document.addEventListener("click", (e) => {
  if (e.target && e.target.id === "btn-buy") {
    window.print(); // Mở hộp thoại in
  }
});

