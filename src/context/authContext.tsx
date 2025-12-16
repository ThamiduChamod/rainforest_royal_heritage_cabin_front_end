import { createContext, useEffect, useState } from "react"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children } : any) => {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")

        if(token){
            console.log("Accses Token ready localStorage")
        }else{
            setUser(null)
            setLoading(false)
        }
    })
    return(
        <AuthContext.Provider value = {{user, setUser, loading}}>
            {children}
        </AuthContext.Provider>
    )

}

export const