import React, { useEffect } from 'react'
import Table from '../Component/Table/Table';
import { memo } from "react";
import { getHourlyGainers } from '../Actions/allCategory';
import { useDispatch, useSelector } from 'react-redux';
import "./AllPages.css"


const HourlyGainers = () => {
  const dispatch = useDispatch();
  const { HourlyGainers ,loading } = useSelector(state => state.Data)
  const { formatDate,formatNextday, blurActive } = useSelector(state => state.SidebarDate)


useEffect(() => {
 dispatch(getHourlyGainers(formatDate,formatNextday))
},[dispatch,formatDate,formatNextday])
  
if(loading){
  return (
    <div className={blurActive ? "main-body blur" : "main-body"}> 
    <h3 className='h3'>Hourly Gainers</h3>
    <div className="Nodata">
    <h5>.....Loading</h5>
        </div>
    </div>
    )
}
else if(HourlyGainers.length > 0){
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
 <h3 className='h3'>Hourly Gainers</h3>
< Table jsapi={HourlyGainers} />
</div>
)
}else{
return (
 <div className={blurActive ? "main-body blur" : "main-body"}>  
<h3 className='h3'>Hourly Gainers</h3>
<div className="Nodata">
   <h2 >😮OOPS!  </h2>
   <h3>No Data available</h3>
    </div>
</div>
)
}
}

export default memo(HourlyGainers)