import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";


export const RegServices = async (payload) => {
    return axios.post(`${BASEURL}`, payload);
}