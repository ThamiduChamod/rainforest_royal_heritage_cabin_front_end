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

type Room = {
  room:{
    status: string
    image: string
    type: string
    price: string
    pax:number
    bedType: string
    amenities: string[]

  }
  isAdmin?: boolean
}
const RoomCard = ({ room,isAdmin = false  }: Room) => {
  const isAvailable = room.status === "Available";

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
            <button className="bg-white p-2.5 rounded-full text-blue-600 hover:scale-110 transition">
              <Edit3 size={16} />
            </button>
            <button className="bg-white p-2.5 rounded-full text-red-600 hover:scale-110 transition">
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
              {a === "A/C" && <Wind size={12}/>}
              {a === "WiFi" && <Wifi size={12}/>}
              {a}
            </span>
          ))}
        </div>

        

        <button
          disabled={!isAvailable}
          className={`w-full py-3 rounded-xl font-bold ${
            isAvailable
              ? "bg-slate-900 text-white hover:bg-blue-600"
              : "bg-slate-200 text-slate-400"
          }`}
        >
          {isAvailable ? "Book This Room" : "Sold Out"}
        </button>
      </div>

      
    </div>
  );
};

export default RoomCard;