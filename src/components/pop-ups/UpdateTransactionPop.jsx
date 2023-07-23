import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import './Popup.css';
import CloseIcon from '@mui/icons-material/Close';
import { ToastContainer, toast } from 'react-toastify';
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { updateTransaction } from '../../state';
import { addCredit,removeCredit,addDebit,removeDebit } from '../../state';

const UpdateTransactionPopUp = ({triggerElement,data}) => {
    
    const [transactionName,setTransactionName] = useState(data.transaction_name);
    const [type,setType] = useState(data.type)
    const [category,setCategory] = useState(data.category);
    const [amount,setAmount] = useState(data.amount);
    const [date,setDate] = useState(data.date);
    const dispatch = useDispatch()

    const userId = useSelector(state => state.loginId)

    const handlePost = async() => {
        const body = {
            "id" : data.id,
            "name" : transactionName,
            "type": type,
            "category": category,
            "amount": amount,
            "date": data.date,
            // "user_id": 1
        }

        const headers = {
            "Content-Type" : "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role" : "user",
            "x-hasura-user-id" : userId
        }
        
        // console.log(headers,x)
        await axios.post("https://bursting-gelding-24.hasura.app/api/rest/update-transaction",body,{headers})
        .then((res) => {
            console.log(res.data)
            setTimeout( ()=>{
                toast.success('Transaction updated Succesfully', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
            },1000);
            console.log(res.data)
            const {update_transactions_by_pk} = res.data ;
            dispatch(updateTransaction({
                transaction : update_transactions_by_pk
            }))

            if(update_transactions_by_pk.type.toLowerCase() ==="credit"){
                dispatch(addCredit({credit : update_transactions_by_pk.amount}))
                dispatch(removeDebit({debit:update_transactions_by_pk.amount}))
            }
            else{
                dispatch(addDebit({debit : update_transactions_by_pk.amount}))
                dispatch(removeCredit({credit : update_transactions_by_pk.amount}))
            }
            
            setAmount("");
            setTransactionName("");
            setCategory("")
            setType("");
            setDate("");
            
        })
        .catch(e => {
            console.log(e)
            toast.error(e.message)
        })

    }

    return(
        <Popup trigger={triggerElement} modal closeOnDocumentClick>
      {close => (
        <div className="popup">
          <div className="popup-content">
            <div>
                <div className='h3-close-container'>
                    <h3 className='delete-h2'>Update Transaction</h3>
                    <CloseIcon onClick={close}/>
                </div>
                <p className='delete-content-tag'>You can edit Transaction Here</p>

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
                        <option value="Shopping">Shopping</option>
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

                <button onClick={() => handlePost(close)} className='add-transaction-button'>Update Transaction</button>

            </div>
            <ToastContainer/>
          </div>
        </div>
      )}
    </Popup>
    )
}

export default UpdateTransactionPopUp