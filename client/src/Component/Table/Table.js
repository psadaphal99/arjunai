import React from 'react'
import { memo } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import "./Table";
import {useAlert} from 'react-alert'
import { LoadUserNoLoad } from '../../Actions/User';


const Table = ({jsapi}) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});
 
  const postWatchList =async (id) => {

  try {
    const data1 = jsapi.filter((ele) => ele._id === id );

    let obj =data1[0];
     const {data} =  await  axiosInstance.post("/postwatchlist",obj,{
       headers:{
         "Content-Type":"application/json",
         'x-access-token': localStorage.getItem('token')
       }
     })
      
     if(data){
      dispatch(LoadUserNoLoad());
       alert.success(data.message);
     }
  } catch (error) {
       alert.error(error.response.data.message);
  }

  
  }

  const GetClickedCompany = (cname) => {
    dispatch({
      type:"GetCompanyName",
      payload:cname,
    })
  }

  

  return (
    <div className="main-div-table">
    <table className="table">
      <thead>
      <tr className='table-row'>

          <th className="table-head head-name"style={{width:"20%"}}>Company Name</th>
          <th className="table-head head-percentage" style={{width:"10%"}}>Percentage</th>
          <th className="table-head head-symbol" style={{width:"10%"}}>Symbol</th>
          <th className="table-head head-price" style={{width:"10%"}}>Price</th>
          <th className="table-head head-link" style={{width:"16%"}}>Sreener Link</th>
          <th className="table-head head-candlestick" style={{width:"20%"}}>CandleStick</th>
          <th className="table-head head-watchlist" style={{width:"7%"}}>Add to Watclist</th>
          <th className="table-head head-note" style={{width:"7%"}}>Add Note</th>       
      </tr>
      </thead>
      <tbody>
     {
         jsapi.map((ele,index) => {
            const {companyName,percentage,symbol,price,link,candleStick,_id}=ele; 
            const allstick = candleStick.split(',');
             return (
              <tr  key={_id} className ='table-row'>
          <td className="table-data">{companyName}</td>
          <td className="table-data">{percentage}</td>
          <td className="table-data table-data-symbol">{symbol}</td>
          <td className="table-data">{price}</td>
          <td className="table-data"> <a className='moreinfo' href={link} target={"_blank"} rel="noreferrer">More info</a></td>
          <td className="table-data">{allstick.map((ele,index) => {
            if(ele==='red'){
              return <span className='dot-red' key={index}></span>
            }else{
              return <span className='dot-green'></span>
            }
          })}</td>
          <td className="table-data" onClick={() => postWatchList(_id)}><span className="material-icons add-to-watchlist" 
          >view_list</span></td>
          <td className='table-data'>
           <Link to="/notes" className="add-note-table"  onClick={() => GetClickedCompany(companyName)}>
           <span className="material-icons">auto_stories</span>
           </Link>
           
           </td>
      </tr>
             );
         })
     }
             

      </tbody>
  </table>
</div>


  )
}

export default memo(Table);