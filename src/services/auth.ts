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

export const refreshTokens = async (refreshToken: string) => {
    const res = await api.post("/auth/refresh", {token: refreshToken})
    return res.data
}
export const getMyDetails = async () => {
  const res = await api.get("/auth/me")
  return res.data
}

export const sendMail = async (data:any) => {
    const res = await api.post("/auth/sendEmail", data)
  return res.data
}