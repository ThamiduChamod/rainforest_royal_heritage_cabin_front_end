import { lazy, Suspense, use, type ReactNode } from "react";
import { useAuth } from "../context/authContext";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

const Home = lazy(() => import("../pages/Home"))
const Welcome = lazy(() => import("../pages/Welcome"))

type RequireAuthTypes = {children: ReactNode; roles?: string[]}

const RequireAuth = ({children, roles}: RequireAuthTypes) => {
    const {user,loading} = useAuth()

    if (loading){
        return (
            <div className="flex items-center justify-center h-screen bg-gray-100">
                <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!user) {
        return <Navigate to = "/Home" replace />
    }

    if (roles && !roles.some((role) => user.roles?.includes(role))){
        return(
            <div className="text-center py-20">
                <h2 className="text-xl font-bold mb-2">Access denied</h2>
                <p>You do not have permission to view this page.</p>
            </div>
        )
    }

    return <>{children}</>

} 

export default function Router() {
    return(
        <BrowserRouter>
            <Suspense fallback = {
                <div className="flex items-center justify-center h-screen bg-gray-100">
                    <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
                </div>
            }>
            
            <Routes>
                <Route path="/" element={<Welcome/>} />
                <Route path="/Home" element={<Home/>} />
            </Routes>
            </Suspense>
        </BrowserRouter>
    )
}
