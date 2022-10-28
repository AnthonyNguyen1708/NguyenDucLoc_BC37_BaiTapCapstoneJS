import { CartItem } from "../models/cartItem.js";
import { spinnerService } from "../services/spinnerService.js";

let productList = [];

let cartList = [];

const URL = "https://633f8e1ae44b83bc73bc2bcd.mockapi.io/phoneList/";

let renderProduct = (data) => {
  if (!data) data = productList;

  let tableHTML = "";

  for (let i in data) {
    let productItem = data[i];
    tableHTML += `<div class="item">
    <div class="item_content">
      <div class="item_header">
      <p class="type">${productItem.type}</p>
        <em class="stock">In Stock</em>
      </div>
      <div class="item_body">
      <img class="product_img" src="${productItem.img}" alt="" />
      </div>
      <div class="item_footer">
        <div class="product_name">
        <strong class="product_name">${productItem.name}</strong>
        </div>
        <div class="product_detail">
        <h5 class="screen">Display size: ${productItem.screen}</h5>
        <h5 class="back_camera">Back Camera: ${productItem.backCamera}</h5>
        <h5 class="front_camera">Front Camera: ${productItem.frontCamera}</h5>
        <p class="product_des">${productItem.des}</p>
        </div>
        <div class="price ">
        <p class="product_price">$ ${productItem.price}</p>
          <span class="btn_add">
            <div>
              <button
                onclick="addToCart(${i})"
                id="add_btn"
                class="add_btn"
              >
                Add <i class="fas fa-chevron-right"></i>
              </button>
              <div
                style="display: none"
                id="change_btn"
                class="change_btn"
              ></div>
            </div>
          </span>
        </div>
      </div>
    </div>
  </div>`;
  }
  document.getElementById("product_item").innerHTML = tableHTML;
};

let getProduct = () => {
  spinnerService.loadingOn();
  axios({
    url: URL,
    method: "GET",
  })
    .then((res) => {
      console.log(res);
      productList = [...res.data];
      renderProduct();
      spinnerService.loadingOff();
    })
    .catch((err) => {
      console.log(err);
      spinnerService.loadingOff();
    });
};

window.onload = () => {
  getProduct();
  getLocal();
  renderCart(cartList);
  updateCartList(cartList);
};

window.typeFilter = () => {
  let type = document.getElementById("type_filter").value;

  if (type == "none") {
    renderProduct(productList);
  } else {
    let productFilter = [];
    for (let i in productList) {
      if (productList[i].type == type) {
        productFilter.push(productList[i]);
      }
    }
    renderProduct(productFilter);
  }
};

window.addToCart = (index) => {
  let productItem = productList[index];

  let checkId = cartList.find((item) => item.product.id === productItem.id);

  if (checkId) {
    checkId.quantity += 1;
  } else {
    let cartItem = new CartItem(
      productItem.id,
      productItem.name,
      productItem.price,
      productItem.screen,
      productItem.backCamera,
      productItem.frontCamera,
      productItem.img,
      productItem.des,
      productItem.type,
      1
    );

    cartList.push(cartItem);
  }

  updateCartList(cartList);
  // changeBtn(cartList);
  renderCart(cartList);
  setLocal(cartList);
};

let renderCart = (cartList) => {
  if (cartList.length == 0) {
    document.getElementById("empty_cart").style.display = "flex";
  } else {
    document.getElementById("empty_cart").style.display = "none";
  }

  let renderCartItem = cartList.map((item, index) => {
    return `<div class="cart_item ">
        <div class="cartItem_img">
          <img src="${item.product.img}" />
        </div>
        <strong>${item.product.name}</strong>
        <span class="qty_change">
          <div>
            <button onclick = "quantityChange(
              ${item.product.id}, -1, ${index})"
             class="btn_qty">
              <i class="fas fa-chevron-left"></i>
            </button>
            <p id = "qty" class="qty">${item.quantity}</p>
            <button onclick = "quantityChange(
              ${item.product.id}, 1), ${index}" class="btn_qty">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </span>
        <p id ="price" class="price">$ ${item.product.price}</p>
        <button onclick = "removeCartItem(${index})" class="btn_remove" id="btn_remove">
          <i class="fas fa-trash"></i>
        </button>
      </div>`;
  });

  let totalPrice = 0;
  for (let i in cartList) {
    totalPrice += cartList[i].quantity * (cartList[i].product.price * 1);
  }

  document.getElementById("totalPrice").innerHTML = totalPrice;
  document.getElementById("cartBody").innerHTML = renderCartItem;
};

let setLocal = () => {
  let cartListJSON = JSON.stringify(cartList);

  localStorage.setItem("CLJSON", cartListJSON);
};

let getLocal = () => {
  let cartListJSON = localStorage.getItem("CLJSON");

  if (!cartListJSON) return;

  cartList = mapData(JSON.parse(cartListJSON));
};

let mapData = (cartListJSON) => {
  let cartListCLone = [];

  for (let i in cartListJSON) {
    let oldCartItem = cartListJSON[i];
    let newCartItem = new CartItem(
      oldCartItem.product.id,
      oldCartItem.product.name,
      oldCartItem.product.price,
      oldCartItem.product.screen,
      oldCartItem.product.backCamera,
      oldCartItem.product.frontCamera,
      oldCartItem.product.img,
      oldCartItem.product.des,
      oldCartItem.product.type,
      oldCartItem.quantity
    );
    cartListCLone.push(newCartItem);
  }
  return cartListCLone;
};

window.quantityChange = (id, status, index) => {
  let currentItem = cartList.find((item) => {
    return item.product.id == id;
  });

  currentItem.quantity += status;

  if (currentItem.quantity <= 0) {
    removeCartItem(index);
  }

  updateCartList(cartList);

  renderCart(cartList);

  setLocal(cartList);
};

window.removeCartItem = (index) => {
  cartList.splice(index, 1);

  setLocal(cartList);

  renderCart(cartList);
  updateCartList(cartList);
};

let updateCartList = (cartList) => {
  let cartListQuantity = 0;

  for (let i in cartList) {
    cartListQuantity += cartList[i].quantity;
  }

  document.getElementById("total_qty").innerHTML = cartListQuantity;
};

window.checkOut = () => {
  let totalPrice = 0;
  for (let i in cartList) {
    totalPrice += cartList[i].quantity * (cartList[i].product.price * 1);
  }

  let totalItemName = "";
  for (let i in cartList) {
    totalItemName += `<span>${cartList[i].quantity} x ${cartList[i].product.name}</span>`;
  }

  let totalItemPrice = "";
  for (let i in cartList) {
    let itemPrice = cartList[i].quantity * cartList[i].product.price;
    totalItemPrice += `<span>$ ${itemPrice}</span>`;
  }

  if (totalPrice > 0) {
    document.getElementById("payment").innerHTML = "$" + totalPrice;
    document.getElementById("item_names").innerHTML = totalItemName;
    document.getElementById("items_price").innerHTML = totalItemPrice;

    document.getElementById("invoice").style.display = "flex";
    document.getElementById("cart_content").style.right = "-100%";
  } else {
    return;
  }
};

window.clearCartList = () => {
  cartList.length = 0;
  console.log(cartList.length);
  setLocal();
  renderCart(cartList);
  updateCartList(cartList);
};

window.order = () => {
  let totalPrice = 0;
  for (let i in cartList) {
    totalPrice += cartList[i].quantity * (cartList[i].product.price * 1);
  }

  let ordConfirm = `<div>
    <div class="order_details">
      <em>Your order has been placed</em>
      <p>
        Your order-id is : <span>17A08N</span>
      </p>
      <p>Your order will be delivered to you in 3-5 working days</p>
      <p>
        You can pay <span>$ ${totalPrice}</span> by card or any online transaction method
        after the products have been delivered 
      </p>
    </div>
    <button onclick = "confirmOrd()" id="btn_ok" class="btn_ok">
      Ok
    </button>
  </div>`;

  document.getElementById("ord_confirm").innerHTML = ordConfirm;
  clearCartList();
  document.getElementById("layer").style.display = "flex";
  document.getElementById("invoice").style.display = "none";
  document.getElementById("ord_confirm").style.display = "flex ";
};

window.confirmOrd = () => {
  document.getElementById("layer").style.display = "flex";
  document.getElementById("ord_confirm").style.display = "none";
  document.getElementById("thanks").style.display = "block ";
};

window.thanks = () => {
  document.getElementById("layer").style.display = "none";
  document.getElementById("thanks").style.display = "none";
};

// let changeBtn = (cartList) => {
//   let changeQtyBtn = cartList.map((item) => {
//     return `<button class="btn_qty">
//                 <i class="fas fa-chevron-left"></i>
//               </button>
//               <p id="qty" class="qty">${item.quantity}</p>
//               <button class="btn_qty">
//                 <i class="fas fa-chevron-right"></i>
//             </button>`;
//   });

//   console.log(changeQtyBtn);
//   document.getElementById("add_btn").style.display = "none";
//   document.getElementById("change_btn").innerHTML = changeQtyBtn;
//   document.getElementById("change_btn").style.display = "flex";
// };

/**CSS */
document.getElementById("btn_cart").addEventListener("click", function () {
  document.getElementById("layer").style.display = "flex";
  document.getElementById("cart_content").style.right = "0";
});

document.getElementById("btn_hideCart").addEventListener("click", function () {
  document.getElementById("layer").style.display = "none";
  document.getElementById("cart_content").style.right = "-100%";
});

document.getElementById("cancel").addEventListener("click", function () {
  document.getElementById("invoice").style.display = "none";
  document.getElementById("cart_content").style.right = "0";
});
