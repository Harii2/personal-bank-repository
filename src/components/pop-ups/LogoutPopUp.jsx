import React from 'react';
import Popup from 'reactjs-popup';
import './Popup.css';

import CloseIcon from '@mui/icons-material/Close';
import logout from "../../logout.png"
import 'react-toastify/dist/ReactToastify.css';

import { useDispatch } from 'react-redux';
import { setLogOut } from '../../state';

const LogOutPopup = ({triggerElement}) => {
    const dispatch = useDispatch();
    const handleLogOut = () => {
        dispatch(setLogOut({
            loginId :null,
            loginPerson : null
        }))
    }
    return(
        <Popup trigger={triggerElement} modal closeOnDocumentClick>
            
    {close => (
        
      <div className="popup">
        <div className="popup-content">
            <div className="popup-img-btns-close-container">
                <img width={"100px"} height={"100px"} src={logout} alt="danger"/>
                <div>
                    <div>
                        <h3 className='delete-h2'>Are you sure you want to logout ?</h3>
                        <p className='delete-content-tag'>You have to log in after logging out.You can't undo this action</p>
                    </div>
                    <div>
                        <button onClick={handleLogOut} className="yes-delete-button">Yes,LogOut</button>
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

export default LogOutPopup