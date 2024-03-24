import './Navbar.css';
import { Link } from 'react-router-dom';
import React, { useState,useEffect } from "react";
import DatePicker from "react-datepicker";

import { memo } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import Profile from '../Profile/Profile';
import Search from '../Search/Search';
import axios from 'axios';




const Navbar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [SearchValue,setSearchValue] = useState("");
    const [filterData,setFilterData] = useState([]);
    const [searchActive,setSearchActive] = useState(false);
    const [ profileActive , setProfileactive] = useState(false);
    const dispatch = useDispatch();
    const { sidebar,ActiveDate } = useSelector(state => state.SidebarDate)
    const { name } = useSelector(state => state.user.user);
    const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});


    // to get active dates => so we can enable the dates that having the data
    let Active = [];
    for (let i = 0; i < ActiveDate.length; i++) {
     Active = [...Active,new Date(ActiveDate[i])]  
    }

    const getFilterData = async (search) => {
      const {data} = await axiosInstance.get(`/search/${search}`,{
       headers:{
         'x-access-token': localStorage.getItem('token')
     }
      });
        data.sort(function(a,b){
          if(a.date.replace("-","") < b.date.replace("-","")){
            return -1;
          }
          return null;
        })    
      setFilterData(data);
    }
    
   // toggle value of sidebar 
     const toggleSidebar = () => {
       dispatch({
         type:"sidebarOpen",
         payload:!sidebar
       })
     }


     // to set today date and set tomarrow date
    let date = JSON.stringify(selectedDate).slice(1,11).split('-');
    const formatedDate = `${date[0]}-${date[1]}-${date[2]}T00:00:00.000Z`;
    let nextFormatedDay = new Date(new Date(formatedDate).getTime() + 24 * 60 * 60 * 1000).toJSON();
    const d = `${date[2]}/${date[1]}/${date[0]}`;
    const startDate = new Date(2022, 0, 1);
   
    // useEffect(() => {
    //   if(SearchValue.length > 3){
    //     setSearchActive(true);
    //   }
  
    //   if(searchActive){
    //     getFilterData();
    //   //  const getFilterData = async () => {
    //   //    const {data} = await axiosInstance.get(`/search/${SearchValue}`,{
    //   //     headers:{
    //   //       'x-access-token': localStorage.getItem('token')
    //   //   }
    //   //    });
    //   //      data.sort(function(a,b){
    //   //        if(a.date.replace("-","") < b.date.replace("-","")){
    //   //          return -1;
    //   //        }
    //   //        return null;
    //   //      })    
    //   //    setFilterData(data);
    //   //  }
    //    if(SearchValue.length > 3){
    //     dispatch({
    //       type:"BlurActive",
    //       payload: true
    //     })
    //      setSearchActive(true);
    //      getFilterData();
    //    }
    //    if(SearchValue.length < 4){
    //     dispatch({
    //       type:"BlurActive",
    //       payload: false
    //     })
    //      setSearchActive(false);
    //    }
    //   }
    // }, [dispatch,SearchValue]) 


     useEffect(() => {
      dispatch({
        type:"setdate",
        payload: d
      })
      dispatch({
        type:"formatedDate",
        payload:formatedDate
      })
      dispatch({
        type:"nextDay",
        payload:nextFormatedDay
      })
     }, [dispatch,d,formatedDate,nextFormatedDay])


     useEffect(() => {
      if(profileActive === true){
        dispatch({
          type:"BlurActive",
          payload: true
         })
      }
      if(!profileActive){
        dispatch({
          type:"BlurActive",
          payload: false
         })
      }
     }, [dispatch,profileActive])


     
     

    const handleSearch = (event) => {
      const {value} = event.target
      // console.log(value,event,event.target);
      setSearchValue(value);
        if(value.length > 3){
        setSearchActive(true);
        dispatch({
          type:"BlurActive",
          payload: true
        })
        getFilterData(value)
      }else{
        dispatch({
                type:"BlurActive",
                payload: false
              })
               setSearchActive(false);
      }
  
    //   if(searchActive){
    //     getFilterData();
    //   //  const getFilterData = async () => {
    //   //    const {data} = await axiosInstance.get(`/search/${SearchValue}`,{
    //   //     headers:{
    //   //       'x-access-token': localStorage.getItem('token')
    //   //   }
    //   //    });
    //   //      data.sort(function(a,b){
    //   //        if(a.date.replace("-","") < b.date.replace("-","")){
    //   //          return -1;
    //   //        }
    //   //        return null;
    //   //      })    
    //   //    setFilterData(data);
    //   //  }
    //    if(SearchValue.length > 3){
    //     dispatch({
    //       type:"BlurActive",
    //       payload: true
    //     })
    //      setSearchActive(true);
    //      getFilterData();
    //    }
    //    if(SearchValue.length < 4){
    //     dispatch({
    //       type:"BlurActive",
    //       payload: false
    //     })
    //      setSearchActive(false);
    //    }
    //   }
    }

    const debounce = (fn,delay) => {
      let timer;
    return function(...args){
      let context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
         fn.apply(context,args);
      }, delay);

    }
}

const optimizeSearch = debounce(handleSearch,600); 

     
    return (
        <>
            <div className="nav">

                {/* Menu icon and logo */}
                <div className = "div_nav">
                    <span className="material-icons  menu-icon"
                        // onClick={() => toggleSidebar()}
                        onClick={toggleSidebar}
                    >menu</span>
                    <Link to="/">
                        <img src="./images/newlogo.png" alt="logo" className="logo" />
                    </Link>
                </div>

            {/* SearchBar */}
                <div className="div_nav div_search">    
                    <input type="text"  style={{padding:"5px",outline:'none',border:'none', backgroundColor:"transparent",fontSize:'16px'}}
                    placeholder="Enter a Company Name"
                    // value={SearchValue}
                    onChange={ (event) => optimizeSearch(event)}
                    />
                   {  SearchValue.length === 0 ? (<span className="material-icons" style={{fontSize:'24px'}} >search</span>):
                     (
                      <span className="material-icons close-icon" onClick={() => setSearchValue("")}>close</span>
                     )}
                </div>
                

                {/* Calender and watchList */}
                <div className="div_nav div_watchlist">
                    <label>
                  <table className='nav-table'>
                      <thead>
                          <tr>
                       
                      <th><span className="material-icons calender-icon ">calendar_month</span>
                         <span className="hover-calender">Calender</span>
                      </th>
                      <th>
                      <DatePicker
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date)}
                        dateFormat='dd/MM/yyyy'
                        wrapperClassName="calender" 
                        filterDate ={date => date.getDay() !== 6 && date.getDay() !== 0}
                        includeDates={Active}
                        minDate={startDate}
                        maxDate={new Date()}
                        closeOnScroll={true}
                        shouldCloseOnSelect={false}
                        />
                      </th>
                          </tr>
                      </thead>
                      </table>  
                      </label>
                    
                      <table className='nav-table'>
                      <thead>
                          <tr>
                      <th>
                      <Link to="/watchlist" className='link watchListlink'> <span className="material-icons watchlist-icon">view_list</span> </Link>
                      <span className="hover-watchlist">Add_to_WatchList</span>
                      </th>
                      <th>
                      <Link to="/watchlist" className='link'>  <span className="watchname" >WatchList</span> </Link>
                      </th>
                      <th>
                        <Link to='/notes' className='link iconaddnote'>
                      <span className="material-icons">auto_stories</span>
                        </Link>
                        <span className="hover-iconaddnote">Notes</span>

                      </th>

                      <th>                   
                    
                      <div className="profile" onClick={() => setProfileactive(!profileActive)}>{name[0].toUpperCase()} </div> 
                          <span className='hover-profile'>{name}</span>    
                      </th>
                        </tr>
                      </thead>
                      </table>  
                </div>
            </div>
           { profileActive && < Profile setProfileactive = {setProfileactive} />}
           {searchActive  && SearchValue.length > 3 && filterData.length > 0 && <Search jsapi ={filterData} length = {filterData.length}/>  }
        </>
    );
}

export default memo(Navbar);

