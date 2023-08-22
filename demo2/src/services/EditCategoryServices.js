import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";

export const EditCategoryServices = (payload) => {
    return axios.put(`${BASEURL}`, payload);
}