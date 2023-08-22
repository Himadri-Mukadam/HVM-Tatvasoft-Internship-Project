import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

export const AddBookService = (payload) =>{
    return axios.post(`${BASEURL}`, payload);
}