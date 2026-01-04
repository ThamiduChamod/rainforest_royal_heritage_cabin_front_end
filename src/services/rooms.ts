import api from "./api"


export const addRoom = async ( data: any) => {
    const res = await api.post("/Post/createRoom",data, {
        headers: {
        "Content-Type": "multipart/form-data"
    }
    })
    return res.data
}

export const getAllRooms = async () =>{
    const res = await api.get("/post/getAll")
    return res.data
}

export const deleteRoom = async (id: string)=>{
    const res = await api.post("/Post/roomDelete",{id})
    return res.data
}