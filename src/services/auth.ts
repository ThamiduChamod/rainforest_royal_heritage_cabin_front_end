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

}

