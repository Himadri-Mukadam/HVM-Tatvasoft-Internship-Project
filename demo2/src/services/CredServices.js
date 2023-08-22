//this is made for useContext experiment. 
//this component is not currently in use

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";


const initialValues = {
    user: "",
    setUser: () => { },
    signOut: () => { }
};

export const CredContext = createContext(initialValues);


const CredServices = ({ component }) => {
    const [userCreds, setUserCreds] = useState();
    const navigate = useNavigate();

    const setUser = (data) => {
        Cookies.set("user_info", JSON.stringify(data));
        setUserCreds(data);
    }

    const signOut = () => {
        setUserCreds(initialValues);
        navigate("/login");
    }

    useEffect(() => {
        const data = Cookies.get("user_info") || initialValues;
        //  if(!data.email) {
        //      navigate("/login");
        //  }

        setUserCreds(data);
    },[]);

    let values = {
        setUser,
        user: userCreds,
        signOut
    };

    return <CredContext.Provider value = {values}> {component} </CredContext.Provider>;
}

export default CredServices;