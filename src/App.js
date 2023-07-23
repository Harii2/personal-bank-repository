import "./App.css"
import 'normalize.css';
import { BrowserRouter,Route,Routes ,Navigate} from "react-router-dom";
import {  useSelector } from "react-redux";
import Login from "./components/login/Login";
import Home from "./components/home/Home";
import UserHome from "./components/home/UserHome";

function App(){
    const isAuth = Boolean(useSelector((state) => state.loginId));
    const isAdmin = Boolean(useSelector((state) => state.loginPerson === "admin"))
    console.log(isAuth,isAdmin)
    
    return(
        <BrowserRouter>
              <Routes>
                    <Route path="/" element = {<Login/>}/>
                    <Route path="/home" element = {isAuth ? (isAdmin ? <Home/> : <UserHome/>) : <Navigate to="/" />}/>
              </Routes>
        </BrowserRouter>
    )
}

export default App;
