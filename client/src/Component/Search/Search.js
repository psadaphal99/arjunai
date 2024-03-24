import React from 'react'
import './Search.css'
import LineCharts from '../LineCharts/LineCharts';

const Search = ({jsapi,length}) => {
    if(length === 0){
        return(
            <div className="search">
                <div className="no-data">
                No Data Available
                </div>
            </div>
        )
    }

    else{
        
  return (
    <div className='search'>
      <table className="table">
      <thead>
      <tr className='table-row'>
          <th className="table-head head-name">Company Name</th>
          <th className="table-head head-percentage">Percentage</th>
          <th className="table-head head-symbol">Symbol</th>
          <th className="table-head head-price">Price</th>
          <th className="table-head head-link">Sreener Link</th>
          <th className="table-head head-candlestick">CandleStick</th>
          <th className="table-head head-date">Date</th> 
      </tr>
      </thead>
      
      <tbody>
     {
         jsapi.map((ele,index) => {
            const {companyName,percentage,symbol,price,link,candleStick,_id,date}=ele; 
            const allstick = candleStick.split(',');
             return (
              <tr  key={_id} className ='table-row'>
          <td className="table-data">{companyName}</td>
          <td className="table-data">{percentage}</td>
          <td className="table-data table-data-symbol">{symbol}</td>
          <td className="table-data">{price}</td>
          <td className="table-data"> <a className='moreinfo' href={link} target={"_blank"} rel="noreferrer">More info</a></td>
          <td className="table-data">{allstick.map((ele,index) => {
            if(ele==='red'){
              return <span className='dot-red' key={index}></span>
            }else{
              return <span className='dot-green'></span>
            }
          })}</td>
            <td className="table-data">{date.slice(0,10)}</td>   
      </tr>
             );
         })
     }
      </tbody>
  </table>
    {jsapi.length > 1 &&  < LineCharts data= {jsapi} />  }

    </div>
  )
    }

}

export default Search