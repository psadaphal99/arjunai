import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './calculator.css'
import axios from 'axios';
import { LoadUserNoLoad } from '../../Actions/User'
import {useAlert} from 'react-alert'



const Calculator = ({setCalcOpen}) => {
  const [investmentValue,setInvestmentValue] = useState("");
  const [stockPrice,setStockPrice] = useState("");
  const [company,setCompany] = useState("");
  const [day,setDay] = useState("");
  const {calculator} = useSelector(state => state.user.user);
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
  const dispatch = useDispatch();
  const alert = useAlert();

  

  const getValue = (e) => {
    try {  
    e.preventDefault();
    let totalInvestment =Number(investmentValue);
    let stock = Number(stockPrice);
    setStockPrice(stock);
    let d = Number(day);
    setDay(d);
    let dailyInvestment = totalInvestment/d;
    let noOfStocks = Math.round(dailyInvestment/stock);
    
    let obj = {
      day,
      companyName:company,
      investment:stock*noOfStocks,
      numberOfStocks:noOfStocks,
      price:stock,
    }
   
    axiosInstance.post("/postcalcdata",obj,{
      headers:{
        'x-access-token': localStorage.getItem('token')
    }
    }).then(res => {
      if(res.data === "Record Added"){
       dispatch(LoadUserNoLoad());
       alert.success(res.data)
      }
     })
     setInvestmentValue("");
     setStockPrice("");
     setCompany("");
     setDay("");
    //  setNumberOfStocks("");

    } catch (error) {
      alert.error(error.response.data.message)

    }
      } 


  const deleteRecord = (id) => {
    try {
      axiosInstance.delete(`/deletecalcdata/${id}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      })
      .then(res => {
         if(res.data === "Record Deleted"){
           dispatch(LoadUserNoLoad());
         }
        alert.success(res.data);
        })
     } catch (error) {
       alert.error(error.response.data.message)
     }
  }

  return (
    <div className='calc-container' >
    <div className='Calculator'>
     <span className="material-icons close-calc" onClick={() => setCalcOpen(false)}>close</span>
     <div className="form">
       <input type="number" placeholder='InvestMent Amount' value={investmentValue} onChange={(e) => setInvestmentValue(e.target.value)}/>
       <input type="number" placeholder='Stock Price' value={stockPrice}  onChange={(e) => setStockPrice(e.target.value)} />
       <input type="text" placeholder='Company Name' value={company}  onChange={(e) => setCompany(e.target.value)} />
       
        <select name="number" placeholder='No of Days' value={day}  onChange={(e) => setDay(e.target.value)}>
        <option defaultValue="" disabled>No of Days</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
        </select>
       <button onClick={getValue}>Calculate</button>
     </div>
     </div>

     <table className="table calc-table">
      <thead>
      <tr className='table-row'>
          <th className="table-head head">Day</th>
          <th className="table-head head">Company</th>
          <th className="table-head head">Investment</th>
          <th className="table-head head">Shares</th>
          <th className="table-head head">Price</th>         
          <th className="table-head head">Avg Price</th>     
          <th className="table-head head head-gain">5%<span className="material-icons gain-arrow">arrow_upward</span></th>         
          <th className="table-head head">10%<span className="material-icons gain-arrow">arrow_upward</span></th>         
          <th className="table-head head">15%<span className="material-icons gain-arrow">arrow_upward</span></th>                 
          <th className="table-head head" style={{width: "15%"}}>Date</th>         
          <th className="table-head head">Delete</th>         
      </tr>
      </thead>
      <tbody>
        {
          calculator.map(ele => {
            const {day,companyName,investment,numberOfStocks,price,date,averagePrice,_id} = ele;
              let fivePercentGain = (averagePrice*5)/100+averagePrice;
              let tenPercentGain = (averagePrice*10)/100+averagePrice;
              let fifteenPercentGain = (averagePrice*15)/100+averagePrice;
            return(
              <tr className ='table-row' key={_id}>
           <td className="table-data t-data">{day}</td>
          <td className="table-data t-data">{companyName}</td>
          <td className="table-data t-data">{Math.round(investment) }</td>
          <td className="table-data t-data">{Math.round(numberOfStocks)}</td>
          <td className="table-data t-data">{price}</td>       
          <td className="table-data t-data" style={{color:'red'}}>{averagePrice}</td>       
          <td className="table-data t-data" style={{color:'green'}}>{fivePercentGain.toFixed(1)}</td>       
          <td className="table-data t-data"  style={{color:'green'}}>{tenPercentGain.toFixed(1)}</td>       
          <td className="table-data t-data"  style={{color:'green'}}>{fifteenPercentGain.toFixed(1)}</td>       
          <td className="table-data t-data">{date.slice(0,10)}</td>       
          <td className="table-data t-data"><span className="material-icons delete-icon" onClick={() =>deleteRecord(_id)}>delete</span></td>       
      </tr>
            )
          })
        }
      </tbody>
  </table>
    </div>
    
  )
}

export default Calculator;