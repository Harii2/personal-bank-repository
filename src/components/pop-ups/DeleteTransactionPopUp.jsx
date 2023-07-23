import React from 'react';
import Popup from 'reactjs-popup';
import './Popup.css';

import CloseIcon from '@mui/icons-material/Close';
import DeleteImg from "../../danger.png"

import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import { useSelector } from 'react-redux';


const DeleteTransactionPopUp = ({ triggerElement,data,onSuccess}) =>{
    // console.log(onSuccess)
    const userId = useSelector(s => s.loginId)
    const handleDeleteId = async(close) => {
        const body = {"id" : data};
        console.log(body)
        const headers = {
            "Content-Type" : "application/json",
            "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
            "x-hasura-role" : "user",
            "x-hasura-user-id" : userId
        }
        console.log()
       await axios.delete( `https://bursting-gelding-24.hasura.app/api/rest/delete-transaction?id=${data}`,{headers},body)
        .then(res => {
            console.log(res.data)
            alert("Deleted Succesfully")
        })
        .catch(e => console.log(e))
        close()
    }
    
    return(
        <Popup trigger={triggerElement} modal closeOnDocumentClick>
            
        {close => (
            
          <div className="popup">
            <div className="popup-content">
                <div className="popup-img-btns-close-container">
                    <img width={"100px"} height={"100px"} src={DeleteImg} alt="danger"/>
                    <div>
                        <div>
                            <h3 className='delete-h2'>Are you want to delete it ?</h3>
                            <p className='delete-content-tag'>This transaction will delete immediately.You can't undo this action</p>
                        </div>
                        <div>
                            <button onClick={() => handleDeleteId(close)} className="yes-delete-button">Yes,Delete</button>
                            <button onClick={close} className='no-leave-it-button'> No,Leave it</button>
                        </div>
                    </div>
                    <CloseIcon onClick={close}/>
                </div>
              
            </div>
          </div>
        )}
        
      </Popup>
    )
}

export default DeleteTransactionPopUp