import { useState } from "react";
import "./transaction.css"
import RenderingUserTransactions from "../reusablecomponents/transaction-rendering/userTransaction";
import AddTransactionPop from "../pop-ups/AddTransactionPop";
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from "react-redux";


const UserTransaction = () =>{
    const recentTransaction = useSelector(state => state.transactions)
    const [typeTab,setTypeTab] = useState("all");

    const [btn,setBtn] = useState(1);


    const handleFilter = (type) => {
        setTypeTab(type)
    }

    const incrementBtn = () => {
        if(recentTransaction && Math.ceil(recentTransaction.length / 9) === btn){
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
                    recentTransaction && recentTransaction.slice(9*(btn-1),9*btn).map(each => {
                        if(typeTab !== "all"){
                            return (each.type === typeTab) && <RenderingUserTransactions  key = {each.id} each={each}/>
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