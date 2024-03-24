import React from 'react'
import { useSelector } from 'react-redux';
import {Navigate,Outlet} from 'react-router-dom'

const ProtectedRoute = ({children}) => {

const isAuthenticated = useSelector(state => state.user.isAuthenticated);

if(!isAuthenticated){
    return <Navigate to={"/login"} />
}

return children ? children : < Outlet />;

}

export default ProtectedRoute;