import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";

export const EditUserServices = (payload) => {
    return axios.put(`${BASEURL}`, payload);
}