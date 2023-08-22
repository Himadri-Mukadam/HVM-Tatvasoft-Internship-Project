import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";

export const DeleteCategory = (id) =>{
    return axios.delete(`${BASEURL}?id=${id}`);
}