import React, { useState } from "react";
import Papa from "papaparse";
import BarChartComp from "../barcharts/BarChart";
import './ReadCSV.css'
import  PercentageAnalysis  from  '../PercentageAnalysis/PercentageAnalysis'
import { memo } from "react";






const month = {
	"Jan": 0,
	"Feb":1,
	"Mar":2,
	"Apr":3,
	"May":4,
	"Jun":5,
	"Jul":6,
	"Aug":7,
	"Sep":8,
	"Oct":9,
	"Nov":10,
	"Dec":11,
}

let DATA = [];
let ALLFILENAMES = [];
// // Allowed extensions for input file
// const allowedExtensions = ["csv"];

const ReadCSV = ({setUploadDataOpen}) => {
	const [data, setData] = useState([]);
	const [filterdata, setFilterData] = useState([]);
	const [error, setError] = useState("");
	const [noOfFiles, setnoOfFiles] = useState(0);
	const [allFiles, setAllFiles] = useState(0);
	const [blur,setBlur] = useState(false);
	const [activeDataButton,setActiveDataButton] = useState('ALL');
	// const [allFileNames, setAllFilesNames] = useState([])
	// const [allCsvData,setAllCsvData] = useState([]);
	const [showGraph,setShowGraph] = useState(false)

	
	
	//to get all element location
	let index = 0;


	const handleFileChange = (e) => {
		DATA = [];
		ALLFILENAMES = [];
		setError("");  
		setAllFiles(e.target.files);
		setnoOfFiles(e.target.files.length);
		
		for (let i = 0; i < e.target.files.length; i++) {
			ALLFILENAMES.push(e.target.files[i].name);
		}
		
		}

	const handleParse = () => {
		for (let i = 0; i < allFiles.length; i++) {
			Papa.parse(allFiles[i], {
			  header: true,
			  skipEmptyLines: true,
			  complete: function (results) {
	              let parsedData = results.data;
				    let requiredData = [];
            for (let i = 0; i < parsedData.length; i++) {
				if(!parsedData[i].Date){
                    continue;
				}
             let d = parsedData[i];

			 let da = d.Date.split('-');
			  if(da[2].length === 2){
				da[2]= `20${da[2]}`;
			  }
			 let d1 =  new Date(da[2],month[da[1]],da[0]);
			 let dfinal = d1.toJSON().slice(0,10);

               let obj = {
                date:dfinal,
                high : Number(d['High Price']),
                low :Number(d['Low Price']),
                percentage:Number(d['% Dly Qt to Traded Qty']),
                quantity:Number(d['Deliverable Qty'].replaceAll(',','')),
				close_price:Number(d['Close Price']),
				open_price:Number(d['Open Price'])
               }
				requiredData = [...requiredData,obj];
			}
			const columns = Object.keys(parsedData[0]);
			
            let requiredColumns = columns.filter(ele => {
                if(ele === "High Price" | ele === "Date" | ele === "% Dly Qt to Traded Qty" | ele === "Low Price"){
                    return ele;
                }
                return null;
            })
        
            if(requiredColumns.length === 4){
				DATA.push(requiredData);
               if(i === 0){
				setData(requiredData);
				setFilterData(requiredData);
			   }
				
            }else{
               setError("Please includes columns - Date,High Price,Low Price,% Dly Qt to Traded Qty");
            }
			  },
			});
			
		   }	
       setShowGraph(true);
	   setAllFiles([]);
	};


	

	 const filterData = (no_of_days,value) => {
		setActiveDataButton(value);
     let date1 = data[data.length-1].date;
     let newDate = new Date(new Date(date1).getTime() - no_of_days * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
     let datep = data.find((ele,i) => {  
       index = i
       return ele.date === newDate});
    
     if(!datep){
       newDate = new Date(new Date(date1).getTime() - (no_of_days-2) * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
       datep = data.find((ele,i) =>{
		  index = i;
		return ele.date === newDate});
       if(!datep){
        newDate = new Date(new Date(date1).getTime() - (no_of_days-3) * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
        datep = data.find((ele,i) => {
			index = i;
			return ele.date === newDate});
      }
	  if(!datep){
        newDate = new Date(new Date(date1).getTime() - (no_of_days-4) * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
        datep = data.find((ele,i) => {
			index = i;
			return ele.date === newDate});
      }
	   if(!datep){
        newDate = new Date(new Date(date1).getTime() - (no_of_days-5) * 24 * 60 * 60 * 1000).toJSON().slice(0,10);
        datep = data.find((ele,i) => {
			index = i;
			return ele.date === newDate});
      }
     }
    
     let  final = [];
	 if(index === data.length-1){
		setFilterData([]);
	 }else{
     for (let i = index; i < data.length; i++) {
         final = [...final,data[i]];      
     }
		   setFilterData(final);
	} 
 }



	return (
	<>
		<div className={blur ? "csv_reader blur":"csv_reader"}>
        <span className="material-icons close-analysis" onClick={() => setUploadDataOpen(false)}>close</span>

			<label htmlFor="csvInput" style={{ display: "block" }}>
				Enter CSV File
			
			<input
				className="file-input"
				onChange={handleFileChange}
				id="csvInput"
				accept=".csv"
				name="file"
				type="File"
				multiple
			/>
			</label>
			<div className="buttons">	
			 <div>
			 <button disabled={noOfFiles <= 0} onClick={handleParse} className= 'upload-botton'>Upload</button>
			 {showGraph &&  filterdata.length > 0 && <button onClick={() => setBlur(true)} className= 'upload-botton'>Analysis Report</button>}
			 </div>
			{showGraph && data.length > 0 && <div className="lastdays">
      		<span className={activeDataButton === "1W"?'previous-week activebutton':'previous-week'} onClick={() => filterData(7,'1W')}>1W</span>
      		<span className={ activeDataButton === '2W' ? 'previous-week activebutton' : 'previous-week'} onClick={() => filterData(14,'2W')}>2W</span>
     		 <span className={ activeDataButton === '1M' ? 'previous-week activebutton' : 'previous-week'} onClick={() => filterData(30,'1M')}>1M</span>
      		<span className={ activeDataButton === '2M' ? 'previous-week activebutton' : 'previous-week'} onClick={() => filterData(60,'2M')}>2M</span>
      		<span className={ activeDataButton === '3M' ? 'previous-week activebutton' : 'previous-week'} onClick={() => filterData(90,'3M')}>3M</span>
      		<span className={ activeDataButton === '6M' ? 'previous-week activebutton' : 'previous-week'} onClick={() => filterData(180,'6M')}>6M</span>
      		<span className={ activeDataButton === '1Y' ? 'previous-week activebutton' : 'previous-week'}  onClick={() => filterData(365,'1Y')}>1Y</span>
      		<span className={ activeDataButton === 'ALL' ? 'previous-week activebutton' : 'previous-week'} onClick={() => {setActiveDataButton('ALL'); setFilterData(data,'ALL')}}>ALL</span>
     		</div>}
			 </div> 

			<div className={error ? "display-error" : "displayn"} >
				{error && error}
			</div>			
            {showGraph && filterdata.length > 0  && < BarChartComp data = {filterdata} />  }
		</div>
		{  blur && < PercentageAnalysis  setBlur={setBlur} DATA ={DATA} ALLFILENAMES={ALLFILENAMES}/>}
		</>
	);
	}

export default memo(ReadCSV);
