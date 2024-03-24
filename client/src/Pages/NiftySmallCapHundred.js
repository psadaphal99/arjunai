import React, { useEffect } from 'react'
import Table from '../Component/Table/Table';
import { memo } from "react";
import { getNiftySmallCapHundred } from '../Actions/allCategory';
import { useDispatch, useSelector } from 'react-redux';
import "./AllPages.css"


const NiftySmallCapHundred = () => {
  const dispatch = useDispatch();
  const { NiftySmallCapHundred,loading } = useSelector(state => state.Data);
  const { formatDate,formatNextday ,blurActive } = useSelector(state => state.SidebarDate)

useEffect(() => {
 dispatch(getNiftySmallCapHundred(formatDate,formatNextday));
},[dispatch,formatDate,formatNextday])


    
if(loading){
  return (
    <div className={blurActive ? "main-body blur" : "main-body"}> 
    <h3 className='h3'>Nifty Small Cap Hundred</h3>
    <div className="Nodata">
    <h5>.....Loading</h5>
        </div>
    </div>
    )
}
else if(NiftySmallCapHundred.length > 0){
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
<h3 className='h3'>Nifty Small Cap Hundred</h3>
< Table jsapi={NiftySmallCapHundred} />
</div>
)
}else{
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
<h3 className='h3'>Nifty Small Cap Hundred</h3>
<div className="Nodata">
   <h2 >😮OOPS!  </h2>
   <h3>No Data available</h3>
    </div>
</div>
)
}
}

export default memo(NiftySmallCapHundred)
