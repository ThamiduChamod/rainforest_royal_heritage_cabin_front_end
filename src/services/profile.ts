import api from "./api"

export const saveProfile = async (data: any) =>{
    const res = await api.post("/profile/save", data)
    return res.data
}

export const updateImage = async (data: any) =>{
    const res = await api.post("/profile/imageUpdate", data,{
        headers: {
        "Content-Type": "multipart/form-data"
    }
    })
    return res.data
}

export const getProfile = async () =>{
    const res = await api.get("/profile/getMy")
    return res.data
}