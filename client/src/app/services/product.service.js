import httpService from "./http.service";

const productEndpoint = "products/";
const adminEndpoint = "admin/";

const productService = {
  fetchAll: async () => {
    const { data } = await httpService.get(productEndpoint);
    return data;
  },
  getProductById: async (productId) => {
    const { data } = await httpService.get(productEndpoint + productId);
    return data;
  },
  getProductsCategory: async (category) => {
    console.log("GETPRODUCTSCATEGORY_START");
    console.log("CATEGORY:", category);
    const { data } = await httpService.get(`products?category=${category}`);
    console.log("DATA_CAtegory:", data);
    return data;
  },
  createProduct: async (payload) => {
    const { data } = await httpService.post(
      `${adminEndpoint}addProduct/`,
      payload
    );
    return data;
  },
  removeProduct: async (productId) => {
    const { data } = await httpService.delete(productEndpoint + productId);
    return data;
  },
};
export default productService;
