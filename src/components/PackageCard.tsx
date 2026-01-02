import {
  CheckCircle,
  CheckCircle2,
  Edit3,
  Trash2,
  XCircle
} from "lucide-react";

type PKG = {
  pkg:{
    status:string
    image: string
    name: string
    price: string
    tagline: string
    features:string[]

  }
  isAdmin?: boolean
}

const PackageCard = ({ pkg, isAdmin=false }:PKG) => {
  const isAvailable = pkg.status === "Available";

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
          className={`w-full py-3 rounded-xl font-bold text-sm transition ${
            isAvailable
              ? "bg-slate-900 text-white hover:bg-blue-600"
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
        >
          {isAvailable ? "Book Package" : "Sold Out"}
        </button>
      </div>
    </div>
  );
};

export default PackageCard;