import { BASE_URL } from "./const.js";
import { elt } from "./utils.js";
// Lấy tất cả products về

function renderTable(products) {
  const tbody = document.getElementById("tblDanhSachSP");

  // Reset lại tbody trước khi render product
  tbody.innerHTML = "";

  products.forEach((product) => {
    const tr = elt(
      "tr",
      undefined,
      elt("td", undefined, product.id),
      elt("td", undefined, product.name),
      elt("td", undefined, product.price),
      elt(
        "td",
        undefined,
        elt("img", {
          src: product.img,
          style: "width:200px",
        })
      ),
      elt("td", undefined, product.desc),
      elt(
        "td",
        undefined,
        elt(
          "button",
          {
            className: "btn btn-warning",
            onclick: () => {
              const modal = document.getElementById("myModal");
              modal.classList.add("show");
              modal.style.display = "block";
              modal.style.backgroundColor = "gray";
              modal.setAttribute("data-type", "update");
              modal.setAttribute("data-product-id", product.id);

              modal.querySelector(".close").addEventListener("click", () => {
                // Reset modal
                modal.style.display = "none";
                modal.classList.remove("show");
                modal.style.backgroundColor = undefined;
                modal.removeAttribute("data-type");
                modal.removeAttribute("data-product-id");
                document.getElementById("GiaSP").value = "";
                document.getElementById("TenSP").value = "";
                document.getElementById("HinhSP").value = "";
                document.getElementById("desc").value = "";
              });

              // Show dữ liệu lên modal
              document.getElementById("GiaSP").value = product.price;
              document.getElementById("TenSP").value = product.name;
              document.getElementById("HinhSP").value = product.img;
              document.getElementById("desc").value = product.desc;
            },
          },
          "Edit"
        ),
        elt(
          "button",
          {
            className: "btn btn-danger ml-2",
            onclick: () => {
              // Xóa products
              fetch(`${BASE_URL}/products/${product.id}`, {
                method: "DELETE",
              })
                .then((res) => res.json())
                .then(() => {
                  // alert("success");
                  renderProducts();
                })
                .catch(() => {
                  alert("failure");
                });
            },
          },
          "Remove"
        )
      )
    );

    tbody.append(tr);
  });
}

function renderProducts() {
  fetch(`${BASE_URL}/products`)
    .then((res) => res.json())
    .then((products) => {
      renderTable(products);
    });
}

renderProducts();

document.querySelector(".modal-footer").append(
  elt(
    "button",
    {
      className: "btn btn-success",
      onclick: () => {
        const modal = document.getElementById("myModal");

        const price = document.getElementById("GiaSP").value;
        const name = document.getElementById("TenSP").value;
        const img = document.getElementById("HinhSP").value;
        const desc = document.getElementById("desc").value;

        // Nếu update thì gọi method PUT
        if (modal.getAttribute("data-type") === "update") {
          const id = modal.dataset.productId;

          fetch(`${BASE_URL}/products/${id}`, {
            // Thêm header: đang gửi dữ liệu ở định dạng gì
            headers: { "content-type": "application/json" },
            method: "put",
            body: JSON.stringify({
              price,
              name,
              img,
              desc,
            }),
          })
            .then((res) => res.json())
            .then(() => {
              renderProducts();
            })
            .catch(() => {
              alert("error");
            })
            .finally(() => {
              // Click button close
              modal.querySelector(".close").click();
            });
        } else {
          fetch(`${BASE_URL}/products`, {
            // Thêm header: đang gửi dữ liệu ở định dạng gì
            headers: { "content-type": "application/json" },
            method: "post",
            // Chuyển về json
            body: JSON.stringify({
              price,
              name,
              img,
              desc,
            }),
          })
            .then((res) => res.json())
            .then(() => {
              renderProducts();
            })
            .catch(() => {
              alert("error");
            })
            // Thành công hay thất bại đều chạy function này
            .finally(() => {
              // Click button close
              modal.querySelector(".close").click();
            });
        }
      },
    },
    "Send"
  )
);

document.getElementById("btn-search").addEventListener("click", () => {
  const searchValue = document.getElementById("search").value;

  // queryString
  fetch(`${BASE_URL}/products?search=${searchValue}`)
    .then((res) => res.json())
    .then((products) => {
      renderTable(products);
    });
});
