import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";

export const GetBookById = (Id) =>{
    return axios.get(`${BASEURL}/byId?id=${Id}`, );
}