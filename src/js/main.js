//? -- Header --
document.querySelectorAll(".nav-link").forEach((nav) => {
  console.log(nav);

  // Lắng nghe sự kiện onclick
  nav.onclick = () => {
    // Xóa class active trước khi thêm vào
    document
      .querySelector(".nav-link__active")
      .classList.remove("nav-link__active");

    // Thêm class cho thẻ được click
    nav.classList.add("nav-link__active");
  };
});

//? -- Card --
/**
 * B1: Lấy tất cả các card
 * B2: Lấy button show more - less
 * B3: Gắn thuộc tính onclick - Xử lý logic
 */
document.querySelectorAll(".card").forEach((card) => {
  const btn = card.querySelector("button.more");
  const eleText = card.querySelector('.card-text span')

  if(!btn) return

  const text = eleText.innerText

  btn.onclick = () => {
    if (btn.innerText.toLowerCase() === "less") {
      eleText.innerHTML = eleText.innerText.slice(0,20) + "..."
      btn.innerHTML = 'more'
    } else {
      eleText.innerHTML = text;
      btn.innerHTML = 'less'
    }
  };
});
