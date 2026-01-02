import { data } from "react-router-dom"
import api from "./api"

type RegisterDataType = {
    firstName: string
    lastName: string
    registerEmail: string
    registerPassword: string
    role: string 
}

export const register = async (data: RegisterDataType)=>{
    const res = await api.post("/auth/register", data)
    return res.data
}

export const login = async (email: string, password: string)=>{
    const res = await api.post("auth/logIn", {email, password})
    return res.data

}

export const sendOTP = async (registerEmail: string) =>{
    const res = await api.post("/auth/sendOTP", {registerEmail})
    return res.data
}

export const verifyOTP = async (registerEmail: string, otp: string) =>{
    const res = await api.post("/auth/verifyOTP", {email:registerEmail, otp})
    return res.data
}

