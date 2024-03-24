import { memo } from "react";
import React, { useEffect } from 'react'
import Table from '../Component/Table/Table';
import "./AllPages.css"
// import { getCandleStickGreen1 } from "../Actions/allCategory";
import { useDispatch, useSelector } from "react-redux";
import { getAllCandlePercentage, RemoveDublicate } from "../Actions/allCategory";


const CandleStick7 = () => {
  const dispatch = useDispatch();
  const { AllCandlePercentage,loading } = useSelector(state => state.Data);
  const { formatDate,formatNextday, blurActive } = useSelector(state => state.SidebarDate)
  

  
 let CandleStickGreen1 = [];
  
  if (AllCandlePercentage.length > 0) {
    for (let i = 0; i < AllCandlePercentage.length; i++) {
      let a = AllCandlePercentage[i].date.slice(0,10);
      let x = AllCandlePercentage[i].candleStick.split(',');
      if (x[0] === 'green' && x[1] === 'red' && x[2] === 'red' && x[3] === 'red' && x[4] === 'red') {

        CandleStickGreen1 = [...CandleStickGreen1, {companyName:AllCandlePercentage[i].companyName,
          percentage:AllCandlePercentage[i].percentage,
          symbol:AllCandlePercentage[i].symbol,
          price:AllCandlePercentage[i].price,
          link:AllCandlePercentage[i].link,
          candleStick:AllCandlePercentage[i].candleStick,
          date:a}];
      }
    }
  }

  CandleStickGreen1 = RemoveDublicate(CandleStickGreen1);

  useEffect(() => {
  dispatch(getAllCandlePercentage(formatDate,formatNextday))
  },[dispatch,formatDate,formatNextday])


  
  
    
  if(loading){
    return (
      <div className={blurActive ? "main-body blur" : "main-body"}> 
      <h3 className='h3'>Candle Stick Grren 1</h3>
      <div className="Nodata">
      <h5>.....Loading</h5>
        </div>
      </div>
      )
  }
  else if(CandleStickGreen1.length > 0){
  return (
    <div className={blurActive ? "main-body blur" : "main-body"}> 
   <h3 className='h3'>Candle Stick Grren 1</h3>
  < Table jsapi={CandleStickGreen1} />
  </div>
  )
  }else{
  return (
    <div className={blurActive ? "main-body blur" : "main-body"}> 
  <h3 className='h3'>Candle Stick Grren 1</h3>
  <div className="Nodata">
   <h2 >😮OOPS!  </h2>
   <h3>No Data available</h3>
    </div>
  </div>
  )
  }

}

export default memo(CandleStick7)