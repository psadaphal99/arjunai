import React, { useEffect } from 'react'
import Table from '../Component/Table/Table';
import { memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getTopLosers } from '../Actions/allCategory';
import "./AllPages.css"




const TopLosers = () => {
 const dispatch = useDispatch();
 const { TopLosers,loading } = useSelector(state => state.Data);
 const { formatDate,formatNextday, blurActive } = useSelector(state => state.SidebarDate);
 

   useEffect(() => {
    dispatch(getTopLosers(formatDate,formatNextday))
    },[dispatch,formatDate,formatNextday])
    
   
       
   if(loading){
    return(
      <div className={blurActive ? "main-body blur" : "main-body"}>  
    <h3 className='h3'> Top Losers</h3>  
    <div className="Nodata">
    <h5>.....Loading</h5>
    </div>
    </div>
    )
   }

   else if(TopLosers.length > 0){
   return (
    <div className={blurActive ? "main-body blur" : "main-body"}>    
    <h3 className='h3'> Top Losers</h3>
    < Table jsapi={TopLosers} />
    </div>
  )
 }else{
  return (
    <div className={blurActive ? "main-body blur" : "main-body"}>    
    <h3 className='h3'> Top Losers</h3>  
    <div className="Nodata">
   <h2 >😮OOPS!  </h2>
   <h3>No Data available</h3>
    </div>
  </div>
  )
 }
 
}

export default memo(TopLosers)



  