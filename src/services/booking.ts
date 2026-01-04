import api from "./api"

export const bookRoom = async (roomId: string, date: string)=>{
    const res = await api.post("/book/roomBook", {roomId, date})
    return res.data
}

export const myBooking = async () =>{
    const res = await api.get("/book/getBookings")
    return res.data
}