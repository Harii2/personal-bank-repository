import Navbar from "../navbar/Navbar"
import { useState } from "react"
import Dashboard from "../dashboard/Dashboard";
import Transactions from "../transactions/Transaction";
import "./home.css"
import UserProfile from "../profile/UserProfile"
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../logo/logo"

import { useDispatch } from "react-redux"
import { setLogOut } from "../../state"

const Home = () => {
    const [tab,setTab] = useState("dashboard");
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
      };

      const handleLogout = () => {
        dispatch(setLogOut({
            loginId :null,
            loginPerson : null,
        }))
      }

    return(
       <div className="home-main-div">
            <div className="mobile-navbar-container dropdown-container">
                <Logo/>
                <MenuIcon onClick={handleMenuToggle} sx={{cursor:"pointer"}}/>
                    {showMenu && (
                        <div className="dropdown-menu">
                        <ul>
                            <li onClick={() => setTab("dashboard")}>DashBoard</li>
                            <li onClick={() => setTab("transaction")}>Transactions</li>
                            <li onClick={()=>setTab("profile")}>Profile</li>
                            <hr color="gray"/>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                        </div>
                    )}
                
            </div>
            
            <div className="nav-container">
                <Navbar  tab = {tab} setTab={setTab}/>
            </div>
            {
                tab === "dashboard" && <Dashboard/>
            }
            {
                tab === "transaction" && <Transactions/>
            }
            {
                tab === "profile" && <UserProfile/>
            }
        </div>
    )
}

export default  Home