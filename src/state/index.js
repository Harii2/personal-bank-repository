import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginPerson:null,
    loginId : null,
   email : null,
   transactions : []
}

export const authSlice = createSlice({
    name :"auth",
    initialState,
    reducers:{
        setLogin:(state,action) =>{
            console.log(action.payload.loginPerson,action.payload.loginId)
            state.loginPerson = action.payload.loginPerson;
            state.loginId = action.payload.loginId;
            state.email = action.payload.email
        },
        setLogOut:(state) =>{
            state.loginPerson = null;
            state.loginId = null;
            state.email = null
        },
        removeDelete:(state,action) => {
            const updatedTransactions = state.transactions.filter((each)=>{
                if(each.id !== action.payload.id){
                    return each
                }
                return null
            })
            state.transactions = updatedTransactions
        }
    }
})

export const {setLogOut,setLogin} = authSlice.actions

export default authSlice.reducer;