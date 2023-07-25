import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './Popup.css';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import { useSelector ,useDispatch} from 'react-redux';

import { addTransaction ,addCredit,addDebit} from '../../state';

const AddTransactionPop = ({triggerElement}) => {
    const [transactionName,setTransactionName] = useState("");
    const [type,setType] = useState("")
    const [category,setCategory] = useState("");
    const [amount,setAmount] = useState("");
    const [date,setDate] = useState("");

    const userId = useSelector(state=>state.loginId)
    const dispatch = useDispatch()

    const handlePost = async(close) => {
        const body = {
            "name" : transactionName,
            "type": type,
            "category": category,
            "amount": amount,
            "date": new Date(),
            "user_id": userId
        }
        const headers = {
            "Content-Type" : "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role" : "user",
            "x-hasura-user-id" : userId
        }

       await axios.post("https://bursting-gelding-24.hasura.app/api/rest/add-transaction",body,{headers})
        .then((res) => {
            console.log(res.data)
            setTimeout( ()=>{
                toast.success('Transaction Added Succesfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            },1000);
            setAmount("");
            setTransactionName("");
            setCategory("")
            setType("");
            setDate("")
            const {insert_transactions_one } = res.data 
           dispatch(addTransaction({
            transaction : [insert_transactions_one]
           }))
           if(type==="credit"){
                dispatch(addCredit({
                    credit : amount
                }))
           }
           else{
            dispatch(addDebit({
                debit : amount
            }))
           }
        })
        .catch(e => {
            
            const {response} =e 
            const {data} = response 
            const {error} = data
            toast.error(error)
            // console.log(e)
            // console.log(e.message)
        })
    }

    return(
        <Popup trigger={triggerElement} modal closeOnDocumentClick>
      {close => (
        <div className="popup">
            <ToastContainer/>
          <div className="popup-content">
            <div>
                <div className='h3-close-container'>
                    <h3 className='delete-h2'>Add Transaction</h3>
                    <CloseIcon onClick={close}/>
                </div>
                <p className='delete-content-tag'>You can add transaction here</p>

                <div className='label-input-container'>
                    <label className='delete-content-tag'>Transaction Name</label> <br/>
                    <input value={transactionName} onChange={(e) => setTransactionName(e.target.value)} className="input-text" type="text"/>
                </div>

                <div className='label-input-container'>
                    <label className='delete-content-tag'>Transaction Type</label> <br/>
                    <select value={type} onChange={(e) => setType(e.target.value)} className="input-text">
                        <option value="">Select Transaction Type</option>
                        <option value="credit">Credit</option>
                        <option value="debit">Debit</option>
                    </select>
                </div>

                <div className='label-input-container'>
                    <label className='delete-content-tag'>Category</label> <br/>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} className="input-text">
                        <option value="">Select Transaction category</option>
                        <option value="NetFlix Subscription">NetFlix Subscription</option>
                        <option value="Aha Subscription">Aha Subscription</option>
                        <option value="Groceries">Groceries</option>
                        <option value="Movies">Movies</option>
                        <option value="Friends">Friends</option>
                        <option value="Others">Others</option>
                    </select>
                </div>

                <div className='label-input-container'>
                    <label className='delete-content-tag'>Amount</label> <br/>
                    <input value={amount} onChange={(e) => setAmount(e.target.value)} className="input-text" type="text"/>
                </div>

                <div className='label-input-container'>
                    <label className='delete-content-tag'>Date</label> <br/>
                    <input value={date} onChange={e => setDate(e.target.value)} className="input-text" type="text"/>
                </div>

                <button onClick={() => handlePost(close)} className='add-transaction-button'>Add Transaction</button>

            </div>
          </div>
        </div>
      )}
    </Popup>
    )
}

export default AddTransactionPop