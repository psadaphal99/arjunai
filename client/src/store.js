import { configureStore }  from '@reduxjs/toolkit'
import { topLosers , SidebarDate} from './Reducers/CategoryReducer';
import { userReducer } from './Reducers/UserReducer';



const store = configureStore({
    reducer: {
        Data: topLosers,
        SidebarDate : SidebarDate,
        user:userReducer
    },
    // devTools:false
});


export default store;