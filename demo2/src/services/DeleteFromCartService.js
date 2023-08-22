import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/cart";

export const DeleteFromCartService = (id) =>{
    return axios.delete(`${BASEURL}?id=${id}`);
}