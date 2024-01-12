import api from './api';

export const getRegister=async(email:string,name:string,password:string)=>{
    return api.post('/register',{email,name,password})
}

export const getLogin=async(email:string,password:string)=>{
    return api.post('/login',{email,password})
}