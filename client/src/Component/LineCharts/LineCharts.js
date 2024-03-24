import React from 'react'
import './LineCharts.css'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function CustomTooltip({ active,payload,label }) {
   if(active){
    return (<>
      <div className="custom-tooltip">
      <p className="label">{label}</p>
      <p className="intro">{`Price : ${JSON.stringify(payload[0].payload.price)}`}</p>
      <p className="intro">{`percentage : ${JSON.stringify(payload[0].payload.percentage)}`}</p>
    </div>        
      </>
    );
   }

   return null;
}

const LineCharts = ({data}) => {
  let dataMax  = Number(data[0].price);
  let dataMin  = Number(data[0].price);
    for (let i = 0; i < data.length; i++) {
      if(Number(data[i].price) > dataMax){
        dataMax = Number(data[i].price);
      }
      if(Number(data[i].price) < dataMin){
        dataMin = Number(data[i].price);
      }      
    }
    
    return (
    <div className='chart'>
        <h3 className='headh3'>Charts</h3>
        < ResponsiveContainer width="100%" aspect={3/1}>
        < LineChart data={data} >
         < XAxis dataKey="date" stroke='black' fontSize={12} fontWeight={1000} tickCount={12}/>
         < YAxis type="number" domain={['dataMin - 30', 'dataMax + 10']} fontSize={12} fontWeight={1000} tickCount={8} />
         <Line type='monotone' dataKey='price' stroke='#5550bd'/>
         <Tooltip content={ < CustomTooltip />} />
         {/* <Tooltip content={<CustomTooltip /> */}
         < CartesianGrid stroke='lightgrey' strokeDasharray='3 3'/>
        < Legend />
        </LineChart>
        </ResponsiveContainer>
        </div>
  )
}

export default LineCharts