import httpService from "./http.service";
const colorEndpoint = "admin/color/";

const colorService = {
  fetchAll: async () => {
    const { data } = await httpService.get(colorEndpoint);
    return data;
  },
};
export default colorService;
