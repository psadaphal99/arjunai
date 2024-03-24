import React, { useEffect } from 'react'
import Table from '../Component/Table/Table';
import { memo } from "react";
import {getNiftyFiveHundred} from '../Actions/allCategory'
import {useDispatch,useSelector} from 'react-redux'
import "./AllPages.css"



const NiftyFiveHundred = () => {
  const dispatch = useDispatch();
  const { NiftyFiveHundred,loading } = useSelector(state => state.Data);
  const { formatDate,formatNextday ,blurActive } = useSelector(state => state.SidebarDate)

useEffect(() => {
 dispatch(getNiftyFiveHundred(formatDate,formatNextday))
},[dispatch,formatDate,formatNextday])


 if(loading){
  return (
    <div className={blurActive ? "main-body blur" : "main-body"}> 
    <h3 className='h3'>Nifty Five Hundred</h3>
    <div className="Nodata">
    <h5>.....Loading</h5>
        </div>
    </div>
    )
 }   
else if(NiftyFiveHundred.length > 0){
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
 <h3 className='h3'>Nifty Five Hundred</h3>
< Table jsapi={NiftyFiveHundred} />
</div>
)
}else{
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
<h3 className='h3'>Nifty Five Hundred</h3>
<div className="Nodata">
   <h2 >😮OOPS!  </h2>
   <h3>No Data available</h3>
    </div>
</div>
)
}
}


export default memo(NiftyFiveHundred)