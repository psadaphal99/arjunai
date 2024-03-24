import React, { useEffect, useState } from 'react'
import './BarChart.css'
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip,Bar } from 'recharts'
import {useDispatch} from 'react-redux';
import { memo } from "react";



function CustomTooltip({ active, payload, label,showQuantity,showClosePrice,showLow }) {
  if (active) {
    return (<>
      <div className="custom-tooltip">
        <p className="label">{label}</p>
        <p className="intro">{`percentage : ${JSON.stringify(payload[0].payload.percentage)}`}</p>
        <p className="intro">{`high : ${JSON.stringify(payload[0].payload.high)}`}</p>
        {showLow && <p className="intro">{`low : ${JSON.stringify(payload[0].payload.low)}`}</p>}
        {showClosePrice && <p className="intro">{`closePrice : ${JSON.stringify(payload[0].payload.close_price)}`}</p>}
       { showQuantity && <p className="intro">{`quantity : ${JSON.stringify(payload[0].payload.quantity)}`}</p>}
      </div>
    </>
    );
  }
  return null;
}

 const BarChartComp = ({ data,DATA }) => {
 const [showLow,setShowLow] = useState(true);
 const [showClosePrice,setShowClosePrice] = useState(false);
 const [showQuantity,setShowQuantity] = useState(false);
 const dispatch = useDispatch(); 

 // It contains value high/low within data
let datalow = data[0].low;
let dataquantitylow = data[0].quantity; 
let datahigh = data[0].high;
let percenthigh = data[0].percentage;

// index value for high and low
let datalowindex = 0;
let percenthighIndex = 0;

// candle variable
let redcandle = 0;
let greenCandle =0;
let redcandlePercentage = [];
let greencandlePercentage = [];
let redsum = 0
let greensum = 0

// calculate datalow, dataquantitylow, datahigh, percenthigh
for (let i = 0; i < data.length; i++) {
  if(data[i].low < datalow){
    datalow = data[i].low;
    datalowindex = i;
  }
  if(data[i].quantity < dataquantitylow ){
    dataquantitylow = data[i].quantity;
  }
  if(data[i].high > datahigh){
    datahigh = data[i].high;
  }
  if(data[i].percentage > percenthigh){
    percenthigh = data[i].percentage
    percenthighIndex=i;
  }

  if(data[i].open_price < data[i].close_price){
    let a = (data[i].close_price-data[i].open_price)/(data[i].open_price/100);
    greensum = greensum + a;
    greencandlePercentage = [...greencandlePercentage,Number(a.toFixed(2))];
          greenCandle++;
  }else{
        let b = (data[i].open_price-data[i].close_price)/(data[i].open_price/100);
        redsum = redsum + b;
        redcandlePercentage = [...redcandlePercentage,Number(b.toFixed(2))];
         redcandle++
  }
}

// average of red and green  percentage => total sum / total no of candle
let redavg = redsum/redcandle;
let greenavg = greensum/greenCandle;

// variable for low price in data to high price in data
let highAfter = data[datalowindex].high;
let highAfterIndex = datalowindex;
let lowPriceDate = data[datalowindex].date;


// variable for the high percent low price to high price
let percenthighLowPrice = data[percenthighIndex].low;
let percenthighHighPrice = data[percenthighIndex].high;
let percenthighHighPriceIndex = percenthighIndex; 
let percentHighLowPriceDate = data[percenthighIndex].date;

//find high price => start from low price in the data => iterate over the data and find high price and its index
for(let i=datalowindex;i< data.length;i++){
    if(data[i].high >  highAfter){
      highAfter= data[i].high;
      highAfterIndex = i;
    }
}

// deliverable high percentage 
//find high price => start from low price of the high percent in the data => iterate over the data and find high price and its index
for(let i = percenthighIndex+1;i<data.length;i++){
  if(data[i].high > percenthighHighPrice){
    percenthighHighPrice = data[i].high;
    percenthighHighPriceIndex = i;
  
  }
}


// find percent gain on low price in data
let onePercent = datalow/100;
let percent = (highAfter - datalow)/onePercent;
let daysCount = highAfterIndex-datalowindex;
let highPriceDate = data[highAfterIndex].date;

// find percent gain of low price of high percent in the data
let OnepercentforPercentage  =  percenthighLowPrice/100;
let percentageGain = (percenthighHighPrice-percenthighLowPrice)/OnepercentforPercentage; 
let daysCountPercentage = percenthighHighPriceIndex - percenthighIndex;
let percenthighHighPriceDate = data[percenthighHighPriceIndex].date

useEffect(() => {
  
  dispatch({
    type:"PercentAnalysis",
    payload:{
      DeliveryPercentageCount:Number(percentageGain.toFixed(2)),
       DeliveryPercentageNoOfDays:daysCountPercentage,
       DeliveryPercentageLowDate:percentHighLowPriceDate,
       DeliveryPercentageHighDate:percenthighHighPriceDate,
       HighLowPercentage:Number(percent.toFixed(2)),
       HighLowPercentageNoOfDays:daysCount,
       HighLowPercentageLowDate:lowPriceDate,
       HighLowPercentageHighDate:highPriceDate,
       greenCandleCount:greenCandle,
       redcandleCount : redcandle,
       greenavg:Number(greenavg.toFixed(2)),
       redavg:Number(redavg.toFixed(2)),
       greensum:Number(greensum.toFixed(2)),
       redsum:Number(redsum.toFixed(2))
    }
  });
  
  
}, [dispatch,percentageGain,highPriceDate,lowPriceDate,percentHighLowPriceDate,percenthighHighPriceDate,percent,daysCountPercentage,redcandle,daysCount,greenCandle,greenavg,greensum,redavg,redsum])

const iconStyle = { color: 'white',fontWeight:'bolder',fontSize:'26px' }

  return (<>
    < ResponsiveContainer width={'95%'} aspect={2.5} className="barchart">
      <BarChart width={1150} height={250} data={data} margin={'auto'}>
        <CartesianGrid strokeDasharray="3 3" stroke='lightgrey' vertical='false' />
        <XAxis dataKey="date" tickCount={10} color='bolder' fontSize={10} style={{overflow:'scroll'}} tickSize ={20} />
        {/* < YAxis dataKey="low" type="number" domain={[10,'auto']} fontSize={12} fontWeight={1000} tickCount={10} /> */}
        <YAxis yAxisId="left-axis" type="number" domain={[dataMin => (Math.abs(datalow)-5), dataMax => (Math.abs(datahigh)+120)]} tickCount={12} style={{fontSize:'10px',fontWeight:'bolder'}} />
        <YAxis yAxisId="right-axis" orientation="right" type="number" domain={[dataMin => (Math.abs(dataquantitylow)-5), dataMax => (Math.abs(dataMax)+10000)]} tickCount={12} style={{fontSize:'10px',fontWeight:'bolder'}} />
        <Tooltip content={< CustomTooltip showQuantity={showQuantity} showClosePrice={showClosePrice} showLow={showLow}/>} />
        {/* <Legend align='left' /> */}
        <Bar dataKey="high" stackId="a" fill="#0cf2c4" yAxisId="left-axis" barSize={15}/>
        <Bar dataKey="percentage" stackId="a" fill="#f0ac2e" yAxisId="left-axis" barSize={15}/>
        { showLow  && <Bar dataKey="low" fill="#d3aae6" yAxisId="left-axis" barSize={15}/>}
        { showClosePrice  &&  <Bar dataKey="close_price"  fill="lightpink" yAxisId="left-axis" barSize={15}/>}
        { showQuantity &&  <Bar dataKey="quantity"  fill="#70eb63" yAxisId="right-axis" tickCount={10} barSize={15}/>}
      </BarChart>
      </ResponsiveContainer>
      <div className="allbuttons">
         <div>
         {showLow ? <span className='spanWithIcon' style={{backgroundColor:'#d3aae6'}}> <CheckSharpIcon style={iconStyle} onClick={() => setShowLow(!showLow)} /></span> : <span className="smallbox"  onClick={() => setShowLow(!showLow)} > </span>}
         <span>Low Price</span>
        </div>

         <div>
        { showClosePrice ? <span className='spanWithIcon' style={{backgroundColor:'lightpink'}}> <CheckSharpIcon style={iconStyle} onClick={() => setShowClosePrice(!showClosePrice)} /></span>  : <span className="smallbox"  onClick={() => setShowClosePrice(!showClosePrice)} > </span> }
         <span>close price</span>
         
        </div>

         <div>
         { showQuantity ? <span className='spanWithIcon' style={{backgroundColor:'#70eb63'}}> <CheckSharpIcon style={iconStyle} onClick={() => setShowQuantity(!showQuantity)} /></span>  : <span className="smallbox"  onClick={() => setShowQuantity(!showQuantity)} > </span> }
        <span>deliverable Quantity</span> 
        </div>
    	</div>
    </>
  )
}

export default memo(BarChartComp);