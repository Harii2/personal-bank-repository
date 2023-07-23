
import UserDashBoard from "../dashboard/userDashboard"
import Navbar from "../navbar/Navbar"
import "./home.css"
import UserTransaction from "../transactions/UserTransaction"
import UserProfile from "../profile/UserProfile"
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../logo/logo"

import { useState } from "react"

import { useDispatch } from "react-redux"
import { setLogOut } from "../../state"

const UserHome = () => {
    const [tab,setTab] = useState("dashboard");
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
      };

      const handleLogout = () => {
        dispatch(setLogOut({
            loginId :null,
            loginPerson : null
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
                tab === "dashboard" && <UserDashBoard/>
            }
            {
                tab === "transaction" && <UserTransaction/>
            }
            {
                tab === "profile" && <UserProfile/>
            }
        </div>
    )
}

export default UserHome