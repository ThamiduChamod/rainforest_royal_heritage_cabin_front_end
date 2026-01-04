import api from "./api"

export const authorRegister = async (data: any) =>{
    const res  = await api.post("/Admin/registerAuthor", data)
    return res.data
}