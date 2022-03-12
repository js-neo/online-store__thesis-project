import httpService from "./http.service";
const categoryEndpoint = "admin/category/";

const categoryService = {
  fetchAll: async () => {
    const { data } = await httpService.get(categoryEndpoint);
    console.log("data_Category:", data);
    return data;
  },
};
export default categoryService;
