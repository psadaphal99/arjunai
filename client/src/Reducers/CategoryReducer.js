import { createReducer }  from '@reduxjs/toolkit'

const initialState = {
   TopLosers : [],
   RecoveryFromIntraday : [],
   MostActiveByVolume : [],
   Near52WeeksLow : [],
   HourlyGainers : [],
   NiftySmallCapHundred : [],
   NiftyFiveHundred : [],
   AllCandlePercentage:[],
   CandleStickRed4 : [],
   CandleStickRed5 : [],
   CandleStickGreen1 : [],
   Percentage60_80 : [],
   Percentage80_100 : [],
   WatchList : [],
   deliveryPercent:[],
   deliveryPercentWatch:[],
   pageNO:1,
   totalRecord:1,
};

export const topLosers = createReducer(initialState, {

  TopLosersRequest : (state) => {
      state.loading = true;
  },

  TopLosersSuccess : (state,action) => {
      state.loading = false;
      state.TopLosers = action.payload;
  },

  TopLosersFailure : (state,action) => {
      state.loading = false;
      state.error = action.payload;
  },

  RecoveryFromIntradayLowRequest : (state) => {
    state.loading = true;
},

RecoveryFromIntradayLowSuccess : (state,action) => {
    state.loading = false;
    state.RecoveryFromIntraday = action.payload;
},

RecoveryFromIntradayLowFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},


MostActivebyVolumeRequest : (state) => {
    state.loading = true;
},

MostActivebyVolumeSuccess : (state,action) => {
    state.loading = false;
    state.MostActiveByVolume = action.payload;
},

MostActivebyVolumeFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},


Near52WeeksLowRequest : (state) => {
    state.loading = true;
},

Near52WeeksLowSuccess : (state,action) => {
    state.loading = false;
    state.Near52WeeksLow = action.payload;
},

Near52WeeksLowFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},


HourlyGainersRequest : (state) => {
    state.loading = true;
},

HourlyGainersSuccess : (state,action) => {
    state.loading = false;
    state.HourlyGainers = action.payload;
},

HourlyGainersFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},

NiftySmallCapHundredRequest : (state) => {
    state.loading = true;
},

NiftySmallCapHundredSuccess : (state,action) => {
    state.loading = false;
    state.NiftySmallCapHundred = action.payload;
},

NiftySmallCapHundredFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},


NiftyFiveHundredRequest : (state) => {
    state.loading = true;
},

NiftyFiveHundredSuccess : (state,action) => {
    state.loading = false;
    state.NiftyFiveHundred = action.payload;
},

NiftyFiveHundredFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},

AllCandlePerRequest : (state) => {
    state.loading = true;
},

AllCandlePerSuccess : (state,action) => {
    state.loading = false;
    state.AllCandlePercentage = action.payload;
},

AllCandlePerFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},

WatchListRequest : (state) => {
    state.loading = true;
},

WatchListSuccess : (state,action) => {
    state.loading = false;
    state.WatchList = action.payload;
},

WatchListFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},

DeliveryPercentRequest : (state) => {
    state.loading = true;
},

DeliveryPercentSuccess : (state,action) => {
    state.loading = false;
    state.deliveryPercent = action.payload.data;
    state.pageNo = action.payload.page;
    state.totalRecord = action.payload.totalRecords;
},

DeliveryPercentFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},
DeliveryPercentWatchRequest : (state) => {
    state.loading = true;
},

DeliveryPercentWatchSuccess : (state,action) => {
    state.loading = false;
    state.deliveryPercentWatch = action.payload;
},

DeliveryPercentWatchFailure : (state,action) => {
    state.loading = false;
    state.error = action.payload;
},

SetTotalRecord :(state,action) => {
    state.totalRecord = action.payload;
}

})





const initialState1 ={
    sidebar:true,
    ActiveDate:[],
    blurActive:false,
    formatDate : new Date().toJSON(),
    formatNextday : new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toJSON(),
    analysis_obj:{}
};
export const SidebarDate = createReducer(initialState1,{

    "setdate":(state,action) => {
        state.date = action.payload;
    },

    "sidebarOpen":(state,action) => {
        state.sidebar = action.payload;
    },

    "GetCompanyName":(state,action) => {
        state.companyname = action.payload;
    },

    "clearCompanyName":(state) => {
        state.companyname = "";
    },

    "formatedDate":(state,action) => {
        state.formatDate = action.payload;
    },

    "nextDay":(state,action) => {
        state.formatNextday = action.payload; 
    },

    "BlurActive":(state,action) => {
        state.blurActive = action.payload;
    },

    "ActiveDateRequest":(state) => {
        state.loading =true;
    },

    "ActiveDateSuccess":(state,action) => {
        state.loading = false;
        state.ActiveDate = action.payload;
    },
    "ActiveDateFailure":(state,action) => {
        state.loading = false;
        state.ActiveDate = action.payload;
    },
    // "setDeliveryPercentage":(state,action) =>{
    //     state.DeliveryPercentageCount = action.payload.DeliveryPercentageCount;
    //     state.DeliveryPercentageNoOfDays= action.payload.DeliveryPercentageNoOfDays;
    // },
    // "setHighLowPercentage":(state,action)=>{
    //     state.HighLowPercentage =action.payload.HighLowPercentage;
    //     state.HighLowPercentageNoOfDays=action.payload.HighLowPercentageNoOfDays;
    // },

    "PercentAnalysis":(state,action) => {
        state.analysis_obj = action.payload;
    }

})