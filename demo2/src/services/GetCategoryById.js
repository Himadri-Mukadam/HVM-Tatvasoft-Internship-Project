import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";

export const GetCategoryById = (Id) =>{
    return axios.get(`${BASEURL}/byId?id=${Id}`, );
}