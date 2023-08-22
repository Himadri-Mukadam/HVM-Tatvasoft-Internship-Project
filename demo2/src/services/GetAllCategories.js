import axios from "axios";
const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category/all";


export const GetAllCategories = async() => {
    return axios.get(`${BASEURL}`);
}