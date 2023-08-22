import App from "./App";
import '../CSS assets/MyStyle.css';
import WithAuth from "../services/WithAuth";
const HomePage = () => {
    return(
        <div className="page"> 
            <App />
        </div>
    );
}

export default WithAuth(HomePage);