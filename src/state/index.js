import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginPerson:null,
    loginId : null,
   email : null,
   transactions:[],
   credit:0,
   debit:0
}

export const authSlice = createSlice({
    name :"user",
    initialState,
    reducers:{
        setCredit:(state,action)=>{
            console.log("credit:",action.payload.credit)
            state.credit = parseInt(action.payload.credit)
        },
        addCredit:(state,action)=>{
            state.credit += parseInt(action.payload.credit)
        },
        removeCredit:(state,action)=>{
            if(state.credit > 0){
                state.credit -= parseInt(action.payload.credit)
            }
        },
        setDebit:(state,action)=>{
            state.debit = parseInt(action.payload.debit)
        },
        addDebit:(state,action)=>{
            state.debit += parseInt(action.payload.debit)
        },
        removeDebit :(state,action)=>{
            if(state.debit > 0){
                state.debit -= parseInt(action.payload.debit)
            }
        },
        setLogin:(state,action) =>{
            // console.log(action.payload.loginPerson,action.payload.loginId)
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

export const {setLogOut,setLogin,setTransactions,addTransaction,removeTransaction,updateTransaction,setCredit,setDebit,addCredit,removeCredit,addDebit,removeDebit} = authSlice.actions

export default authSlice.reducer;