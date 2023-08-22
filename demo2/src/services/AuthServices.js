import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";


export const AuthServices = async (payload) => {
    return axios.post(`${BASEURL}/login`, payload);
    //alert("works");
}