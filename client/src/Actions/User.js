import axios from "axios"
const axiosInstance = axios.create({baseURL:process.env.REACT_APP_API_URL});

export const LoginUser = (email,password,navigate) => async (dispatch) => {
    try {

        dispatch({
            type:"LoginRequest"
        })

        const {data} = await axiosInstance.post("/login",{email,password},{

            headers:{
                "Content-Type":"application/json"
            }
        })

        dispatch({
            type:"LoginSuccess",
            payload:data.user
        })
        navigate("/");

    } catch (err) {
        dispatch({
            type:"LoginFailure",
            payload:err.response.data.message
        })
        
    }
}


export const LoadUser = () => async (dispatch) => {
    try {
        dispatch({
            type:"LoadUserRequest"
        })

       const {data} = await axiosInstance.get("/me",{
        headers:{
            'x-access-token': localStorage.getItem('token')        }
       })

        dispatch({
            type:"LoadUserSuccess",
            payload:data.user
        })

    } catch (err) {
        if(err.response.data.message === "jwt expired"){
            localStorage.removeItem('token');
            dispatch({
                type:"LoadUserFailure",
                payload:""
    
            })
        }else{
            dispatch({
                type:"LoadUserFailure",
                payload:err.response.data.message
    
            })
        }
        
    }
}
export const LoadUserNoLoad = () => async (dispatch) => {
    try {
        dispatch({
            type:"LoadUserNoLoadRequest"
        })

       const {data} = await axiosInstance.get("/me",{
        headers:{
            'x-access-token': localStorage.getItem('token')        }
       })

        dispatch({
            type:"LoadUserNoLoadSuccess",
            payload:data.user
        })

    } catch (err) {
        dispatch({
            type:"LoadUserNoLoadFailure",
            payload:err.response.data.message

        })
        
    }
}


export const LogoutUser = () => async (dispatch) => {
    try {

        dispatch({
            type:"LogoutUserRequest"
        })

        await axiosInstance.get("/logout",{
            headers:{
                'x-access-token': localStorage.getItem('token')
            }
        })

        dispatch({
            type:"BlurActive",
            payload: false
          })


        dispatch({
            type:"LogoutUserSuccess",
        })

      
    } catch (err) {
        dispatch({
            type:"LogoutUserFailure",
            payload:err.response.data.message
        })
        
    }
}
