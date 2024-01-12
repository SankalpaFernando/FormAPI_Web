import { useSelector } from "react-redux"
import { Navigate, Route } from "react-router-dom";

export default ({children}) =>{
    const user = useSelector(state=>state.auth.user);

    if(!user){
        return <Navigate to="/login" />
    }

    return children
}