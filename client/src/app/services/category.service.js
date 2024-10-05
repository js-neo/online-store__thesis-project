import httpService from "./http.service";

const categoryEndpoint = "admin/category/";

const categoryService = {
  fetchAll: async () => {
    try {
      console.log("Fetching all categories...");
      const { data } = await httpService.get(categoryEndpoint);
      return data;
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  },
};
export default categoryService;
