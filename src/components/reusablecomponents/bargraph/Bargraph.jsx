import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import axios from 'axios';
import "./index.css"
import { useSelector } from 'react-redux';





function formatDate(dates) {
  const date = new Date(dates)
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


const GroupedBarChart = () => {
  const isAdmin = Boolean(useSelector((state) => state.loginPerson === "admin"))
  const [data,setData] = useState([])
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
      // console.log(last7DaysArray)
      let lastDays = []
      console.log(res.data)
      for(let each of last_7_days_transactions_credit_debit_totals){
        const formatted_date = formatDate(each.date);
        const index = lastDays.find(item => item.date === formatted_date);
        if(index >= 0){
           if(each.type.toLowerCase() === "credit"){
              lastDays[index].credit += each.sum
           }
           else{
            lastDays[index].debit += each.sum;
           }
        }
        else{
          let debit =0
          let credit = 0;

            if(each.type.toLowerCase() === "credit"){
              credit = each.sum
          }
          else{
            debit = each.sum;
          }
          
          const newObj = {
            date : formatted_date,
            debit,credit
          };
          lastDays.push(newObj)
        }
      }
      // console.log(lastDays)
      setData(lastDays);

  })
  .catch(e => console.log(e))
    
  }
  
  // console.log(data)
  return (
    <div className='chart-container'>
      <BarChart className='bargraph' width={900} height={400}  data={data}>
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
