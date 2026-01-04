import {
  CheckCircle,
  CheckCircle2,
  Edit3,
  Trash2,
  XCircle
} from "lucide-react";
import { bookPackage } from "../services/booking";
import { useState } from "react";

type PKG = {
  pkg:{
    id: string
    status:string
    image: string
    name: string
    price: string
    tagline: string
    features:string[]
    count:number

  }
  isAdmin?: boolean
}

const PackageCard = ({ pkg, isAdmin=false }:PKG) => {
  const isAvailable = pkg.status === "AVAILABLE";
   const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState("");

  const handelBooking = async ()=>{
    console.log(pkg.id)

    if(!pkg.id){
      alert("can't book")
    }
    
    if(pkg.count <= 0){
      alert("All Rooms are book")
    }
   setShowModal(true); // open modal
  }

  const handleConfirmBooking = async () => {
    if(!selectedDate) {
      alert("Please select a date first!");
      return;
    }
    const res = await bookPackage(pkg.id,selectedDate)

    if(res.isBooked){
      console.log("Booking room:", pkg.id, "for date:", selectedDate);
      alert(`Room booked for ${selectedDate}`);
      setShowModal(false);
      setSelectedDate("");
    }
  }

  return (
    <div className="relative group bg-white rounded-2xl shadow border overflow-hidden m-8">
      
      {/* Header Image */}
      <div className="h-40 bg-slate-200 relative">
        <img
          src={pkg.image || "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=800"}
          alt={pkg.name}
          className="w-full h-full object-cover"
        />

        {/* Status Badge */}
        <div
          className={`absolute top-4 right-4 px-3 py-1 text-xs rounded-full text-white flex items-center gap-1 ${
            isAvailable ? "bg-emerald-500" : "bg-rose-500"
          }`}
        >
          {isAvailable ? <CheckCircle2 size={14} /> : <XCircle size={14} />}
          {pkg.status}
        </div>
      </div>

      {/* ✅ ADMIN ONLY OVERLAY */}
        {isAdmin && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity gap-3">
            <button className="bg-white p-2.5 rounded-full text-blue-600 hover:scale-110 transition">
              <Edit3 size={16} />
            </button>
            <button className="bg-white p-2.5 rounded-full text-red-600 hover:scale-110 transition">
              <Trash2 size={16} />
            </button>
          </div>
        )}


      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800">
            {pkg.name}
          </h3>
          <div className="text-right">
            <span className="text-xl font-black text-blue-600">
              LKR {pkg.price}
            </span>
            <p className="text-[10px] text-slate-400 font-bold uppercase">
              Per Person
            </p>
          </div>
        </div>

        <p className="text-sm text-slate-500 mb-4">
          {pkg.tagline}
        </p>

        <hr className="border-slate-100 mb-4" />

        {/* Features */}
        <div className="mb-6">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">
            Included
          </p>
          <div className="space-y-2">
            {pkg.features.map((feature, i) => (
              <div
                key={i}
                className="flex items-center text-sm text-slate-600"
              >
                <CheckCircle size={14} className="text-emerald-500 mr-2" />
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Action Button */}
        <button
          disabled={!isAvailable}
          onClick={handelBooking}
          className={`w-full py-3 rounded-xl font-bold text-sm transition ${
            isAvailable
              ? "bg-slate-900 text-white hover:bg-blue-600"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Book Package" : "Sold Out"}
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

export default PackageCard;