import React, { useEffect} from 'react'
import Table from '../Component/Table/Table';
import { memo } from "react";
import {useDispatch,useSelector} from 'react-redux'
import {getMostActiveByVolumes} from '../Actions/allCategory'
import "./AllPages.css"


const MostActiveByVolume = () => {
 const dispatch = useDispatch();
 const { MostActiveByVolume ,loading } = useSelector(state => state.Data)
 const { formatDate,formatNextday, blurActive } = useSelector(state => state.SidebarDate)

useEffect(() => {
 dispatch(getMostActiveByVolumes(formatDate,formatNextday));
},[dispatch,formatDate,formatNextday])


if(loading){
  return (
    <div className={blurActive ? "main-body blur" : "main-body"}> 
    <h3 className='h3'> Most Active By Volume</h3>
    <div className="Nodata">
    <h5>.....Loading</h5>
       </div>
   </div>
   )
}
else if(MostActiveByVolume.length > 0){
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
 <h3 className='h3'> Most Active By Volume</h3>
< Table jsapi={MostActiveByVolume} />
</div>
)
}else{
return (
  <div className={blurActive ? "main-body blur" : "main-body"}> 
 <h3 className='h3'> Most Active By Volume</h3>
 <div className="Nodata">
   <h2 >😮OOPS!  </h2>
   <h3>No Data available</h3>
    </div>
</div>
)
}
}

export default memo(MostActiveByVolume);
