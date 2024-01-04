import { elt } from "./utils.js";
import { BASE_URL } from "./const.js";
// -- Header --
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

// -- Card --
/**
 * B1: Lấy tất cả các card
 * B2: Lấy button show more - less
 * B3: Gắn thuộc tính onclick - Xử lý logic
 */

/**
 * 1. innerHTML vs innerText vs textContent
 */
document.querySelectorAll(".card").forEach((card) => {
  const btn = card.querySelector("button.more");
  const eleText = card.querySelector(".card-text span");

  if (!btn) return;

  const text = eleText.innerText;

  btn.onclick = () => {
    if (btn.innerText.toLowerCase() === "less") {
      eleText.innerHTML = text.slice(0, 20) + "...";
      btn.innerHTML = "more";
    } else {
      eleText.innerHTML = text;
      btn.innerHTML = "less";
    }
  };
});

// -- Footer --
const year = new Date().getFullYear();
document.querySelector("footer .created-by").innerHTML = `NgoDai © ${year}`;

//! -- Back To Top --
document.querySelector(".back-to-top").onclick = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

// --
//* API
//* fetch: có sẵn trong trình duyệt
//* axios: thư viện bên ngoài

/**
 * method:
 * - get: lấy dữ liệu.
 * - post: cập nhật dữ liệu.
 * - put: cập nhật dư
 * - delete: xóa dữ liệu.
 *
 */

//? Hàm fetch có sẵn trên trình duyệt, sẽ nhận 2 tham số:
//? Tham số thứ nhất: đường dẫn của api
//? Tham số thứ hai: thông tin mà chúng ta gửi xuống BE
// fetch("http://localhost:3000/phones", {
//   method: "get",
// })
fetch(`${BASE_URL}/products`, {
  method: "get",
})
  // Sau khi phía BE trả dữ liệu về thành công thì sẽ gọi call back function và truyền dữ liệu vào cb function
  // res: chính là dữ liệu BE trả về cho chúng ta.
  // res: có kiểu dữ liệu là json
  .then((res) => {
    // convert từ json qua cấu trúc dữ liệu trong js, array, object
    return res.json();
  })
  // Sau khi chúng ta convert từ json -> kiểu dữ liệu trong js thì sẽ gọi callback function và truyền dữ liệu đã được convert xong
  // res: chính là dữ liệu đã convert xong.
  .then((phones) => {
    console.log({ phones });
    let contentHTML = ``;

    //! Cách 1 + 2:
    // phones.forEach((phone) => {
    //   contentHTML += `
    //   <div class="card">
    //       <img src="${phone.img}" class="card-img-top" alt="...">
    //       <div class="card-body">
    //           <div class="card-title-wrapper">
    //               <h5 class="card-title">${phone.name}</h5>
    //               <p class="card-price">$${phone.price}</p>
    //           </div>
    //           <p class="card-text">
    //               <span>
    //               ${phone.desc}
    //               </span>
    //               <button class="more">less</button>
    //           </p>
    //           <div class="card-body-bottom">
    //               <div class="stars">
    //                   <i class="fa-star"></i>
    //                   <i class="fa-star"></i>
    //                   <i class="fa-star"></i>
    //                   <i class="fa-star"></i>
    //                   <i class="fa-star"></i>
    //               </div>
    //! Cách 1: không thể truyền vào 1 object (hạn chế)
    //        <!-- <button onclick="handleClick(${phone.id})" class="btn-buy"> -->
    //! Cách 2: Render giao diện trước,gắn sự kiện sau sẽ không tối ưu hiệu suất vì mỗi lần render giao diện xong sẽ có 1 cây DOM, thì ta tìm kiếm đúng button trong cây DOM để gắn sự kiện điều này tạo cho chúng ta thêm 1 bước thực thi
    //               <button data-full-name='hihi' data-id="${phone.id}" class="btn-buy">
    //               <i class="icon-cart"></i>
    //               Buy now
    //           </button>
    //           </div>
    //       </div>
    // </div>
    //   `;
    // });
    // // show lên UI
    // document.querySelector(".product-list").innerHTML = contentHTML;

    // const buttons = document.querySelectorAll(".btn-buy");

    // buttons.forEach((btn) => {
    //   console.dir(btn);
    //   btn.onclick = () => {
    //     handleClick(btn.dataset.id);
    //   };
    // });

    //! Cách 3: vừa render giao diện, vừa gắn sự kiện
    // Mỗi lần lập qua thì chúng ta sẽ nối chuỗi để tạo ra nhiều thẻ card khác nhau
    phones.forEach((phone) => {
      const eleText = elt("span", undefined, phone.desc);
      const card = elt(
        "div",
        {
          className: "card",
        },
        elt("img", {
          src: phone.img,
          className: "card-img-top",
          alt: "...",
        }),
        elt(
          "div",
          {
            className: "card-body",
          },
          elt(
            "div",
            {
              className: "card-title-wrapper",
            },
            elt(
              "h5",
              {
                className: "card-title",
              },
              phone.name
            ),
            elt(
              "p",
              {
                className: "card-price",
              },
              "$" + phone.price
            )
          ),
          elt(
            "p",
            {
              className: "card-text",
            },
            eleText,
            elt(
              "button",
              {
                className: "more",
                onclick: (event) => {
                  const text = phone.desc;
                  const btn = event.target;

                  if (btn.innerText.toLowerCase() === "less") {
                    eleText.innerHTML = text.slice(0, 10) + "...";
                    btn.innerHTML = "more";
                  } else {
                    eleText.innerHTML = text;
                    btn.innerHTML = "less";
                  }
                },
              },
              "less"
            )
          ),
          elt(
            "div",
            {
              className: "card-body-bottom",
            },

            elt(
              "div",
              {
                className: "stars",
              },
              elt("i", { className: "fa-star" }),
              elt("i", { className: "fa-star" }),
              elt("i", { className: "fa-star" }),
              elt("i", { className: "fa-star" }),
              elt("i", { className: "fa-star" })
            ),
            elt(
              "button",
              {
                className: "btn-buy",
                onclick: () => {
                  handleClick(phone);
                },
              },
              elt("i", { className: "icon-cart" }),
              "Buy now"
            )
          )
        )
      );
      document.querySelector(".product-list").append(card);
    });
  });

function handleClick(phone) {
  console.log(phone);
  alert(JSON.stringify(phone));
}

function createElement(tagName, properties, children) {
  // Tạo element
  const ele = document.createElement(tagName);

  // Gắn thuộc tính lên trên element
  for (const prop of Object.entries(properties)) {
    const [key, value] = prop;
    ele[key] = value;
  }

  ele.append(children);

  return ele;
}

// -- render giao diện bằng js
// -- Header
// -- Hero
// -- Body
// -- Footer
function Header() {}
function Footer() {}
function Hero() {}
function Body() {}
// -- BackToTop
function BackToTop() {
  return elt(
    "button",
    {
      className: "back-to-top",
      onclick: () => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      },
    },
    "Back to top"
  );
}

document.body.append(Header());
document.body.append(Hero());
document.body.append(Body());
document.body.append(Footer());
document.body.append(BackToTop());

//! Thêm thuộc tính handleClick cho window
window.handleClick = handleClick;
/**
 *! Đối với inline function thì chúng ta không thể truyền kiểu Object type
 *! Chỉ được phép truyền primitive type
 */

document.querySelector(".close").onclick = () => {
  const menu = document.querySelector(".small-menu");
  menu.classList.remove("active");
};

//* Khi start mới dự án thì mới dùng onclick
//* Hình dung: ghi đè lên những giá trị của thuộc tính onclick
//  document.querySelector('.btn-menu').onclick = () =>{
//   const menu = document.querySelector('.small-menu')
//   menu.classList.add('active')
//  }

//* Khi bảo trì dự án thì dùng addEventListenner
//* Hình dung: không bị ghi đè và thực thi song song cả 2
document.querySelector(".btn-menu").addEventListener("click", () => {
  const menu = document.querySelector(".small-menu");
  menu.classList.add("active");
});
