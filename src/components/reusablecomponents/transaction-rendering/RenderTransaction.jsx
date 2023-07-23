import "./index.css"

import ArrowCircleUpIcon from '../../../upArrow.png';
import ArrowCircleDownIcon from '../../../Downarrow.png';


const RenderTransaction = (props) => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const {each} = props
    const {transaction_name,type,category,date,amount,user_id,mode} = each;

    const formatDate = (date) =>{
        const ampm = date.getHours() >= 12 ? 'PM' : 'AM';
        return `${months[date.getMonth()]} ${date.getFullYear()} ${date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()}:${date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()} ${ampm}`
    }
    const t_date = new Date(date)

    return(
            <>
                    <li  className="rendering-div">
                    <div className="icon-name-container">
                    <img className="img-container" src={type === "credit" ? ArrowCircleUpIcon : ArrowCircleDownIcon} alt="user"/>
                    
                    {
                        !(mode === "user") && <img className="img-container" src="https://randomuser.me/api/portraits/men/11.jpg" alt="user"/>
                    }
                        
                        
                        <p className="user_name_tag">User Id : {user_id}</p>
                    </div>
                    <p className="catergory-type-tag" >{transaction_name}</p>
                    <p className="catergory-type-tag">{category}</p>
                    <p className="catergory-type-tag">{formatDate(t_date)}</p>
                    <p className={`${type === 'credit' ? "green-tag" : "amount-tag"} `}>{type==="credit" ? "+" : "-"}${amount}</p>

                </li>
                <hr className="hr-line" />
            </>        
    )
}

export default RenderTransaction