import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

export const EditBookServices = (payload) => {
    return axios.put(`${BASEURL}`, payload);
}