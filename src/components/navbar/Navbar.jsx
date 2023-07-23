import Logo from "../logo/logo"
import HomeIcon from '@mui/icons-material/Home';
import PaidIcon from '@mui/icons-material/Paid';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import LogOutPopup from "../pop-ups/LogoutPopUp";



import "./navbar.css"
import { useSelector } from "react-redux";


const Navbar = ({tab,setTab})=>{
    const email = useSelector(s => s.email)

    return(
       <div className="navbar-main-div">
            
            <div className="navbar-menus-div">
            <Logo/>
                <div onClick={() => setTab("dashboard")} className={`menu-container ${tab === "dashboard" && "active-menu"}`}>
                    <HomeIcon sx ={{fontSize:"30px"}}/>
                    <p  className="menu-title-name">Dashboard</p>
                </div>
                <div onClick={() => setTab("transaction")} className={`menu-container ${tab === "transaction" && "active-menu"}`}>
                    <PaidIcon sx ={{fontSize:"30px"}}/>
                    <p className="menu-title-name">All transaction</p>
                </div>
                <div onClick={() => setTab("profile")} className={`menu-container ${tab === "profile" && "active-menu"}`}>
                    <PersonIcon sx ={{fontSize:"30px"}}/>
                    <p className="menu-title-name">Profile</p>
                </div>
            </div>

            
            <div>
                 <hr color="gray"/>
                <div className="user-logout-div">
                    <div className="user-email-container">
                        <img className="user-img" src="https://randomuser.me/api/portraits/men/11.jpg" alt="user"/>
                        <div>
                            <p className="email">{email.slice(0,5)}</p>
                            <p className="email">{email}</p>
                        </div>
                    </div>
                    <LogOutPopup triggerElement={<button className="logout-button">
                        <LogoutIcon sx={{color:"gray",fontSize:"14px"}}/>
                    </button>}
                    />
                </div>
                
            </div>
       </div>
    )
}

export default Navbar