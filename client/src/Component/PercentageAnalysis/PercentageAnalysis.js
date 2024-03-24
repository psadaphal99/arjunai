import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import './PercentageAnalysis.css'
import { memo } from "react";


const ALL_ANALYSIS_DATA = {};

const PercentageAnalysis = ({ setBlur, DATA, ALLFILENAMES }) => {
  const [showAnotherAnalysis,setShowAnotherAnalysis] = useState(false);
  const { analysis_obj } = useSelector(state => state.SidebarDate);
  for (let i = 0; i < DATA.length; i++) {
    let data = DATA[i];
    let datalow = data[0].low;
    let dataquantitylow = data[0].quantity;
    let datahigh = data[0].high;
    let percenthigh = data[0].percentage;

    // index value for high and low
    let datalowindex = 0;
    let percenthighIndex = 0;

    // candle variable
    let redcandle = 0;
    let greenCandle = 0;
    let redcandlePercentage = [];
    let greencandlePercentage = [];
    let redsum = 0
    let greensum = 0

    // calculate datalow, dataquantitylow, datahigh, percenthigh
    for (let i = 0; i < data.length; i++) {
      if (data[i].low < datalow) {
        datalow = data[i].low;
        datalowindex = i;
      }
      if (data[i].quantity < dataquantitylow) {
        dataquantitylow = data[i].quantity;
      }
      if (data[i].high > datahigh) {
        datahigh = data[i].high;
      }
      if (data[i].percentage > percenthigh) {
        percenthigh = data[i].percentage
        percenthighIndex = i;
      }

      if (data[i].open_price < data[i].close_price) {
        let a = (data[i].close_price - data[i].open_price) / (data[i].open_price / 100);
        greensum = greensum + a;
        greencandlePercentage = [...greencandlePercentage, Number(a.toFixed(2))];
        greenCandle++;
      } else {
        let b = (data[i].open_price - data[i].close_price) / (data[i].open_price / 100);
        redsum = redsum + b;
        redcandlePercentage = [...redcandlePercentage, Number(b.toFixed(2))];
        redcandle++
      }
    }

    // average of red and green  percentage => total sum / total no of candle
    let redavg = redsum / redcandle;
    let greenavg = greensum / greenCandle;

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
    for (let i = datalowindex; i < data.length; i++) {
      if (data[i].high > highAfter) {
        highAfter = data[i].high;
        highAfterIndex = i;
      }
    }

    // deliverable high percentage 
    //find high price => start from low price of the high percent in the data => iterate over the data and find high price and its index
    for (let i = percenthighIndex + 1; i < data.length; i++) {
      if (data[i].high > percenthighHighPrice) {
        percenthighHighPrice = data[i].high;
        percenthighHighPriceIndex = i;

      }
    }


    // find percent gain on low price in data
    let onePercent = datalow / 100;
    let percent = (highAfter - datalow) / onePercent;
    let daysCount = highAfterIndex - datalowindex;
    let highPriceDate = data[highAfterIndex].date;

    // find percent gain of low price of high percent in the data
    let OnepercentforPercentage = percenthighLowPrice / 100;
    let percentageGain = (percenthighHighPrice - percenthighLowPrice) / OnepercentforPercentage;
    let daysCountPercentage = percenthighHighPriceIndex - percenthighIndex;
    let percenthighHighPriceDate = data[percenthighHighPriceIndex].date

    let ele = {
      DeliveryPercentageCount: Number(percentageGain.toFixed(2)),
      DeliveryPercentageNoOfDays: daysCountPercentage,
      DeliveryPercentageLowDate: percentHighLowPriceDate,
      DeliveryPercentageHighDate: percenthighHighPriceDate,
      HighLowPercentage: Number(percent.toFixed(2)),
      HighLowPercentageNoOfDays: daysCount,
      HighLowPercentageLowDate: lowPriceDate,
      HighLowPercentageHighDate: highPriceDate,
      greenCandleCount: greenCandle,
      redcandleCount: redcandle,
      greenavg: Number(greenavg.toFixed(2)),
      redavg: Number(redavg.toFixed(2)),
      greensum: Number(greensum.toFixed(2)),
      redsum: Number(redsum.toFixed(2))
    }
    // ALL_ANALYSIS_DATA.push(ele); 

    ALL_ANALYSIS_DATA[`data${i}`] = ele;
  }

  

  return (
    <>
      <div className='PercentAnalysis'>
        <label className="switch">
          <input type="checkbox" />
          <span className="slider round"  onClick={() => setShowAnotherAnalysis(!showAnotherAnalysis)}></span>
        </label>

        {
          DATA.length === 1 && showAnotherAnalysis === false &&
          <div className='display-flex1'>
            <span className="material-icons close-analysis" onClick={() => setBlur(false)}>close</span>
            <div className='fileName'>Name : {ALLFILENAMES[0]}</div>
            <div style={{ display: 'flex' }}>
              <div className="percentagehigh">
                <span className='percentage'>Low to High</span>
                <span className='percentage'>Percentage</span>
                <span className='valuepercent'>{analysis_obj.HighLowPercentage} <span className='per'>%</span></span>
                <span className='noofDays'>No of Days</span>
                <span className='valueNoofDays'>{analysis_obj.HighLowPercentageNoOfDays}</span>
                <span style={{ fontSize: "10px", fontWeight: "bolder" }}>{`${analysis_obj.HighLowPercentageLowDate} to ${analysis_obj.HighLowPercentageHighDate}`}</span>
              </div>

              <div className="highlow">
                <span className='percentage'>High Delivery</span>
                <span className='percentage'>Percentage</span>
                <span className='valuehighlow'>{analysis_obj.DeliveryPercentageCount} <span className='per'>%</span></span>
                <span className='noofDays'>No of Days</span>
                <span className='valueNoofDays'>{analysis_obj.DeliveryPercentageNoOfDays}</span>
                <span style={{ fontSize: "10px", fontWeight: "bolder" }}>{`${analysis_obj.DeliveryPercentageLowDate} to ${analysis_obj.DeliveryPercentageHighDate}`}</span>
              </div>

              <div className="table-container">

                <table className='analysis_table'>
                  <thead>
                    <tr className='table-row'>
                      <th className="table-head"> <span className='ana-span'>Candle Green Count</span> <img className='analysis-img-bull' src="./images/bull.png" alt="bull" /> </th>
                      <th className="table-head"><span className='ana-span'>Candle Red Count </span><img className='analysis-img-bear' src="./images/bear.jpg" alt="bear" /></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-data color-green">{`${analysis_obj.greenCandleCount} days`}</td>
                      <td className="table-data color-red">{`${analysis_obj.redcandleCount} days`}</td>
                    </tr>
                  </tbody>
                </table>
                <table className='analysis_table'>
                  <thead>
                    <tr className='table-row'>
                      <th className="table-head"> Candle Green Sum %</th>
                      <th className="table-head">Candle Red Sum %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-data color-green">{analysis_obj.greensum}</td>
                      <td className="table-data color-red">{analysis_obj.redsum}</td>
                    </tr>
                  </tbody>
                </table>
                <table className='analysis_table'>
                  <thead>
                    <tr className='table-row'>
                      <th className="table-head"> Candle Green Avg %</th>
                      <th className="table-head">Candle Red Avg %</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="table-data color-green">{analysis_obj.greenavg}</td>
                      <td className="table-data color-red">{analysis_obj.redavg}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        }
        {DATA.length > 1 && showAnotherAnalysis === false &&
          <div className='display-flex1'>
            {
              DATA.map((ele, i) => {
                let analysis_obj = ALL_ANALYSIS_DATA[`data${i}`];
                return (
                  <>
                    <div className='fileName' key={`cname${i}`}>Name : {ALLFILENAMES[i]}</div>
                    <div className='container-comp' key={i}>
                      <span className="material-icons close-analysis" onClick={() => setBlur(false)}>close</span>
                      <div className="percentagehigh">
                        <span className='percentage'>Low to High</span>
                        <span className='percentage'>Percentage</span>
                        <span className='valuepercent'>{analysis_obj.HighLowPercentage} <span className='per'>%</span></span>
                        <span className='noofDays'>No of Days</span>
                        <span className='valueNoofDays'>{analysis_obj.HighLowPercentageNoOfDays}</span>
                        <span style={{ fontSize: "10px", fontWeight: "bolder" }}>{`${analysis_obj.HighLowPercentageLowDate} to ${analysis_obj.HighLowPercentageHighDate}`}</span>
                      </div>

                      <div className="highlow">
                        <span className='percentage'>High Delivery</span>
                        <span className='percentage'>Percentage</span>
                        <span className='valuehighlow'>{analysis_obj.DeliveryPercentageCount} <span className='per'>%</span></span>
                        <span className='noofDays'>No of Days</span>
                        <span className='valueNoofDays'>{analysis_obj.DeliveryPercentageNoOfDays}</span>
                        <span style={{ fontSize: "10px", fontWeight: "bolder" }}>{`${analysis_obj.DeliveryPercentageLowDate} to ${analysis_obj.DeliveryPercentageHighDate}`}</span>
                      </div>

                      <div className="table-container">

                        <table className='analysis_table'>
                          <thead>
                            <tr className='table-row'>
                              <th className="table-head"> <span className='ana-span'>Candle Green Count</span> <img className='analysis-img-bull' src="./images/bull.png" alt="bull" /> </th>
                              <th className="table-head"><span className='ana-span'>Candle Red Count </span><img className='analysis-img-bear' src="./images/bear.jpg" alt="bear" /></th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="table-data color-green">{`${analysis_obj.greenCandleCount} days`}</td>
                              <td className="table-data color-red">{`${analysis_obj.redcandleCount} days`}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className='analysis_table'>
                          <thead>
                            <tr className='table-row'>
                              <th className="table-head"> Candle Green Sum %</th>
                              <th className="table-head">Candle Red Sum %</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="table-data color-green">{analysis_obj.greensum}</td>
                              <td className="table-data color-red">{analysis_obj.redsum}</td>
                            </tr>
                          </tbody>
                        </table>
                        <table className='analysis_table'>
                          <thead>
                            <tr className='table-row'>
                              <th className="table-head"> Candle Green Avg %</th>
                              <th className="table-head">Candle Red Avg %</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="table-data color-green">{analysis_obj.greenavg}</td>
                              <td className="table-data color-red">{analysis_obj.redavg}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <hr />
                  </>
                )
              })
            }
          </div>
        }
        {/* <div className="PercentAnalysis">
    
    </div> */}

      { showAnotherAnalysis &&  <div className='display-f' style={{ flexDirection: 'row' }}>
          {DATA.map((ele, i) => {
            let analysis_obj = ALL_ANALYSIS_DATA[`data${i}`];
            return (
              <>
                <div className='display-flex1' key={`lowhigh${i}`}>
                  <div className='small-filename'>{ALLFILENAMES[i]}</div>
                  <div className="percentagehigh" style={{ margin: '10px' }}>
                    <span className='percentage'>Low to High</span>
                    <span className='percentage'>Percentage</span>
                    <span className='valuepercent'>{analysis_obj.HighLowPercentage} <span className='per'>%</span></span>
                    <span className='noofDays'>No of Days</span>
                    <span className='valueNoofDays'>{analysis_obj.HighLowPercentageNoOfDays}</span>
                    <span style={{ fontSize: "10px", fontWeight: "bolder" }}>{`${analysis_obj.HighLowPercentageLowDate} to ${analysis_obj.HighLowPercentageHighDate}`}</span>
                  </div>
                </div>
              </>
            )
          })
          }
        </div>
}
        <hr />

        { showAnotherAnalysis &&    <div className='display-f' style={{ flexDirection: 'row' }}>
          {DATA.map((ele, i) => {
            let analysis_obj = ALL_ANALYSIS_DATA[`data${i}`];
            return (
              <>
                <div className='display-flex1' key={`deliveryper${i}`}>
                  <div className='small-filename'>{ALLFILENAMES[i]}</div>
                  <div className="highlow" style={{ margin: '10px' }}>
                    <span className='percentage'>High Delivery</span>
                    <span className='percentage'>Percentage</span>
                    <span className='valuehighlow'>{analysis_obj.DeliveryPercentageCount} <span className='per'>%</span></span>
                    <span className='noofDays'>No of Days</span>
                    <span className='valueNoofDays'>{analysis_obj.DeliveryPercentageNoOfDays}</span>
                    <span style={{ fontSize: "10px", fontWeight: "bolder" }}>{`${analysis_obj.DeliveryPercentageLowDate} to ${analysis_obj.DeliveryPercentageHighDate}`}</span>
                  </div>
                </div>
              </>
            )
          })
          }
        </div>
}
        <hr />

        { showAnotherAnalysis &&       <div className='display-f' style={{ flexDirection: 'row' }}>
          {DATA.map((ele, i) => {
            let analysis_obj = ALL_ANALYSIS_DATA[`data${i}`];
            return (
              <>
                <div className='display-flex1' key={`table${i}`}>
                  <div className='small-filename'>{ALLFILENAMES[i]}</div>
                  <div className="table-container" style={{ margin: '10px' }} >

                    <table className='analysis_table'>
                      <thead>
                        <tr className='table-row'>
                          <th className="table-head"> <span className='ana-span'>Candle Green Count</span> <img className='analysis-img-bull' src="./images/bull.png" alt="bull" /> </th>
                          <th className="table-head"><span className='ana-span'>Candle Red Count </span><img className='analysis-img-bear' src="./images/bear.jpg" alt="bear" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="table-data color-green">{`${analysis_obj.greenCandleCount} days`}</td>
                          <td className="table-data color-red">{`${analysis_obj.redcandleCount} days`}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className='analysis_table'>
                      <thead>
                        <tr className='table-row'>
                          <th className="table-head"> Candle Green Sum %</th>
                          <th className="table-head">Candle Red Sum %</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="table-data color-green">{analysis_obj.greensum}</td>
                          <td className="table-data color-red">{analysis_obj.redsum}</td>
                        </tr>
                      </tbody>
                    </table>
                    <table className='analysis_table'>
                      <thead>
                        <tr className='table-row'>
                          <th className="table-head"> Candle Green Avg %</th>
                          <th className="table-head">Candle Red Avg %</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="table-data color-green">{analysis_obj.greenavg}</td>
                          <td className="table-data color-red">{analysis_obj.redavg}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </>
            )
          })
          }
        </div>
        }

      </div>
    </>
  )
}

export default memo(PercentageAnalysis)