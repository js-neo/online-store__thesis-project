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
    const { data } = await httpService.get(`products?category=${category}`);
    return data;
  },
  createProduct: async (payload) => {
    console.log("payload:", payload);
    console.log("payload._id:", payload._id);
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
