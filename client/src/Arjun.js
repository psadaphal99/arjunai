import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './Arjun.css';
import { useDispatch, useSelector } from 'react-redux';
import { LoadUser } from './Actions/User';

// components
import Navbar from './Component/Navbar/Navbar';
import Sidebar from './Component/Sidebar/Sidebar';
import WatchList from './Component/WatchList/WatchList'
import Notes from './Component/Notes/Notes';
import Login from './Component/Login/Login';
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'
// import ArjunI_video from './Component/ArjunI_Video/ArjunI_Video';

//pages
import NotFound from './Pages/NotFound';
import TopLosersPage from './Pages/TopLosers';
import RecoveryFromIntradayLowPage from './Pages/RecoveryFromIntradayLow';
import MostActiveByVolumePage from './Pages/MostActiveByVolume'
import NearFiftyTwoWeeksLowPage from './Pages/NearFiftyTwoWeeksLow'
import HourlyGainersPage from './Pages/HourlyGainers'
import NiftySmallCapHundredPage from './Pages/NiftySmallCapHundred'
import NiftyFiveHundredPage from './Pages/NiftyFiveHundred'
import PercentageSixtyPage from './Pages/PercentSixty'
import PercentageEightyPage from './Pages/PercentageEighty'
import NiftyTotalMarketPage from './Pages/NiftyTotalMarket'
import CandleStick4Page from './Pages/CandleStick4'
import CandleStick5Page from './Pages/CandleStick5'
import CandleStickGreen1Page from './Pages/CandleStickGreen1'
import DeliveryPercentage from './Pages/DeliveryPercentage';
import { getActiveDates } from './Actions/allCategory';


const Arjun = () => {
  const { isAuthenticated, userloading } = useSelector(state => state.user);
  // const { formatDate,formatNextday } = useSelector(state => state.SidebarDate)
  const dispatch = useDispatch();

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      dispatch(LoadUser());
      dispatch(getActiveDates());
    }
  }, [dispatch])



  if (userloading) {
    return (
      < Router>
        <div className="loading">
          <h3>Loading .....</h3>
        </div>

      </Router>
    )
  }
  else {
    return (
      <Router>
      
        {isAuthenticated && < Navbar />}
        {isAuthenticated && < Sidebar />}

        <Routes>
          <Route exact path='/login' element={< Login />} />
          <Route element={<ProtectedRoute />} >

            <Route exact path="/" element={<TopLosersPage />} />
            <Route exact path="/RecoveryFromIntradayLow" element={< RecoveryFromIntradayLowPage />} />
            <Route exact path="/MostActiveByVolume" element={< MostActiveByVolumePage />} />
            <Route exact path="/NearFiftyTwoWeeksLow" element={< NearFiftyTwoWeeksLowPage />} />
            <Route exact path="/HourlyGainers" element={< HourlyGainersPage />} />
            <Route exact path="/NiftySmallCapHundred" element={< NiftySmallCapHundredPage />} />
            <Route exact path="/NiftyFiveHundred" element={< NiftyFiveHundredPage />} />
            <Route exact path="/Percent60_80" element={< PercentageSixtyPage />} />
            <Route exact path="/Percentage80_100" element={< PercentageEightyPage />} />
            <Route exact path="/NiftyTotalMarket" element={< NiftyTotalMarketPage />} />
            <Route exact path="/CandleStick4" element={< CandleStick4Page />} />
            <Route exact path="/CandleStick5" element={< CandleStick5Page />} />
            <Route exact path="/CandleStickGreen1" element={< CandleStickGreen1Page />} />
            <Route exact path="/watchlist" element={< WatchList />} />
            <Route exact path="/notes" element={< Notes />} />
            <Route exact path="/percent" element={< DeliveryPercentage />} />

            <Route path='*' element={<NotFound />} />


          </Route>
        </Routes>

      </Router>
    )
  }


}




export default Arjun;