import api from "./api"

export const addPackage = async ( data: any) => {
    
    const res = await api.post("/Post/createPackage",data, {
        headers: {
        "Content-Type": "multipart/form-data"
    }
    })
    return res.data
}

export const getAllPackage = async () =>{
    const res = await api.get("/post/getAllPackage")
    return res.data
}

export const updatePackage = async (data: any)=>{
    const res = await api.post("/post/updatePackage", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    })
    return res.data
}

export const deletePackage = async (id: string)=>{
    const res = await api.post("/post/getAllPackage")
    return res.data
}