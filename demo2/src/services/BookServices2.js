import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/book";


export const BookServices2 = async () => {
        return axios.get(`${BASEURL}/all`);
    
}