import { useEffect, useState } from "react"
import "./transaction.css"
import RenderTransaction from "../reusablecomponents/transaction-rendering/RenderTransaction";
import axios from "axios"

const Transactions = () =>{
    const [typeTab,setTypeTab] = useState("all");
    const [transactionsList,setTransactionsList] = useState([]);
    const [btn,setBtn] = useState(1);

    useEffect(()=>{
        // eslint-disable-next-line react-hooks/exhaustive-deps
        getAllTransactions()
    },[]) 
    
    
    const handleFilter = async(type) => {
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

    const getAllTransactions = async() => {
        const headers = {
            "Content-Type" : "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role" : "admin"
        }
        const limit = 1000000 ;
        const offset = 0;
        axios.get(`https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=${limit}&offset=${offset}`,{headers})
        .then(res => {
            const {transactions} = res.data;
            setTransactionsList(transactions);
        })
        .catch(e => console.log(e))
    }

    return(
        <div className="transaction-main-container">
            <div className="transaction-top-container">
                <h2 className="transaction-tag">Transactions</h2>
                <div className="type-tab-container">
                    <span onClick={() => { handleFilter("all")}} className={`tab-tag ${typeTab === "all" && "active-tab"}`}>All Transactions</span>
                    <span onClick={() => {handleFilter("credit")}} className={`tab-tag ${typeTab === "credit" && "active-tab"}`}>Credit</span>
                    <span onClick={() => { handleFilter("debit")}} className={`tab-tag ${typeTab === "debit" && "active-tab"}`}>Debit</span>
                </div>
            </div>
            
            <div className="transactions-and-acc-container">
            <div className="transactions-items-container">
                <div className="head-container">
                    <span className="name-head-tag">User Name</span>
                    <span className="head-tag">Transaction Name</span>
                    <span className="head-tag">Category</span>
                    <span className="head-tag">Date</span>
                    <span className="head-tag">Amount</span>
                </div>

                {  transactionsList &&
                    transactionsList.slice(9*(btn-1),9*btn).map(each => {
                        if(typeTab !== "all"){
                            return (each.type === typeTab) && <RenderTransaction key = {each.id} each={each}/>
                        }
                        return <RenderTransaction key = {each.id} each={each}/>
                    })
                }
            </div>
            <div className="page-buttons-div">
                <button onClick={decrementBtn} className="page-button"> {"<"}</button>
                <button className="page-button-main">{btn}</button>
                <button onClick={incrementBtn} className="page-button">{">"}</button>
            </div>
            </div>
        </div>
    )
}

export default Transactions