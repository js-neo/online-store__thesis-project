import httpService from "./http.service";
const sizeEndpoint = "admin/size/";

const sizeService = {
  fetchAll: async () => {
    const { data } = await httpService.get(sizeEndpoint);
    return data;
  },
};
export default sizeService;
