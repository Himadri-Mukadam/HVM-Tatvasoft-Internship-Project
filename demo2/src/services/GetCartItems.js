import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/cart";

export const GetCartItems = (Id) =>{
    return axios.get(`${BASEURL}?userId=${Id}`, );
}