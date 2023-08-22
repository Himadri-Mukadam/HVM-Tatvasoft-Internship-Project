import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/order";

export const PlaceOrderService = (payload) => {
    return axios.post(`${BASEURL}`, payload);
}