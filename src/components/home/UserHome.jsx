
import UserDashBoard from "../dashboard/userDashboard"
import Navbar from "../navbar/Navbar"
import "./home.css"
import UserTransaction from "../transactions/UserTransaction"
import UserProfile from "../profile/UserProfile"
import MenuIcon from '@mui/icons-material/Menu';
import Logo from "../logo/logo"
import { setTransactions } from "../../state"
import axios from "axios"

import { useState ,useEffect} from "react"

import { useDispatch,useSelector } from "react-redux"
import { setLogOut } from "../../state"



const UserHome = () => {
    const [tab,setTab] = useState("dashboard");
    const [showMenu, setShowMenu] = useState(false);
    const dispatch = useDispatch()
    const user_id = useSelector(state => state.loginId)

    const handleMenuToggle = () => {
        setShowMenu(!showMenu);
      };

      const getRecentTransactions = async() => { 
        const headers = {
            "Content-Type" : "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role" : "user",
            "x-hasura-user-id" : user_id
        }
        axios.get("https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000000&offset=0",{headers})
        .then( res=>{
            const {transactions} = res.data;
            const reverseTransactions = transactions.slice().reverse();
            dispatch(setTransactions({
                transactions : reverseTransactions
            }))
        }
        )
        .catch(e => {
            console.log(e)
        })
    }

    useEffect(()=>{
        getRecentTransactions()
    },[])

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