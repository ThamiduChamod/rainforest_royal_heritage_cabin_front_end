import {
  LayoutDashboard,
  BedDouble,
  Gift,
  Users,
  CheckCircle,
  ChevronRight,
  Wind,
  Wifi,
  CheckCircle2,
  XCircle,
  Bed,
  Edit3,
  Trash2
} from "lucide-react";
import { deleteRoom } from "../services/rooms";
import { useState } from "react";
import { bookRoom } from "../services/booking";

type Room = {
  room:{
    id: string
    status: string
    image: string
    type: string
    price: string
    pax:number
    bedType: string
    amenities: string[]
    count:number

  }
  isAdmin?: boolean
}
const RoomCard = ({ room,isAdmin = false  }: Room) => {
  const isAvailable = room.status === "AVAILABLE";

   // ✅ modal state
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  
  


const handelEdit = async ()=>{
  console.log("room iD =",room.id)
}
const handelDelete = async ()=>{
  console.log("room iD =",room.id)
  const res = await deleteRoom(room.id)

  console.log(res)
  if(res.isDelete){
    alert(res.message)
  }else{
    alert("DELETE FAIL")
  }
}

const handelBooking = async () =>{
  console.log(room.id)
  if(room.count <= 0){
    alert("All Rooms are book")
  }
   setShowModal(true); // open modal

}

 const handleConfirmBooking = async () => {
    if(!selectedDate) {
      alert("Please select a date first!");
      return;
    }
    
    const res =  await bookRoom(room.id,selectedDate )

    if(res.isBooked){
      console.log("Booking room:", room.id, "for date:", selectedDate);
    alert(`Room booked for ${selectedDate}`);
    setShowModal(false);
    setSelectedDate("");
    }
    
  };

  return (
    <div className="relative group bg-white rounded-2xl shadow border overflow-hidden m-8">
      <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider flex items-center shadow-sm ${
              room.status === 'Available' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              {room.status === 'Available' ? <CheckCircle2 size={12} className="mr-1" /> : <XCircle size={12} className="mr-1" />}
              {room.status}
      </div>
      
      <img src={room.image} className="h-48 w-full object-cover" />

      {/* ✅ ADMIN ONLY OVERLAY */}
        {isAdmin && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
            <button onClick={handelEdit} className="bg-white p-2.5 rounded-full text-blue-600 hover:scale-110 transition">
              <Edit3 size={16} />
            </button>
            <button onClick={handelDelete} className="bg-white p-2.5 rounded-full text-red-600 hover:scale-110 transition">
              <Trash2 size={16} />
            </button>
          </div>
        )}

      <div className="p-5">
        <div className="flex justify-between mb-2">
          <h3 className="font-bold">{room.type}</h3>
          <span className="font-black text-blue-600">LKR {room.price}</span>
        </div>

        <div className="flex gap-4 text-sm text-slate-500 mb-4">
          <span className="flex items-center gap-1"><Users size={14}/> {room.pax}</span>
          <span className="flex items-center gap-1"><Bed size={14}/> {room.bedType}</span>
        </div>

        <div className="flex gap-2 mb-5 flex-wrap">
          {room.amenities.map((a, i) => (
            <span key={i} className="text-xs bg-slate-100 px-2 py-1 rounded flex items-center gap-1">
              {a === "AC" && <Wind size={12}/>}
              {a === "WiFi" && <Wifi size={12}/>}
              {a}
            </span>
          ))}
        </div>

        

        <button
          disabled={!isAvailable}
          onClick={handelBooking}
          className={`w-full py-3 rounded-xl font-bold ${
            isAvailable
              ? "bg-slate-900 text-white hover:bg-blue-600"
              : "bg-slate-200 text-slate-400"
          }`}
        >
          {isAvailable ? "Book This Room" : "Sold Out"}
        </button>
        {/* ✅ Modal */}
          {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-2xl w-80 shadow-2xl transform transition-all duration-300 scale-100">
                <h2 className="text-xl font-bold mb-4 text-gray-800">Select Booking Date</h2>
                
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full p-3 border border-gray-300 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                />

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleConfirmBooking}
                    className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          )}


      </div>
    </div>
  );
};

export default RoomCard;