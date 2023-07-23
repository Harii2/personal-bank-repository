import { useState ,useEffect} from "react";
import axios from "axios"
import "./transaction.css"
import RenderingUserTransactions from "../reusablecomponents/transaction-rendering/userTransaction";
import AddTransactionPop from "../pop-ups/AddTransactionPop";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";


const UserTransaction = () =>{
    const [typeTab,setTypeTab] = useState("all");
    const [transactionsList,setTransactionsList] = useState([]);
    const [btn,setBtn] = useState(1);

    const user_id = useSelector(s => s.loginId)

    useEffect(()=>{
        getAllUserTransactions()
    })
    const headers = {
        "Content-Type" : "application/json",
        "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role" : "user",
        "x-hasura-user-id" : user_id
    }

    const getAllUserTransactions = () => {
        axios.get("https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=100000&offset=0",{headers})
        .then(res => {
            const {transactions} = res.data;
            setTransactionsList(transactions);
        })
        .catch(e => console.log(e))
    }

    const handleFilter = (type) => {
        setTypeTab(type)
    }

    const incrementBtn = () => {
        if(transactionsList && Math.ceil(transactionsList.length / 9) === btn){
            return;
        }
        setBtn(btn + 1);
    }

    const decrementBtn = () => {
        if(btn === 1){
            return ;
        }
        setBtn(btn-1);
    }

    const handleDeleteToastify = (message) =>{
        toast.success(message,{
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
    }

    return(
        <div className="transaction-main-container">
            <ToastContainer/>
            <div className="btn-transaction-top-container">
                <div className="transaction-top-container">
                    <h2 className="transaction-tag">Transactions</h2>
                    <div className="type-tab-container">
                        <span onClick={() => { handleFilter("all")}} className={`tab-tag ${typeTab === "all" && "active-tab"}`}>All Transactions</span>
                        <span onClick={() => {handleFilter("credit")}} className={`tab-tag ${typeTab === "credit" && "active-tab"}`}>Credit</span>
                        <span onClick={() => { handleFilter("debit")}} className={`tab-tag ${typeTab === "debit" && "active-tab"}`}>Debit</span>
                    </div>
                </div>
                <AddTransactionPop
                    triggerElement={<button className="add-transactio-btn">Add Transaction +</button>}
                    data={1}
                    onSuccess = {handleDeleteToastify}
                />
            </div>
            
            <div className="transactions-rendering-elements-container">
                <div className="transactions-heading-elements-container">
                    <div className="heading-container-of-user">
                        <span className="head-tag">Transaction Name</span>
                        <span className="head-tag">Category</span>
                        <span className="head-tag">Date</span>
                        <span className="head-tag">Amount</span>
                        <span className="head-tag"></span>
                    </div>
                    <hr/>

                {
                    transactionsList && transactionsList.slice(9*(btn-1),9*btn).map(each => {
                        if(typeTab !== "all"){
                            return (each.type === typeTab) && <RenderingUserTransactions key = {each.id} each={each}/>
                        }
                        return <RenderingUserTransactions key = {each.id} each={each}/>
                    })
                }

            <div className="page-buttons-div">
                <button onClick={decrementBtn} className="page-button"> {"<"}</button>
                <button className="page-button-main">{btn}</button>
                <button onClick={incrementBtn} className="page-button">{">"}</button>
            </div>
                </div>
                
            </div>
        </div>
    )
}

export default UserTransaction