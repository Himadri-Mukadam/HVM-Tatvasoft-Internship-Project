import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/user";


export const UserServices2 = async () => {
        return axios.get(`${BASEURL}/all`);
    
}