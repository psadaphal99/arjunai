import axios from "axios";
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});

export const getTopLosers = (today,nextday) => async (dispatch) => {
    try {
    
     
     
      dispatch({
        type: "TopLosersRequest",
      });
  
      const { data } = await axiosInstance.get(`/gettoplosers/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "TopLosersSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "TopLosersFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getRecoveryFromIntradayLow = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "RecoveryFromIntradayLowRequests",
      });
  
      const { data } = await axiosInstance.get(`/getintradaylow/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "RecoveryFromIntradayLowSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "RecoveryFromIntradayLowFailure",
        payload: error.response.data.message,
      });
    }
  };


export const getMostActiveByVolumes = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "MostActivebyVolumeRequest",
      });
  
      const { data } = await axiosInstance.get(`/getactivevolume/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "MostActivebyVolumeSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "MostActivebyVolumeFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getNear52weeksLow = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "Near52WeeksLowRequest",
      });
  
      const { data } = await axiosInstance.get(`/getfiftyweeklow/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "Near52WeeksLowSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "Near52WeeksLowFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getHourlyGainers = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "HourlyGainersRequest",
      });
  
      const { data } = await axiosInstance.get(`/gethourlygainers/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "HourlyGainersSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "HourlyGainersFailure",
        payload: error.response.data.message,
      });
    }
  };


export const getNiftySmallCapHundred = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "NiftySmallCapHundredRequest",
      });
  
      const { data } = await axiosInstance.get(`/niftyhundred/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "NiftySmallCapHundredSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "NiftySmallCapHundredFailure",
        payload: error.response.data.message,
      });
    }
  };

export const getNiftyFiveHundred = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "NiftyFiveHundredRequest",
      });
  
      const { data } = await axiosInstance.get(`/getniftyfivehundred/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "NiftyFiveHundredSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "NiftyFiveHundredFailure",
        payload: error.response.data.message,
      });
    }
  };
export const getAllCandlePercentage = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "AllCandlePerRequest",
      });
  
      const { data } = await axiosInstance.get(`/getallcandle/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "AllCandlePerSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "AllCandlePerFailure",
        payload: error.response.data.message,
      });
    }
  };

  export const getCandleStickRed4 = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "CandleStickRed4Request",
      });
  
      const { data } = await axiosInstance.get(`/getcandlered4/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "CandleStickRed4Success",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "CandleStickRed4Failure",
        payload: error.response.data.message,
      });
    }
  };


  export const getCandleStickRed5 = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "CandleStickRed5Request",
      });
  
      const { data } = await axiosInstance.get(`/getcandlered5/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "CandleStickRed5Success",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "CandleStickRed5Failure",
        payload: error.response.data.message,
      });
    }
  };

  export const getCandleStickGreen1 = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "CandleStickGreen1Request",
      });
  
      const { data } = await axiosInstance.get(`/getcandlegreen1/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "CandleStickGreen1Success",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "CandleStickGreen1Failure",
        payload: error.response.data.message,
      });
    }
  };

  export const getPercentage60_80 = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "Percentage60_80Request",
      });
  
      const { data } = await axiosInstance.get(`/getpercent60_80/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "Percentage60_80Success",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "Percentage60_80Failure",
        payload: error.response.data.message,
      });
    }
  };

  export const getPercentage80_100 = (today,nextday) => async (dispatch) => {
    try {
      dispatch({
        type: "Percentage80_100Request",
      });
  
      const { data } = await axiosInstance.get(`/getpercent80_100/${today}/${nextday}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "Percentage80_100Success",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "Percentage80_100Failure",
        payload: error.response.data.message,
      });
    }
  };

  export const getWatchList = () => async (dispatch) => {
    try {
      // dispatch({
      //   type: "WatchListRequest",
      // });
  
      const { data } = await axiosInstance.get("/getwatchlist",{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "WatchListSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "WatchListFailure",
        payload: error.response.data.message,
      });
    }
  };
  export const getDeliveryPercent = (page,range) => async (dispatch) => {
    try {
      dispatch({
        type: "DeliveryPercentRequest",
      });
      const { data } = await axiosInstance.get(`/percent?page=${page}&range=${range}`,{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });

      let dataObj = {data : data && data.data ? data.data : [],
        totalRecords:data.totalCount,
        page:data.page
      }
     
      
      dispatch({
        type:'DeliveryPercentSuccess',
        payload:dataObj,
      })
      // return data;
    } catch (error) {
      dispatch({
        type: "DeliveryPercentFailure",
        payload: error.response.data.message,
      });
  
    }
  };


  export const getDeliveryPercentWatchlist= () => async (dispatch) => {
    try {
      dispatch({
        type: "DeliveryPercentWatchRequest",
      });
      const { data } = await axiosInstance.get("/percent/watchlist",{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });

    

      dispatch({
        type:'DeliveryPercentWatchSuccess',
        payload:data && data.data.percent ? data.data.percent : [],
      })
      // return data;
    } catch (error) {
      dispatch({
        type: "DeliveryPercentWatchFailure",
        payload: error.response.data.message,
      });
    }
  };


  export const getActiveDates = () => async (dispatch) => {
    try {
      dispatch({
        type: "ActiveDateRequest",
      });
  
      const { data } = await axiosInstance.get("/getdate",{
        headers:{
          'x-access-token': localStorage.getItem('token')
      }
      });
      dispatch({
        type: "ActiveDateSuccess",
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: "ActiveDateFailure",
        payload: error.response.data.message,
      });
    }
  };


  export const addtoPercentWatchlist = (ele) => async (dispatch) => {
    try {
           
        const {data} = await axiosInstance.post("/percent/addwatchList",{ele},{
            headers:{
                "Content-Type":"application/json",
                'x-access-token': localStorage.getItem('token')
            }
        })

        return data;
        // console.log(data);
        // if(data.status === "success"){
        //   getDeliveryPercent()
        //   getDeliveryPercentWatchlist();
        // }

       
    } catch (err) {
        return err;
        
    }
}

export const deleteFromPercentWatchlist = (symbol) => async (dispatch) => {
  try {
         
      const {data} = await axiosInstance.post("/percent/deletewatchList",{symbol},{
          headers:{
              "Content-Type":"application/json",
              'x-access-token': localStorage.getItem('token')
          }
      })

      return data;
      // console.log(data);
      // if(data.status === "success"){
      //   getDeliveryPercent()
      //   getDeliveryPercentWatchlist();
      // }

     
  } catch (err) {
      return err;
      
  }
}

// = (symbol) => async (dispatch) =>
export const getSearchDeliveryPercent = (searchValue) =>  async(dispatch) => {
  try {   
    const {data} = await axiosInstance.get(`/percent/search/${searchValue}`,{
        headers:{
            "Content-Type":"application/json",
            'x-access-token': localStorage.getItem('token')
        }
    })
    // console.log(data);
    return data.data; 
} catch (err) {
    return err;  
}}

  

    // function take array of object, removed duplicate records and return unique array
   export const RemoveDublicate = (obj1) => {
   let jsonObject = obj1.map(JSON.stringify);
   let uniqueSet = new Set(jsonObject);
   let uniqueArray = Array.from(uniqueSet).map(JSON.parse);
     return uniqueArray;
}

  // export const PostWatchList = (obj) => async (dispatch) => {
  //   try {
  //     // dispatch({
  //     //   type: "PostWatchListRequest",
  //     // });
  
  //     const { data } = await axios.post("/postwatchlist",obj,{

  //       headers:{
  //           "Content-Type":"application/json"
  //       }}
  //       );

  //     dispatch({
  //       type: "PostWatchListSuccess",
  //       payload: data,
  //     });
  //   } catch (error) {
  //     dispatch({
  //       type: "PostWatchListFailure",
  //       payload: error.response.data.message,
  //     });
  //   }
  // };



