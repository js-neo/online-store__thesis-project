import httpService from "./http.service";
import configFile from "../config.json";

const productEndpoint = "products/";
const adminEndpoint = "admin/";

const productService = {
  fetchAll: async () => {
    console.log("Fetching all products...");
    try {
      console.log("Fetching all products in try...");
      const fullUrl = `${configFile.apiEndpoint}${productEndpoint}`;
      console.log("Full URL:", fullUrl);
      const { data } = await httpService.get(productEndpoint);
      console.log("Fetched products:", data);
      return data;
    } catch (error) {
      console.error("Error fetching all products:", error);
      throw error;
    }
  },

  getProductById: async (productId) => {
    console.log(`Fetching product with ID: ${productId}`);
    try {
      const { data } = await httpService.get(productEndpoint + productId);
      console.log("Fetched product:", data);
      return data;
    } catch (error) {
      console.error(`Error fetching product with ID ${productId}:`, error);
      throw error;
    }
  },

  getProductsCategory: async (category) => {
    console.log("GET_PRODUCTS_CATEGORY_START");
    console.log("CATEGORY:", category);
    try {
      const { data } = await httpService.get(`products?category=${category}`);
      console.log("DATA_Category:", data);
      return data;
    } catch (error) {
      console.error("Error fetching products by category:", error);
      throw error;
    }
  },

  createProduct: async (payload) => {
    console.log("Creating product with payload:", payload);
    try {
      const { data } = await httpService.post(
        `${adminEndpoint}addProduct/`,
        payload
      );
      console.log("Product created:", data);
      return data;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  },

  removeProduct: async (productId) => {
    console.log(`Removing product with ID: ${productId}`);
    try {
      const { data } = await httpService.delete(productEndpoint + productId);
      console.log("Product removed:", data);
      return data;
    } catch (error) {
      console.error(`Error removing product with ID ${productId}:`, error);
      throw error;
    }
  },
};

export default productService;
