import {
  Users,
  Wind,
  Wifi,
  CheckCircle2,
  XCircle,
  Bed,
  Edit3,
  Trash2,
  Calendar,
  X
} from "lucide-react";
import { deleteRoom } from "../services/rooms";
import { useState } from "react";
import { bookRoom } from "../services/booking";
import AddRooms from "./AddRoom"; // ඔබේ පෝරමය (Form)

type RoomProps = {
  room: {
    id: string;
    status: string;
    image: string;
    type: string;
    price: string;
    pax: number;
    bedType: string;
    amenities: string[];
    count: number;
  };
  isAdmin?: boolean;
};

const RoomCard = ({ room, isAdmin = false }: RoomProps) => {
  const isAvailable = room.status === "AVAILABLE";
  
  // ✅ UI States
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // 🗑️ Delete Logic
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this room?")) {
      const res = await deleteRoom(room.id);
      if (res.isDelete) {
        alert(res.message);
        window.location.reload();
      } else {
        alert("DELETE FAIL");
      }
    }
  };

  // 📅 Booking Logic
  const handleConfirmBooking = async () => {
    if (!selectedDate) return alert("Please select a date first!");
    const res = await bookRoom(room.id, selectedDate);
    if (res.isBooked) {
      alert(`Room booked for ${selectedDate}`);
      setShowBookingPopup(false);
      setSelectedDate("");
      window.location.reload();
    }
  };

  return (
    <div className="relative group bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-xl">
      
      {/* 1. Image Section & Badges */}
      <div className="relative h-56 overflow-hidden">
        <img 
          src={room.image} 
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500" 
          alt={room.type} 
        />
        
        {/* Availability Badge */}
        <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center shadow-sm backdrop-blur-md ${
            isAvailable ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
        }`}>
          {isAvailable ? <CheckCircle2 size={12} className="mr-1" /> : <XCircle size={12} className="mr-1" />}
          {room.status}
        </div>

        {/* ✅ ADMIN OVERLAY (Visible on Hover) */}
        {isAdmin && (
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 gap-4">
            <button 
              onClick={() => setShowEditPopup(true)} 
              className="bg-white p-4 rounded-2xl text-blue-600 hover:bg-blue-600 hover:text-white transform hover:-translate-y-1 transition-all shadow-xl"
            >
              <Edit3 size={20} />
            </button>
            <button 
              onClick={handleDelete} 
              className="bg-white p-4 rounded-2xl text-red-600 hover:bg-red-600 hover:text-white transform hover:-translate-y-1 transition-all shadow-xl"
            >
              <Trash2 size={20} />
            </button>
          </div>
        )}
      </div>

      {/* 2. Content Section */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-bold text-lg text-slate-800 tracking-tight leading-tight">{room.type}</h3>
            <div className="flex gap-3 text-[11px] text-slate-400 mt-1 font-bold uppercase tracking-tighter">
              <span className="flex items-center gap-1"><Users size={14}/> {room.pax} Pax</span>
              <span className="flex items-center gap-1"><Bed size={14}/> {room.bedType}</span>
            </div>
          </div>
          <div className="text-right">
            <span className="block font-black text-blue-600 text-lg italic leading-none">LKR {room.price}</span>
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter">{room.count} Available</span>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {room.amenities.map((a, i) => (
            <span key={i} className="text-[9px] font-black uppercase bg-slate-50 text-slate-500 px-2.5 py-1 rounded-lg border border-slate-100 flex items-center gap-1">
              {a.toLowerCase().includes("ac") && <Wind size={10}/>}
              {a.toLowerCase().includes("wifi") && <Wifi size={10}/>}
              {a}
            </span>
          ))}
        </div>

        {/* Booking Button */}
        <button
          disabled={!isAvailable || room.count <= 0}
          onClick={() => setShowBookingPopup(true)}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
            isAvailable && room.count > 0
              ? "bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-blue-200"
              : "bg-slate-100 text-slate-300 cursor-not-allowed"
          }`}
        >
          {isAvailable && room.count > 0 ? "Reserve Now" : "Sold Out"}
        </button>
      </div>

      {/* 🚀 3. UPDATE POPUP OVERLAY */}
      {showEditPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">Update Room</h2>
                <button onClick={() => setShowEditPopup(false)} className="p-2 bg-slate-100 rounded-full hover:bg-rose-100 hover:text-rose-500 transition">
                  <X size={20} />
                </button>
              </div>
              
              <AddRooms 
                isUpdate={true} 
                existingData={room} 
                onSuccess={() => {
                  setShowEditPopup(false);
                  window.location.reload(); 
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 📅 4. BOOKING POPUP OVERLAY */}
      {showBookingPopup && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[40px] w-full max-w-sm shadow-2xl border border-slate-100 relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setShowBookingPopup(false)} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600">
              <X size={20} />
            </button>

            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Calendar size={20}/></div>
               <h2 className="text-xl font-black text-slate-800 uppercase italic tracking-tighter">Select Date</h2>
            </div>
            
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-4 border border-slate-100 bg-slate-50 rounded-2xl mb-6 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-slate-700 transition"
            />

            <div className="flex gap-3">
              <button onClick={() => setShowBookingPopup(false)} className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition">Cancel</button>
              <button onClick={handleConfirmBooking} className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-bold text-[10px] uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-blue-200 transition">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomCard;