import "./logo.css"
import logo from "../../logo.png";
const Logo = () => {
    return(
        <div className="logo-container">
            <img className="logo-img" src={logo} alt="money"/>
        </div>
    )
}

export default Logo