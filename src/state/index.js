import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginPerson:null,
    loginId : null,
   email : null,
   transactions:[]
}

export const authSlice = createSlice({
    name :"user",
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
        setTransactions : (state,action) => {
            state.transactions = action.payload.transactions
        },
        addTransaction : (state,action) => {
            state.transactions = [...action.payload.transaction,...state.transactions]
        },
        updateTransaction:(state,action)=>{
            // console.log(action.payload.transaction)
            const filteredTransactions = state.transactions.map(each => {
                if(each.id === action.payload.transaction.id){
                    return action.payload.transaction;
                }
                return each ;
            })
            state.transactions = filteredTransactions 
        },
        removeTransaction:(state,action) => {
            const updatedTransactions = state.transactions.filter(each => each.id !== action.payload.id)
            state.transactions = updatedTransactions ;
            // console.log(state.transactions)
        }
    }
})

export const {setLogOut,setLogin,setTransactions,addTransaction,removeTransaction,updateTransaction} = authSlice.actions

export default authSlice.reducer;