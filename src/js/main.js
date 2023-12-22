const listNavLink = document.querySelectorAll(".nav-link");
for (const nav of listNavLink) {
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
}
