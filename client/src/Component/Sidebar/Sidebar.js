import './Sidebar.css';
import { Link } from 'react-router-dom';
import { memo} from "react";
import { useSelector } from 'react-redux';

const Sidebar = () => {
    const {sidebar,blurActive } = useSelector(state => state.SidebarDate);

    return (
        <>
            <div className={blurActive ? "sidebar open blur" : (sidebar ? "sidebar open" : "sidebar") } >
                <button className="sidebar-btn" ><Link className='link' to="/">Top Losers</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/RecoveryFromIntradayLow">Recovery From Intraday Low</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/MostActiveByVolume">Most Active By Volume</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/NearFiftyTwoWeeksLow">Near Fifty Two Weeks Low</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/HourlyGainers">Hourly Gainers</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/NiftySmallCapHundred">Nifty Small Cap Hundred</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/NiftyFiveHundred">Nifty Five Hundred</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/NiftyTotalMarket">Nifty Total Market</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/CandleStick4">Candle Stick Red 4</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/CandleStick5">Candle Stick Red 5</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/CandleStickGreen1">Candle Stick Green 1</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/Percent60_80"><span className='percentage'>%</span> 60-80</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/Percentage80_100"><span className='percentage'>%</span> 80-100</Link></button>
                <button className="sidebar-btn" ><Link className='link' to="/percent">Delivery Percentage</Link></button>
            </div>
        </>
    );
}

export default memo(Sidebar);