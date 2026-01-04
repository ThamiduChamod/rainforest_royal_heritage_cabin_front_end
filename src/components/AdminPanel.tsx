import { Edit3, PlusCircle, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import RoomCard from './RoomCard'
import PackageCard from './PackageCard'
import Modal from './Modal'
import AddRooms from './AddRooms'
import AddPackage from './AddPackage'
import { getAllRooms } from '../services/rooms'
import { getAllPackage } from '../services/package'


type Room = {
  _id: string
  type: string
  price: string
  status: string
  pax: number
  bedType: string
  amenities: []
  image: string
  count: number

}
type Package = {
  _id: string
  name: string
  price: string
  tagline: string
  status: string
  features: []
  image: string
  count: number

}



export default function AdminPanel() {

  const [adminSubTab, setAdminSubTab] = useState("rooms"); // 'rooms' or 'packages'

    const [openRoomModal, setOpenRoomModal] = useState(false)
    const [openPackageModal, setOpenPackageModal] = useState(false)

    const [roomsData, setRoomsData] = useState<Room[]>([])
    const [packagesData, setPackagesData] = useState<Package[]>([])
        
        
    
    useEffect(() => {
        
      setRoomData()
      setPackageData()
    
    
    }, []);

    const setRoomData = async () =>{
      const res =await getAllRooms()
      setRoomsData(res.data)  
    }
    const setPackageData = async () =>{
      const res = await getAllPackage()
      setPackagesData(res.data)
    }

    const handleAddClick = () => {
      if (adminSubTab === "rooms") {
        setOpenRoomModal(true)
      } else {
        setOpenPackageModal(true)
      }
    }

  //   const roomsData = [
  //   { id: 1,  type: "Deluxe Ocean View", price: "12,500", status: "Available", pax: 2, bedType: "King Size", amenities: ["A/C", "WiFi"], image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=500" },
  //   { id: 2, type: "Standard Double", price: "8,000", status: "Booked", pax: 2, bedType: "Double Bed", amenities: ["A/C"], image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=500" },
  //   { id: 1, type: "Deluxe Ocean View", price: "12,500", status: "Available", pax: 2, bedType: "King Size", amenities: ["A/C", "WiFi"], image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=500" },
  // ];

  // const packagesData = [
  //   { id: 1, name: "Classic Day Outing", price: "3,500", tagline: "Perfect for family", status: "Available", features: ["Lunch Buffet", "Pool Access"], image: "https://images.unsplash.com/photo-1501117716987-c8e1ecb210e7?q=80&w=800" },
  // ];


  return (
    <div className="space-y-8 animate-in fade-in duration-500 text-left m-5">
              {/* Sub Navigation */}
              <div className="flex bg-slate-100 p-1.5 rounded-2xl ">
                {['rooms', 'packages'].map(tab => (
                  <button key={tab} onClick={() => setAdminSubTab(tab)}
                    className={`w-full py-2.5 rounded-xl font-bold text-sm transition-all capitalize ${adminSubTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>
                    Manage {tab}
                  </button>
                ))}
              </div>

              <div className="grid gap-10">
                

                {/* Inventory Grid */}
                <div className="xl:col-span-2 space-y-6">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-slate-800 uppercase tracking-tighter">Current {adminSubTab} Inventory</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {adminSubTab === 'rooms' ? 
                      roomsData.map(r => <RoomCard key={r._id} room={{
                        id:r._id,
                        status:r.status,
                        image: r.image,
                        type: r.type,
                        price: r.price,
                        pax: r.pax,
                        bedType: r.bedType,
                        amenities: r.amenities,
                        count:r.count
                        
                      }
                    }isAdmin/>) :
                      packagesData.map(p => <PackageCard key={p._id} pkg={{
                        status: p.status,
                        image: p.image,
                        name: p.name,
                        price: p.price,
                        tagline: p.tagline,
                        features: p.features
                      }}isAdmin />)
                    }
                    <div
                      onClick={handleAddClick}
                      className="border-2 border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center p-12 hover:bg-white hover:border-blue-400 transition-all cursor-pointer group"
                    >
                      <PlusCircle className="text-slate-300 group-hover:text-blue-500" size={24} />
                        <span className="text-xs font-bold text-slate-400 mt-2">
                          Add New Slot
                        </span>
                    </div>

                    <Modal
                        open={openRoomModal}
                        onClose={() => setOpenRoomModal(false)}
                        title="Add New Room"
                      >
                        <AddRooms />
                    </Modal>

                    <Modal
                        open={openPackageModal}
                        onClose={() => setOpenPackageModal(false)}
                        title="Add New Package"
                      >
                        <AddPackage />
                    </Modal>

 
                  </div>
                </div>
              </div>
            </div>
  )
}
