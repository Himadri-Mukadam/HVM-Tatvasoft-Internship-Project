import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

export const DeleteBook = (id) =>{
    return axios.delete(`${BASEURL}?id=${id}`);
}