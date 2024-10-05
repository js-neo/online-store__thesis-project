import httpService from "./http.service";

const sizeEndpoint = "admin/size/";

const sizeService = {
  fetchAll: async () => {
    try {
      console.log("Fetching size");
      const { data } = await httpService.get(sizeEndpoint);
      return data;
    } catch (error) {
      console.error("Error fetching size:", error);
      throw error;
    }
  },
};
export default sizeService;
