import { PlusCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RoomCard from './RoomCard'
import PackageCard from './PackageCard'
import AddRooms from './AddRoom'
import AddPackage from './AddPackage'
import { getAllRooms } from '../services/rooms'
import { getAllPackage } from '../services/package'

type Room = {
  _id: string; type: string; price: string; status: string;
  pax: number; bedType: string; amenities: []; image: string; count: number;
}

type Package = {
  _id: string; name: string; price: string; tagline: string;
  status: string; features: []; image: string; count: number;
}

export default function AdminPanel() {
  const [adminSubTab, setAdminSubTab] = useState("rooms");
  

  const [showAddRoomPopup, setShowAddRoomPopup] = useState(false);
  const [showAddPackagePopup, setShowAddPackagePopup] = useState(false);

  const [roomsData, setRoomsData] = useState<Room[]>([]);
  const [packagesData, setPackagesData] = useState<Package[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const [roomRes, pkgRes] = await Promise.all([getAllRooms(), getAllPackage()]);
    setRoomsData(roomRes.data);
    setPackagesData(pkgRes.data);
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left m-5">
      
      {/* 1. Sub Navigation */}
      <div className="flex bg-slate-100 p-1.5 rounded-[24px] max-w-md">
        {['rooms', 'packages'].map(tab => (
          <button 
            key={tab} 
            onClick={() => setAdminSubTab(tab)}
            className={`w-full py-3 rounded-[18px] font-black text-xs transition-all capitalize tracking-widest ${
              adminSubTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Manage {tab}
          </button>
        ))}
      </div>

      <div className="grid gap-6">
        <h3 className="font-black text-slate-800 uppercase tracking-tighter text-xl italic">
          Current {adminSubTab} Inventory
        </h3>

        {/* 2. Inventory Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          
          <div
            onClick={() => adminSubTab === 'rooms' ? setShowAddRoomPopup(true) : setShowAddPackagePopup(true)}
            className="border-4 border-dashed border-slate-200 rounded-[40px] flex flex-col items-center justify-center p-12 hover:bg-blue-50/50 hover:border-blue-400 transition-all cursor-pointer group min-h-[350px]"
          >
            <div className="p-4 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
              <PlusCircle className="text-slate-300 group-hover:text-blue-500" size={32} />
            </div>
            <span className="text-xs font-black text-slate-400 mt-4 uppercase tracking-[2px] group-hover:text-blue-600">
              Add New {adminSubTab === 'rooms' ? 'Room' : 'Package'}
            </span>
          </div>

          {/* Listing Items */}
          {adminSubTab === 'rooms' ? 
            roomsData.map(r => (
              <RoomCard key={r._id} isAdmin room={{...r, id: r._id}} />
            )) :
            packagesData.map(p => (
              <PackageCard key={p._id} isAdmin pkg={{...p, id: p._id}} />
            ))
          }
        </div>
      </div>

      
      {showAddRoomPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">Create New Room</h2>
                <button onClick={() => setShowAddRoomPopup(false)} className="p-2 bg-slate-50 rounded-full hover:bg-rose-100 hover:text-rose-500 transition">
                  <X size={20} />
                </button>
              </div>
              <AddRooms onSuccess={() => { setShowAddRoomPopup(false); fetchData(); }} />
            </div>
          </div>
        </div>
      )}

      
      {showAddPackagePopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative animate-in zoom-in-95 duration-300">
            <div className="p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">Create New Package</h2>
                <button onClick={() => setShowAddPackagePopup(false)} className="p-2 bg-slate-50 rounded-full hover:bg-rose-100 hover:text-rose-500 transition">
                  <X size={20} />
                </button>
              </div>
              <AddPackage onSuccess={() => { setShowAddPackagePopup(false); fetchData(); }} />
            </div>
          </div>
        </div>
      )}

    </div>
  )
}