let productList = [];

let addProduct = () => {
  loadingService.loadingOn();

  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value * 1;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let img = document.getElementById("img").value;
  let des = document.getElementById("des").value;
  let type = document.getElementById("type").value;

  let newProduct = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    des,
    type
  );

  productService
    .addProductItem(newProduct)
    .then((res) => {
      console.log(res);
      document.getElementById("myForm").reset();
      getProduct();
      loadingService.loadingOff();
    })
    .catch((err) => {
      console.log(err);
      loadingService.loadingOff();
    });
};

let rendderProduct = (data) => {
  if (!data) data = productList;

  let tableHTML = "";

  for (let i in productList) {
    let productItem = productList[i];
    tableHTML += `<tr>
        <td class="id text-center">${productItem.id}</td>
        <td class="name" style = "text-transform: capitalize"> ${productItem.name}</td>
        <td class="price"">$ ${productItem.price}</td>

        <td class="img">
          <img class="" src="${productItem.img}" alt="" />
        </td>

        <td class="about">
          <p>Màn hình: ${productItem.screen}</p>
          <p>Camera sau: ${productItem.backCamera}</p>
          <p>Camera trước: ${productItem.frontCamera}</p>
          <p>Mô tả: ${productItem.des}</p>
        </td>

        <td class= "action_btn">
          <button
            onclick="deleteProduct('${productItem.id}')"
            class="btn btn-danger"
          >
            Xóa
          </button>

          <button
            data-toggle="modal"
            data-target="#myModal"
            onclick="getProductInfo('${productItem.id}')"
            class="btn btn-info"
          >
            Sửa
          </button>
        </td>
      </tr>`;
  }
  document.getElementById("tbodyProduct").innerHTML = tableHTML;
};

let getProduct = () => {
  loadingService.loadingOn();
  productService
    .getProductList()
    .then((res) => {
      console.log(res);
      productList = [...res.data];
      rendderProduct();
      loadingService.loadingOff();
    })
    .catch((err) => {
      console.log(err);
    });
};

let deleteProduct = (id) => {
  loadingService.loadingOn();
  productService
    .deleteProductItem(id)
    .then((res) => {
      console.log(res);
      getProduct();
      loadingService.loadingOff();
    })
    .catch((err) => {
      console.log(err);
      loadingService.loadingOff();
    });
};

let getProductInfo = (id) => {
  loadingService.loadingOn();
  productService
    .getProductItemInfo(id)
    .then((res) => {
      console.log(res);
      let productItem = res.data;

      //show & disable id input
      document.getElementById("form-id").style.display = "block";
      document.getElementById("id").disabled = true;
      document.getElementById("id").value = productItem.id;

      document.getElementById("name").value = productItem.name;
      document.getElementById("price").value = productItem.price;
      document.getElementById("img").value = productItem.img;
      document.getElementById("des").value = productItem.des;
      document.getElementById("screen").value = productItem.screen;
      document.getElementById("backCamera").value = productItem.backCamera;
      document.getElementById("frontCamera").value = productItem.frontCamera;
      document.getElementById("type").value = productItem.type;

      document.getElementById("btnUpdate").style.display = "block";
      document.getElementById("btnCreate").style.display = "none";

      loadingService.loadingOff();
    })
    .catch((err) => {
      console.log(err);
      loadingService.loadingOff();
    });
};

let updateProductInfo = () => {
  loadingService.loadingOn();

  let id = document.getElementById("id").value;
  let name = document.getElementById("name").value;
  let price = document.getElementById("price").value * 1;
  let screen = document.getElementById("screen").value;
  let backCamera = document.getElementById("backCamera").value;
  let frontCamera = document.getElementById("frontCamera").value;
  let img = document.getElementById("img").value;
  let des = document.getElementById("des").value;
  let type = document.getElementById("type").value;

  let newProduct = new Product(
    id,
    name,
    price,
    screen,
    backCamera,
    frontCamera,
    img,
    des,
    type
  );

  productService
    .updateProductItemInfo(id, newProduct)
    .then((res) => {
      console.log(res);

      document.getElementById("btnUpdate").style.display = "none";
      document.getElementById("btnCreate").style.display = "block";

      document.getElementById("myForm").reset();
      document.getElementById("form-id").style.display = "none";

      getProduct();
      loadingService.loadingOff();
    })
    .catch((err) => {
      console.log(err);
      loadingService.loadingOff();
    });
};

window.onload = () => {
  getProduct();
};
