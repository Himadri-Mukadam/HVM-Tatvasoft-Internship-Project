import axios from "axios";

const BASEURL = "https://book-e-sell-node-api.vercel.app/api/category";


export const CategoryServices = async (filter) => {
    if(filter.keyword === ""){
        return axios.
        get(`${BASEURL}?pageSize=${filter.pageSize}&pageIndex=${filter.pageIndex}`);
    } else {    
        return axios.
        get(`${BASEURL}?pageSize=${filter.pageSize}&pageIndex=${filter.pageIndex}&keyword=${filter.keyword}`);
    }
    
    //alert("works");
} 