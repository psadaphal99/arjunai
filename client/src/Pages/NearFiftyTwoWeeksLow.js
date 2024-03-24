import React, { useEffect } from 'react'
import Table from '../Component/Table/Table';
import { memo } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { getNear52weeksLow } from '../Actions/allCategory';
import "./AllPages.css"


const NearFiftyTwoWeeksLow = () => {
  const dispatch = useDispatch();
  const { Near52WeeksLow ,loading } = useSelector(state => state.Data)
  const { formatDate,formatNextday,blurActive} = useSelector(state => state.SidebarDate)

useEffect(() => {
 dispatch(getNear52weeksLow(formatDate,formatNextday))
},[dispatch,formatDate,formatNextday])


  
if(loading){
  return (
    <div className={blurActive ? "main-body blur" : "main-body"}> 
    <h3 className='h3'>Near Fifty Two Weeks Low</h3>
    <div className="Nodata">
    <h5>.....Loading</h5>
       </div>
   </div>
   )
}
else if(Near52WeeksLow.length > 0){
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
 <h3 className='h3'>Near Fifty Two Weeks Low</h3>
< Table jsapi={Near52WeeksLow}/>
</div>
)
}else{
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
 <h3 className='h3'>Near Fifty Two Weeks Low</h3>
 <div className="Nodata">
   <h2 >😮OOPS!  </h2>
   <h3>No Data available</h3>
    </div>
</div>
)
}
}

export default memo(NearFiftyTwoWeeksLow);
