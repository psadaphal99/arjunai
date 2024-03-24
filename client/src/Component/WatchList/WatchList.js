import axios from "axios";
import { memo } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { LoadUserNoLoad } from "../../Actions/User";
import "./WatchList.css"

const WatchList = () => {
   const dispatch = useDispatch();
   const alert = useAlert();
   const { loading } = useSelector(state => state.Data);
   const { blurActive } = useSelector(state => state.SidebarDate)
   const {watchlist} = useSelector(state => state.user.user)
   const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});

   
    const deleteWatch = async(id) => {
         
       try {
        const {data} = await axiosInstance.delete(`/deleteWatchlist/${id}`,{
          headers:{
            'x-access-token': localStorage.getItem('token')
        }
        })
          
        if(data === "Successfully removed from Watchist"){
          dispatch(LoadUserNoLoad());
             alert.success(data)
              }
       } catch (error) {
         alert.error(error.response.data.message)
       }
            }
        
         
    if(loading){
      return(
        <div className={blurActive ? "main-body blur" : "main-body"}> 
      <h3 className='h3'> WatchList</h3>
      <div className="Nodata">
      <h5>.....Loading</h5>
      </div>
      </div>
      )
    }
    else{

    return (
      <div className={blurActive ? "main-body blur" : "main-body"}> 
        <div className="main-div-table">
    
    <h3 className='h3'> WatchList</h3>
    <table className="table">
          <thead>
          <tr className='table-row'>
              <th className="table-head head-name">Company Name</th>
              <th className="table-head head-percentage">Percentage</th>
              <th className="table-head head-symbol">Symbol</th>
              <th className="table-head head-price">Price</th>
              <th className="table-head head-link">Sreener Link</th>
              <th className="table-head head-candlestick">CandleStick</th>
              <th className="table-head head-watchlist">Remove</th>
          </tr>
          </thead>
          <tbody>
         {
             watchlist.map((ele,index) => {
                const {companyName,percentage,symbol,price,link,candleStick,_id}=ele; 
           const allstick = candleStick.split(',');
                 return (
                  <tr key={_id} className='table-row'>
              <td className="table-data">{companyName}</td>
              <td className="table-data">{percentage}</td>
              <td className="table-data">{symbol}</td>
              <td className="table-data">{price}</td>
              <td className="table-data"> <a className='moreinfo' href={link} target={"_blank"} rel="noreferrer">More info</a></td>
              <td className="table-data">{allstick.map((ele,index) => {
                if(ele==='red'){
                  return <span className='dot-red' key={index}></span>
                }else{
                  return <span className='dot-green'></span>
                }
              })}</td>
             <td className="table-head" onClick={() => deleteWatch(_id)}><span className="material-icons add-to-watchlist" 
                    >delete</span></td>
    
          </tr>
                 );
             })
         }
                 
    
          </tbody>
      </table>
    </div>
    </div>
    )
    }
  }

export default memo(WatchList);



