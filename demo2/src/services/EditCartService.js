import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/cart";

export const EditCartService = (payload) => {
    return axios.put(`${BASEURL}`, payload);
}