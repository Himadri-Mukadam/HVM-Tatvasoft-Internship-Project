import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/cart";

export const AddToCartService = (payload) =>{
    return axios.post(`${BASEURL}`,payload);
}