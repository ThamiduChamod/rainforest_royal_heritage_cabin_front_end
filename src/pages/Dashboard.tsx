import React, { useState } from 'react'
import PageHeroSection from '../components/PageHeroSection'
import heroimg from "../assets/photos/image2.jpeg"
import { BedDouble, CheckCircle, ChevronRight, Gift, LayoutDashboard, PlusCircle, Settings, Users, type LucideIcon } from 'lucide-react'
import RoomCard from '../components/RoomCard';
import PackageCard from '../components/PackageCard';
import AdminPanel from '../components/AdminPanel';
import AddFrom from '../components/Modal';
import AddPackage from '../components/AddPackage';
import AddRoom from '../components/Modal';
import Modal from '../components/Modal';
import AddRooms from '../components/AddRooms';

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("dashboard");
    



    type StatCardProps = {
      statcard: {
        title: string
        value: string
        color: string
      }
      icon: LucideIcon
  }
    const StatCard = ({ statcard, icon:Icon}: StatCardProps) => (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 text-left">
      <div className={`p-4 rounded-xl ${statcard.color} text-white`}>
        <Icon size={22} />
      </div>
      <div>
        <p className="text-sm text-slate-500 font-medium">{statcard.title}</p>
        <h3 className="text-2xl font-bold text-slate-800">{statcard.value}</h3>
      </div>
    </div>
  );

  const roomsData = [
    { id: 1, type: "Deluxe Ocean View", price: "12,500", status: "Available", pax: 2, bedType: "King Size", amenities: ["A/C", "WiFi"], image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=500" },
    { id: 2, type: "Standard Double", price: "8,000", status: "Booked", pax: 2, bedType: "Double Bed", amenities: ["A/C"], image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=500" },
    { id: 1, type: "Deluxe Ocean View", price: "12,500", status: "Available", pax: 2, bedType: "King Size", amenities: ["A/C", "WiFi"], image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=500" },
  ];

  const packagesData = [
    { id: 1, name: "Classic Day Outing", price: "3,500", tagline: "Perfect for family", status: "Available", features: ["Lunch Buffet", "Pool Access"], image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210e7?q=80&w=800" },
  ];

  
  
  return (
    <div className="bg-gray-50 min-h-screen">
        <PageHeroSection img={heroimg} pageName='Admin Dashboard'  />

      {/* dashboard navigation */}
      <aside className="h-10/12  bg-slate-900 text-white p-6 hidden lg:flex flex-col">
        
        <nav className="flex  justify-between">
          {[
            { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
            { id: "rooms", label: "Room Booking", icon: BedDouble },
            { id: "packages", label: "Package Booking", icon: Gift },
            { id: "admin", label: "Admin Panel", icon: Settings },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between p-3.5 rounded-xl transition ${
                activeTab === item.id
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                <span className="font-semibold text-sm">{item.label}</span>
              </div>

              {activeTab === item.id && <ChevronRight size={16} />}
            </button>
          ))}
        </nav>

      </aside>

      {/* 1. DASHBOARD VIEW */}
          {activeTab === "dashboard" && (
            <div className=" m-10 flex justify-around items-center animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-15">
                <StatCard statcard={{title:"Total Inventory" ,value:"40 Rooms",  color:"bg-blue-500"}} icon={BedDouble}  />
                <StatCard statcard={{title:"Today's Occupancy", value:"75%",  color:"bg-emerald-500"}} icon={CheckCircle} />
                <StatCard statcard={{title:"Pending Packages", value:"12", color:"bg-amber-500"}} icon={Gift} />
                <StatCard statcard={{title:"Active Guests", value:"34", color:"bg-indigo-500"}} icon={Users} />
              </div>
            </div>
          )}

      {activeTab === "rooms" && (
        <div className="grid justify-around lg:grid-cols-3  animate-in fade-in duration-500">
          {roomsData.map(room => <RoomCard room={{
            status:room.status,
            image: room.image,
            type: room.type,
            price: room.price,
            pax: room.pax,
            bedType: room.bedType,
            amenities: room.amenities
          }} />)}
        </div>
      )}

      {/* 3. PACKAGES VIEW (USER) */}
          {activeTab === "packages" && (
            <div className="grid justify-around lg:grid-cols-3  animate-in fade-in duration-500">
              {packagesData.map(PKG => <PackageCard pkg={{
                status: PKG.status,
                image: PKG.image,
                name: PKG.name,
                price: PKG.price,
                tagline: PKG.tagline,
                features: PKG.features
              }}/>)}
            </div>
          )}


          {activeTab === "admin" && (
            <AdminPanel/>
          )}
           
    </div>
  )
}
