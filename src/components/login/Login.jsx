import { useState } from "react"
import "./login.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../state";
import { useDispatch } from "react-redux";
import { ToastContainer,toast } from "react-toastify";

const Login = () =>{
    const dispatch = useDispatch();
    const [loginPerson,setLoginPerson] = useState("user")
    const isAdmin = loginPerson === "admin"

    const navigate = useNavigate();
    
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");

    const [errorMsg,setErrorMsg] = useState("");

    const handleSubmit = async(e) => {
        setErrorMsg("")
        e.preventDefault();
        if(isAdmin && email !== "admin@gmail.com"){
            setErrorMsg("Enter valid admin details");
            return
        }
        if(!isAdmin && email === "admin@gmail.com"){
            setErrorMsg("Enter valid user details")
        }
        const  headers = {
            "Content-Type": "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF"
        }

        axios.get(`https://bursting-gelding-24.hasura.app/api/rest/get-user-id?email=${email}&password=${password}`,{headers})
        .then(res => {
            const {get_user_id} = res.data;
            if(get_user_id.length === 0){
                setErrorMsg("Invalid Credentials");
                return;
            }
            console.log(get_user_id)
            dispatch(setLogin({
                loginPerson : isAdmin ? "admin" : "user",
                loginId : get_user_id[0].id,
                email : email
            }))
            toast.success("Logged In succesfully")
            setInterval(()=>{
                navigate("/home")
            },3000)
            
        })
        .catch(err => {
            setErrorMsg("Enter valid credentials")
        })
    }

    return(
        <div className="login-main-div">
            <ToastContainer/>
                <div className="email-pw-div">
                    <h2>Login Form</h2>
                    <div>
                        <div className="radio-div">    
                            <div>
                                <input onChange={() => {setLoginPerson("user");setErrorMsg("")}} id='User' name='type'  checked = {loginPerson === "user"} type="radio"/>
                                <label className="label" htmlFor="User">User</label>
                            </div> 
                            <div>
                                <input onChange={() => {setLoginPerson("admin");setErrorMsg("")}} id='Admin' name='type' checked={loginPerson === "admin"} value="admin" type="radio"/>
                                <label className="label" htmlFor="Admin">Admin</label> 
                            </div>
                        </div>
                    </div>
                    <form  onSubmit={handleSubmit}>
                        <div className="email-pw-inner-div">
                            <label className="label" htmlFor="email">Email</label> <br/>
                            <input onChange={(e) => setEmail(e.target.value)} value={email} className="input" id='email' placeholder="Enter email" type="email" required/>
                        </div>

                        <div className="email-pw-inner-div">
                            <label className="label" htmlFor="Password">Password</label> <br/>
                            <input onChange={(e) => setPassword(e.target.value)} value={password}  className="input" id='Password' placeholder="" type="password" required />
                        </div>
                        <p className="error-msg">{errorMsg}</p>
                        <div className="button-div">
                            <button type="submit" className="submit-button">Submit</button>
                        </div>
                    </form>
                </div>

            
        </div>
    )
}

export default Login