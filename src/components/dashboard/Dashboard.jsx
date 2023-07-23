import "./dashboard.css"
import credit_img from "../../credit.png"
import debit_img from "../../debit.png"
import RenderTransaction from "../reusablecomponents/transaction-rendering/RenderTransaction"
import { useEffect, useState } from "react"
import axios from "axios"
import GroupedBarChart from "../reusablecomponents/bargraph/Bargraph"

const Dashboard = () =>{

    const [credit,setCredit] = useState("");
    const [debit,setDebit] = useState("")
    const [recentTransaction,setRecentTransactions] = useState([])

    useEffect(()=>{
        getTotalCreditAndDebit();
        getRecentTransactions();
    },[])
    
    const getTotalCreditAndDebit = async() => {
        const headers = {
            "Content-Type" : "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hausra-role" : "admin"
        }
        axios.get("https://bursting-gelding-24.hasura.app/api/rest/transaction-totals-admin",{headers})
        .then(res => {
            const {transaction_totals_admin } = res.data
            let credit =0;
            let debit = 0;
            transaction_totals_admin.map(each => {
                if(each.type.toLowerCase() === "credit"){
                    credit = credit + each.sum;
                }
                else{
                    debit = debit + each.sum;
                }
                return ;
            })
            setDebit(debit )
            setCredit(credit )
        })
        .catch(e => {
            console.log(e)
        })
    }

    const getRecentTransactions = async() => {
        const headers = {
            "Content-Type" : "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hausra-role" : "admin"
        }
        axios.get("https://bursting-gelding-24.hasura.app/api/rest/all-transactions?limit=1000000&offset=0",{headers})
        .then( res=>{
            const {transactions} = res.data;
            const reverseTransactions = transactions.slice().reverse();
            setRecentTransactions(reverseTransactions.slice(0,3))
            // console.log(transactions)
        }
        )
        .catch(e => {
            console.log(e)
        })
    }

    return(
        <div className="main-div-dashboard">
            <div className="top-bar">
                <p className="account-name">Accounts</p>
                <button className="add-transactio-btn">Add Transaction +</button>
            </div>

            <div className="credit-debits-accounts-conatiner">
                <div className="credits-debits-conatiner">
                    <div className="credit-container">
                        <div>
                            <p className="credit-amount">${credit}<br/><span className="credit-tag">Credit</span></p>
                        </div>
                        <img className="credit-img" src={credit_img} alt="credit"/>
                    </div>

                    <div className="credit-container">
                        <div>
                            <p className="debit-amount">${debit}<br/><span className="credit-tag">Debit</span></p>
                        </div>
                        <img className="credit-img" src={debit_img} alt="credit"/>
                    </div>
                </div>

                <h2 className="last-trasaction-tag">Last Transaction</h2>
                <div className="rendering-transaction-container">
                    {
                        recentTransaction && recentTransaction.map(each => <RenderTransaction key={each.id} each = {each}/>)
                    }
                </div> 

                <div className="bar-graph-container">
                     <GroupedBarChart />
                </div>
            </div>
        </div>
    )
}

export default Dashboard