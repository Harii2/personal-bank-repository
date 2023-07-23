import "./index.css"

import ArrowCircleUpIcon from '../../../upArrow.png';
import ArrowCircleDownIcon from '../../../Downarrow.png';

import EditIcon from "../../../pencil-02.jpg";
import DeleteIcon from "../../../trash-01.png"

import DeleteTransactionPopUp from "../../pop-ups/DeleteTransactionPopUp";
import UpdateTransactionPopUp from "../../pop-ups/UpdateTransactionPop";


const RenderingUserTransactions = (props) => {
    const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const {each} = props
    const {setRecentTransactions} = props
    const {id,transaction_name,type,category,date,amount} = each;

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
                        <p className="user_name_tag">{transaction_name}</p>
                    </div>
                    <p className="catergory-type-tag-user">{category}</p>
                    <p className="catergory-type-tag-user">{formatDate(t_date)}</p>
                    <p className={`${type === 'credit' ? "green-tag" : "amount-tag"} `}>{type==="credit" ? "+" : "-"}${amount}</p>
                    <p className="catergory-type-tag-user">

                        <UpdateTransactionPopUp triggerElement={<button className="trigger-btn">
                            <img style={{cursor:"pointer",marginRight:"10px"}} width={"20px"} src={EditIcon} alt="edit-icon"/>
                                </button>}
                                data={each}
                        />
                        
                        <DeleteTransactionPopUp setRecentTransactions={setRecentTransactions} triggerElement={<button className="trigger-btn">
                            <img  style={{cursor:"pointer"}} src={DeleteIcon} alt="delete-icon"/>
                            </button>}
                            data={id}
                        />
                    </p>
                </li>
                <hr className="hr-line" />
            </>        
    )
}

export default RenderingUserTransactions