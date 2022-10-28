const BASE_URL = "https://633f8e1ae44b83bc73bc2bcd.mockapi.io/phoneList/";
let productService = {
  getProductList: () => {
    return axios({
      url: BASE_URL,
      method: "GET",
    });
  },
  addProductItem: (newItem) => {
    return axios({
      url: BASE_URL,
      method: "POST",
      data: newItem,
    });
  },
  deleteProductItem: (id) => {
    return axios({
      url: BASE_URL + id,
      method: "DELETE",
    });
  },
  getProductItemInfo: (id) => {
    return axios({
      url: BASE_URL + id,
      method: "GET",
    });
  },
  updateProductItemInfo: (id, item) => {
    return axios({
      url: BASE_URL + id,
      method: "PUT",
      data: item,
    });
  },
};
