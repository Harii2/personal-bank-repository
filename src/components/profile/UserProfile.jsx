import AddTransactionPop from "../pop-ups/AddTransactionPop"
import "./index.css"
import { useState,useEffect } from "react"
import axios from "axios"
import { useSelector } from "react-redux"


const UserProfile = () => {
    const [user,setUser] = useState({})
    const userId = useSelector(state => state.loginId);

    useEffect(()=>{
        getUserDetails()
    },[])
    
    const getUserDetails = () =>{
        const headers = {
            "Content-Type" : "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role" : "user",
            "x-hasura-user-id" : userId
        }
        axios.get("https://bursting-gelding-24.hasura.app/api/rest/profile",{headers})
        .then(res => {
            const {users} = res.data;
            setUser(users[0]);
            
        })
        .catch(e => console.log(e))
    }
    return(
        <div className="user-main-container">
            <div className="topbar-container">
                <p className="account-name">Accounts</p>
                <AddTransactionPop
                    triggerElement={<button className="add-transactio-btn">Add Transaction +</button>}
                    data={1}
                />
            </div>

            <div className="profile-container">
                <div className="user-data-container">
                    <div className="user-img-container">
                        <img className="user-image" src="https://randomuser.me/api/portraits/men/11.jpg" alt="profile-pic"/>
                    </div>
                    {
                        user && <div className="data-container">
                        <div className="dual-name-and-value-container">
                            <div className="name-and-value-container">
                                <p className="name-tag">Your Name</p>
                                <p className="user-profile-data-input" >{user.name}</p>
                            </div>
                            <div className="name-and-value-container">
                                <p className="name-tag">User Name</p>
                                <p className="user-profile-data-input" >{user.name}</p>
                            </div>  
                        </div>

                        <div className="dual-name-and-value-container">
                            <div className="name-and-value-container">
                                <p className="name-tag">Email</p>
                                <p className="user-profile-data-input" >{user.email}</p>
                            </div>
                            <div className="name-and-value-container">
                                <p className="name-tag">Password</p>
                                <p className="user-profile-data-input" >********</p>
                            </div>  
                        </div>

                        <div className="dual-name-and-value-container">
                            <div className="name-and-value-container">
                                <p className="name-tag">Date of Birth</p>
                                <p className="user-profile-data-input" >{user.date_of_birth}</p>
                            </div>
                            <div className="name-and-value-container">
                                <p className="name-tag">Present Address</p>
                                <p className="user-profile-data-input" >{user.present_address ? user.present_address : "San Joe,San Fransico USA"}</p>
                            </div>  
                        </div>

                        <div className="dual-name-and-value-container">
                            <div className="name-and-value-container">
                                <p className="name-tag">Permanent Address</p>
                                <p className="user-profile-data-input" >{user.permanent_address ? user.permanent_address : "San Joe,San Fransico USA"}</p>
                            </div>
                            <div className="name-and-value-container">
                                <p className="name-tag">City</p>
                                <p className="user-profile-data-input" >{user.city ? user.city : "San Joe"}</p>
                            </div>  
                        </div>

                        <div className="dual-name-and-value-container">
                            <div className="name-and-value-container">
                                <p className="name-tag">Postal Code</p>
                                <p className="user-profile-data-input" >{user.postal_code ? user.postal_code : "445962"}</p>
                            </div>
                            <div className="name-and-value-container">
                                <p className="name-tag">Country</p>
                                <p className="user-profile-data-input" >{user.country ? user.country : "USA"}</p>
                            </div>  
                        </div>

                    </div>
                    }
                    
                </div>
            </div>
        </div>
    )
}

export default UserProfile