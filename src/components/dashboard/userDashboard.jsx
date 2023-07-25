import "./dashboard.css"
import credit_img from "../../credit.png"
import debit_img from "../../debit.png"
import RenderingUserTransactions from "../reusablecomponents/transaction-rendering/userTransaction"
import { useEffect} from "react"
import GroupedBarChart from "../reusablecomponents/bargraph/Bargraph"
import axios from "axios"
import AddTransactionPop from "../pop-ups/AddTransactionPop"
import { useSelector ,useDispatch} from "react-redux"
import { setCredit,setDebit } from "../../state"


const UserDashBoard = () => {
    const dispatch = useDispatch()
    const recentTransaction = useSelector(state => state.transactions)
    const credit = useSelector(state => state.credit);
    const debit = useSelector(state => state.debit)
    
    const user_id = useSelector(state => state.loginId)

    useEffect(()=>{
        getTotalCreditAndDebit()
    },[])

  
    const headers = {
        "Content-Type" : "application/json",
        "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
        "x-hasura-role" : "user",
        "x-hasura-user-id" : user_id
    }

    const getTotalCreditAndDebit = async() => {
        axios.get("https://bursting-gelding-24.hasura.app/api/rest/credit-debit-totals",{headers})
        .then(res => {
            const {totals_credit_debit_transactions } = res.data
            // console.log(res.data)
            let credit =0;
            let debit = 0;
            totals_credit_debit_transactions.map(each => {
                if(each.type.toLowerCase() === "credit"){
                    credit = credit + each.sum;
                }
                else{
                    debit = debit + each.sum;
                }
                return each;
            })
            // console.log(credit,debit)
            dispatch(setCredit({
                credit
            }))
            dispatch(setDebit({debit}))
        })
        .catch(e => {
            console.log(e)
        })
    }

    

    
    return(
        <div className="main-div-dashboard">
            <div className="top-bar">
                <p className="account-name">Accounts</p>
                
                {/* user id has to be  added */}
                <AddTransactionPop
                    triggerElement={<button className="add-transactio-btn">Add Transaction +</button>}
                    data={user_id}
                />


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
                        recentTransaction && recentTransaction.slice(0,3).map(each => <RenderingUserTransactions  key={each.id} each = {each} mode="user"/>)
                    }
                </div> 

                <div className="bar-graph-container">
                    <GroupedBarChart />
                </div>
            </div>

        </div>
    )
}

export default UserDashBoard