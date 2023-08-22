import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";

export const AddCategoryService = (payload) =>{
    return axios.post(`${BASEURL}`, payload);
}