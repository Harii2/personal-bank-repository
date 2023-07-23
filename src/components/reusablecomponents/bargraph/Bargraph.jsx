import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import "./index.css"
import { useSelector } from 'react-redux';



let currentDate = new Date();

let last7DaysArray = [];

function formatDate(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


for (let i = 0; i < 7; i++) {
  last7DaysArray.push({ date: formatDate(currentDate),credit:0,debit:0 });
  currentDate.setDate(currentDate.getDate() - 1);
}

const GroupedBarChart = () => {
  const isAdmin = Boolean(useSelector((state) => state.loginPerson === "admin"))
  const [data,setData] = useState(last7DaysArray)
  const user_id = useSelector(s => s.loginId)

  useEffect(()=>{
    getLast7DaysTransactions()
  },[])

  const getLast7DaysTransactions = () =>{

    const user_headers = {
      "Content-Type" : "application/json",
      "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
      "x-hasura-role"  : "user",
      "x-hasura-user-id" : user_id
  }
  const admin_headers = {
    "Content-Type" : "application/json",
    "x-hasura-admin-secret" : "g08A3qQy00y8yFDq3y6N1ZQnhOPOa4msdie5EtKS1hFStar01JzPKrtKEzYY2BtF",
    "x-hasura-role"  : "admin"
  }
  const headers = isAdmin ? admin_headers : user_headers
  axios.get("https://bursting-gelding-24.hasura.app/api/rest/daywise-totals-7-days",{headers})
  .then(res => {
      const {last_7_days_transactions_credit_debit_totals} = res.data;
      const curr_Date = new Date()
      for(let each of last_7_days_transactions_credit_debit_totals){
        const each_date = new Date(each.date);
        if(each.type.toLowerCase() === "credit"){
          last7DaysArray[curr_Date.getDate() - each_date.getDate()].credit += each.sum ;
        }
        else{
        last7DaysArray[curr_Date.getDate() - each_date.getDate()].debit += each.sum;
        }
        setData(last7DaysArray)
      }

  })
  .catch(e => console.log(e))
    
  }
  
  console.log(data)
  return (
    <div className='chart-container'>
      <BarChart width={1000} height={600}  data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="credit" fill="#8884d8" name="Credit" />
        <Bar dataKey="debit" fill="#82ca9d" name="Debit" />
      </BarChart>
    </div>
  );
};

export default GroupedBarChart;
