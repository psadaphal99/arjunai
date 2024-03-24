import React, { useEffect, useState } from 'react'
import { memo } from "react";
import { useAlert } from "react-alert";
import "./AllPages.css";
import { useDispatch,useSelector } from 'react-redux';
import { getDeliveryPercent,deleteFromPercentWatchlist, addtoPercentWatchlist,getDeliveryPercentWatchlist, getSearchDeliveryPercent } from '../Actions/allCategory';
import Pagination from '@mui/material/Pagination';

// const Percent = [];
// const loading = false;


  

const DeliveryPercentage = () => {
 const dispatch = useDispatch();
 const {blurActive } = useSelector(state => state.SidebarDate);
const {deliveryPercent,loading,deliveryPercentWatch,totalRecord} = useSelector(state => state.Data);
const [SearchValue,setSearchValue]  = useState('');
const [filterData,setFilterData] = useState([]);
const [watchFilterData,setWatchFilterData] = useState([]);
const [page,setPage] = useState(1);
const [range,setRange] = useState('all');
const alert = useAlert();


useEffect(() => {
  dispatch(getDeliveryPercentWatchlist());
},[dispatch])

   useEffect(() => {
        dispatch(getDeliveryPercent(page,range));
    },[dispatch,page,range])

    useEffect(()=> {
      if(deliveryPercent){
        setFilterData(deliveryPercent);
      }
      if(deliveryPercentWatch){
        setWatchFilterData(deliveryPercentWatch);
      }
    },[deliveryPercent,deliveryPercentWatch,dispatch])
    useEffect(()=> {
      if(SearchValue === ''){
        dispatch(getDeliveryPercent(page,range));
      }
    },[dispatch,SearchValue])

  const handleSelect = (e) => {
    
      switch (e.target.value) {
        case 'all':
          // setFilterData(deliveryPercent);
          setRange('all')
          setPage(1);
          break;
        case 'below30':
        //   let data = deliveryPercent.filter(ele => ele.percent <= 30)
        //   data.sort((a,b) => {
        //     return a.percent - b.percent;
        //   })
        //   setFilterData(data);
         setRange("below30");
         setPage(1);
          break;
        case 'below50':
          // let data1 = deliveryPercent.filter(ele => ele.percent > 30 && ele.percent <= 50)
          // data1.sort((a,b) => {
          //   return a.percent - b.percent;
          // })
          // setFilterData(data1);s
          setRange("below50");
          setPage(1);
          break;
        case 'below70':
          // let data2 = deliveryPercent.filter(ele => ele.percent > 50 && ele.percent <= 70)
          // setFilterData(data2);
          // data2.sort((a,b) => {
          //   return a.percent - b.percent;
          // })
          setRange("below70");
          setPage(1);
          break;
        case 'below100':
          // let data3 = deliveryPercent.filter(ele => ele.percent > 70 && ele.percent <= 100)
          // data3.sort((a,b) => {
          //   return a.percent - b.percent;
          // })
          // setFilterData(data3);
          setRange("below100");
          setPage(1);
          break;
      
        default:
          break;
      }
  }

 const handleDailyAnaSelect = (e) => {
  switch (e.target.value) {
    case 'all':
      setWatchFilterData(deliveryPercentWatch);
      break;
    case 'below30':
      let data = deliveryPercentWatch.filter(ele => ele.percent <= 30)
      data.sort((a,b) => {
        return a.percent - b.percent;
      })
      setWatchFilterData(data);
      break;
    case 'below50':
      let data1 = deliveryPercentWatch.filter(ele => ele.percent > 30 && ele.percent <= 50)
      data1.sort((a,b) => {
        return a.percent - b.percent;
      })
      setWatchFilterData(data1);
      break;

    case 'below70':
      let data2 = deliveryPercentWatch.filter(ele => ele.percent > 50 && ele.percent <= 70)
      data2.sort((a,b) => {
        return a.percent - b.percent;
      })
      
      setWatchFilterData(data2);
      break;

    case 'below100':
      let data3 = deliveryPercentWatch.filter(ele => ele.percent > 70 && ele.percent <= 100)
      data3.sort((a,b) => {
        return a.percent - b.percent;
      })
      setWatchFilterData(data3);
      break;
  
    default:
      break;
  }
 }

  const HandleSearch = async(e) => {
    setSearchValue(e.target.value);
      if(e.target.value.length <= 2 && e.target.value.length > 0){
        // setFilterData(deliveryPercent)
        // if(e.target.value.length === 0){
        //   dispatch(getDeliveryPercent(page,range));
        // }
        dispatch({
          type:'SetTotalRecord',
          payload:0,
        })
        setFilterData([])
      }else{
      if(e.target.value.length > 2 ){
        const data = await dispatch(getSearchDeliveryPercent(e.target.value));
        setFilterData(data);
      }
      }
  }

  const handleAddWatchlist = async (ele) => {
   const res = await dispatch(addtoPercentWatchlist(ele));

     
    if(res.status === 'success' && res){
      dispatch(getDeliveryPercent())
      dispatch(getDeliveryPercentWatchlist());
    }
  }

  const handleDeleteWatchlist = async (sym) => {
    const res = await dispatch(deleteFromPercentWatchlist(sym));
  
     if(res.status === 'success' && res){
      dispatch(getDeliveryPercent())
      dispatch(getDeliveryPercentWatchlist());
    }
  }

 const handlePagination = (event,value) => {
  setPage(value);
 }

   if(loading){
    return(
      <div className={blurActive ? "main-body blur" : "main-body"}>  
    <h3 className='h3'>Delivery Percentage</h3>  
    <div className="Nodata">
    <h5>.....Loading</h5>
    </div>
    </div>
    )
   }

   else if(deliveryPercent.length > 0){
   return (
    <div className={blurActive ? "main-body blur" : "main-body"}>    
    <div className='topbar '>
   <div> <h3 className='h3'> Delivery Percentage</h3></div>
    <div className="percent-search">    
                    <input type="text"  style={{padding:"5px",outline:'none',border:'none', backgroundColor:"transparent",fontSize:'18px'}}
                    placeholder="Enter a Company Name"
                    value={SearchValue}
                    onChange={(e) => HandleSearch(e)}
                    />
                   {  SearchValue.length === 0 ? (<span className="material-icons" style={{fontSize:'24px'}} >search</span>):
                     (
                      <span className="material-icons close-icon" onClick={() => setSearchValue("")}>close</span>
                     ) }
                </div>
    <select onChange={handleSelect} >
  <option value="all">Select all</option>
  <option value="below30">Below 30</option>
  <option value="below50">Below 50</option>
  <option value="below70">Below 70</option>
  <option value="below100">Below 100</option>
</select>

    </div>
   <div className='per_watch_container'>
   <div>
    <table className='percent-table'>
      <thead>
      <tr className='table-row'>

          <th className="table-head">Company symbol</th>
          <th className="table-head" >Percentage</th>
          <th className="table-head" >pChange</th>
          <th className="table-head"  >Add</th>
          {/* <th className="table-head head-symbol" style={{width:"10%"}}>Symbol</th>
          <th className="table-head head-price" style={{width:"10%"}}>Price</th>
          <th className="table-head head-link" style={{width:"16%"}}>Sreener Link</th>
          <th className="table-head head-candlestick" style={{width:"20%"}}>CandleStick</th>
          <th className="table-head head-watchlist" style={{width:"7%"}}>Add to Watclist</th>
          <th className="table-head head-note" style={{width:"7%"}}>Add Note</th>        */}
      </tr>
      </thead>
      <tbody>
     {
         filterData.map((ele,index) => {
            const {symbol,percent,pChange}=ele; 
             return (
              <tr  key={index} className ='table-row'>
          <td className="table-data">{symbol}</td>
          <td className="table-data">{percent}</td>
          <td className={pChange > 0 ? "table-data greenper":"table-data redper"}>{pChange && pChange.toFixed(2)}</td>
          <td className="table-data" ><span className="material-icons" style={{cursor:'pointer',color:'grey'}} onClick = {() => handleAddWatchlist(ele)}>add_circle</span></td>

          {/* <td className="table-data table-data-symbol">{symbol}</td>
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
           
           </td> */}
      </tr>
             );
         })
     }
             

      </tbody>
  </table>
  <Pagination page={page} count={Math.ceil(totalRecord/10)} onChange = {handlePagination} />
  </div>

  {deliveryPercentWatch.length > 0 && <div className='per_watchlist'>
    <div className='daily_ana_container'>
  <div>
  <select onChange={handleDailyAnaSelect} className='daily_ana_select'>
  <option value="all">Select all</option>
  <option value="below30">Below 30</option>
  <option value="below50">Below 50</option>
  <option value="below70">Below 70</option>
  <option value="below100">Below 100</option>
 </select>
    <h3>Daily Analysis</h3>
  </div>
    <table className='percent-table'>
      <thead>
      <tr className='table-row'>

          <th className="table-head">Company symbol</th>
          <th className="table-head" >Percentage</th>
          <th className="table-head" >pChange</th>
          <th className="table-head" >Remove</th>
         
      </tr>
      </thead>
      <tbody>
     {
         watchFilterData.map((ele,index) => {
            const {symbol,percent,pChange}=ele; 
             return (
              <tr  key={index} className ='table-row'>
          <td className="table-data">{symbol}</td>
          <td className="table-data">{percent}</td>
          <td className={pChange > 0 ? "table-data greenper":"table-data redper"}>{pChange && pChange.toFixed(2)}</td>
          <td className="table-data" style={{cursor:'pointer',color:'grey'}}><span className="material-icons" onClick = {() => handleDeleteWatchlist(symbol)}>delete</span></td>
      </tr>
             );
         })
     }
             

      </tbody>
  </table>
  </div>
  </div>}
  </div>

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

export default memo(DeliveryPercentage)
  

