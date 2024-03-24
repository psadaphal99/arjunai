import React, { useEffect } from 'react'
import { memo } from "react";
import Table from '../Component/Table/Table';
import "./AllPages.css"
// import { getPercentage80_100 } from '../Actions/allCategory';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCandlePercentage, RemoveDublicate } from "../Actions/allCategory";


const Percent80_100 = () => {
  const dispatch = useDispatch();
  const { AllCandlePercentage,loading } = useSelector(state => state.Data);
  const { formatDate,formatNextday,blurActive } = useSelector(state => state.SidebarDate)
  

  
 let Percentage80_100 = [];
  
  if (AllCandlePercentage.length > 0) {
    for (let i = 0; i < AllCandlePercentage.length; i++) {
      let a = AllCandlePercentage[i].date.slice(0,10);
    let  data = parseFloat(AllCandlePercentage[i].percentage)
    if( data > 80 && data <= 100 ){
      Percentage80_100 = [...Percentage80_100,{companyName:AllCandlePercentage[i].companyName,
            percentage:AllCandlePercentage[i].percentage,
            symbol:AllCandlePercentage[i].symbol,
            price:AllCandlePercentage[i].price,
            link:AllCandlePercentage[i].link,
            candleStick:AllCandlePercentage[i].candleStick,
            date:a}]
    }
    }
  }

  Percentage80_100 = RemoveDublicate(Percentage80_100);

  useEffect(() => {
  dispatch(getAllCandlePercentage(formatDate,formatNextday))
  },[dispatch,formatDate,formatNextday])

     
    
 
     if(loading){
      return(
        <div className={blurActive ? "main-body blur" : "main-body"}> 
      <h3 className='h3'>Percentage 80-100</h3>  
      <div className="Nodata">
      <h5>.....Loading</h5>
      </div>
        </div>
      )
     }
  
     else if(Percentage80_100.length > 0){
     return (
      <div className={blurActive ? "main-body blur" : "main-body"}> 
      <h3 className='h3'> Percentage 80-100</h3>
     < Table jsapi={Percentage80_100}  />
    </div>
    )
   }else{
    return (
      <div className={blurActive ? "main-body blur" : "main-body"}> 
      <h3 className='h3'>Percentage 80-100</h3>  
      <div className="Nodata">
     <h2 >😮OOPS!  </h2>
     <h3>No Data available</h3>
      </div>
    </div>
    )
   }
}

export default memo(Percent80_100)
