import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";


export const SearchBookService = async (payload) => {
    return axios.get(`${BASEURL}/search?keyword=${payload}`);
    //alert("works");
}