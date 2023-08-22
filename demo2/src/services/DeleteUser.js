import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";

export const DeleteUser = (id) =>{
    return axios.delete(`${BASEURL}?id=${id}`);
}