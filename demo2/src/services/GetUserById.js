import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";

export const GetUserById = (Id) =>{
    return axios.get(`${BASEURL}/byId?id=${Id}`, );
}