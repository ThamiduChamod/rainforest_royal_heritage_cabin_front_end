import api from "./api"

export const saveProfile = async (data: any) =>{
    const res = await api.post("/profile/save", data)
    return res.data
}