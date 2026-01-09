import {
  CheckCircle,
  CheckCircle2,
  Edit3,
  Trash2,
  XCircle,
  Calendar,
  X
} from "lucide-react";
import { bookPackage } from "../services/booking";
import { deletePackage } from "../services/package"; // Delete service එක import කරගන්න
import { useState } from "react";
import AddPackage from "./AddPackage"; // Update කිරීමට පාවිච්චි කරන පෝරමය

type PKGProps = {
  pkg: {
    id: string;
    status: string;
    image: string;
    name: string;
    price: string;
    tagline: string;
    features: string[];
    count: number;
  };
  isAdmin?: boolean;
};

const PackageCard = ({ pkg, isAdmin = false }: PKGProps) => {
  const isAvailable = pkg.status === "AVAILABLE";
  
  
  const [showBookingPopup, setShowBookingPopup] = useState(false);
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  
  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this package?")) {
      const res = await deletePackage(pkg.id);
      if (res.isDelete) {
        alert("Package deleted successfully");
        window.location.reload();
      }
    }
  };

  
  const handleConfirmBooking = async () => {
    if (!selectedDate) return alert("Please select a date first!");
    
    const res = await bookPackage(pkg.id, selectedDate);
    if (res.isBooked) {
      alert(`Package booked for ${selectedDate}`);
      setShowBookingPopup(false);
      setSelectedDate("");
      window.location.reload();
    }
  };

  return (
    <div className="relative group bg-white rounded-[32px] shadow-sm border border-slate-100 overflow-hidden transition-all hover:shadow-xl">
      
      
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <img
          src={pkg.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"}
          alt={pkg.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        
        <div className={`absolute top-4 right-4 z-10 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center shadow-sm backdrop-blur-md ${
            isAvailable ? 'bg-emerald-500/90 text-white' : 'bg-rose-500/90 text-white'
        }`}>
          {isAvailable ? <CheckCircle2 size={12} className="mr-1" /> : <XCircle size={12} className="mr-1" />}
          {pkg.status}
        </div>

        
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

      
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-black text-slate-800 tracking-tight leading-tight uppercase italic italic">
              {pkg.name}
            </h3>
            <p className="text-xs text-slate-400 font-medium mt-1">
              {pkg.tagline}
            </p>
          </div>
          <div className="text-right">
            <span className="block font-black text-blue-600 text-lg italic leading-none">
              LKR {pkg.price}
            </span>
            <span className="text-[9px] text-slate-400 uppercase font-black tracking-tighter">
              {pkg.count} Available
            </span>
          </div>
        </div>

        <div className="h-px bg-slate-50 my-4" />

        
        <div className="mb-6">
          <p className="text-[10px] font-black text-slate-300 uppercase tracking-[2px] mb-3">
            What's Included
          </p>
          <div className="grid grid-cols-1 gap-2">
            {pkg.features.map((feature, i) => (
              <div key={i} className="flex items-center text-[11px] font-bold text-slate-600 bg-slate-50/50 p-2 rounded-xl border border-slate-50">
                <CheckCircle size={14} className="text-emerald-500 mr-2 shrink-0" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        
        <button
          disabled={!isAvailable || pkg.count <= 0}
          onClick={() => setShowBookingPopup(true)}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
            isAvailable && pkg.count > 0
              ? "bg-slate-900 text-white hover:bg-blue-600 shadow-lg shadow-blue-200"
              : "bg-slate-100 text-slate-300 cursor-not-allowed"
          }`}
        >
          {isAvailable && pkg.count > 0 ? "Book Package" : "Sold Out"}
        </button>
      </div>

      
      {showEditPopup && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-900/60 backdrop-blur-md p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-lg rounded-[40px] shadow-2xl relative animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6 border-b pb-4">
                <h2 className="text-xl font-black uppercase italic tracking-tighter text-slate-800">Update Package</h2>
                <button onClick={() => setShowEditPopup(false)} className="p-2 bg-slate-50 rounded-full hover:bg-rose-100 hover:text-rose-500 transition">
                  <X size={20} />
                </button>
              </div>
              
              <AddPackage 
                isUpdate={true} 
                existingData={pkg} 
                onSuccess={() => {
                  setShowEditPopup(false);
                  window.location.reload(); 
                }}
              />
            </div>
          </div>
        </div>
      )}

      
      {showBookingPopup && (
        <div className="fixed inset-0 z-[1000] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-300">
          <div className="bg-white p-8 rounded-[40px] w-full max-w-sm shadow-2xl relative animate-in zoom-in-95 duration-300">
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
              className="w-full p-4 border border-slate-100 bg-slate-50 rounded-2xl mb-6 focus:ring-4 focus:ring-blue-500/10 outline-none font-bold text-slate-700"
            />

            <div className="flex gap-3">
              <button onClick={() => setShowBookingPopup(false)} className="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-500 font-bold text-[10px] uppercase tracking-widest">Cancel</button>
              <button onClick={handleConfirmBooking} className="flex-1 py-4 rounded-2xl bg-blue-600 text-white font-bold text-[10px] uppercase tracking-widest shadow-lg shadow-blue-200">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackageCard;