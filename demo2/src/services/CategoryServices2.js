import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";


export const CategoryServices2 = async () => {
        return axios.get(`${BASEURL}/all`);
    
}