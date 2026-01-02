import React, { useState } from "react";
import { 
  User, Shield, Lock, Bell, Camera, 
  Mail, MapPin, Globe, PenLine, ChevronRight,
  Fingerprint, Sparkles, UserRoundPlusIcon
} from "lucide-react";
import AddAuthor from "./AddAuthor";
import EditBioData from "./EditBioData";

const ProfileComponent = () => {
  const [activeSubTab, setActiveSubTab] = useState("personal");

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-700 text-left m-10 ">
      
      {/* 1. Profile Hero Banner */}
      <div className="bg-[#111827] backdrop-blur-md rounded-[45px] p-8 border border-white/5 mb-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-emerald-500/10 transition-all duration-700" />
        
        <div className="relative">
          <div className="w-32 h-32 rounded-[35px] bg-gradient-to-br from-emerald-500 to-teal-700 p-1">
            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200" 
              className="w-full h-full object-cover rounded-[32px] border-4 border-[#0B0F17]" 
              alt="User" 
            />
          </div>
          <button className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2.5 rounded-2xl shadow-xl hover:scale-110 transition-transform border-4 border-[#111827]">
            <Camera size={16} />
          </button>
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Janith Perera</h2>
            <span className="w-fit mx-auto md:mx-0 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              Gold Member
            </span>
          </div>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-slate-500 text-sm font-bold">
             <span className="flex items-center gap-2"><Mail size={14} className="text-emerald-500" /> janith.royal@heritage.com</span>
             <span className="flex items-center gap-2"><MapPin size={14} className="text-emerald-500" /> Sinharaja, Sri Lanka</span>
          </div>
        </div>

        
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* 2. Side Navigation Menu */}
        <div className="lg:col-span-1 space-y-3">
          {[
            { id: "personal", label: "Identity", icon: User },
            { id: "security", label: "ADD Author", icon: UserRoundPlusIcon },
            // { id: "notifications", label: "Alerts", icon: Bell },
            // { id: "preferences", label: "Experience", icon: Sparkles },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSubTab(item.id)}
              className={`w-full flex items-center justify-between p-5 rounded-[28px] transition-all duration-300 ${
                activeSubTab === item.id 
                ? "bg-emerald-600 text-white shadow-2xl shadow-emerald-900/20 translate-x-2" 
                : "bg-[#111827] text-slate-500 border border-white/5 hover:text-slate-200"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon size={18} strokeWidth={activeSubTab === item.id ? 2.5 : 2} />
                <span className="font-bold text-xs uppercase tracking-widest">{item.label}</span>
              </div>
              <ChevronRight size={16} className={activeSubTab === item.id ? "opacity-100" : "opacity-0"} />
            </button>
          ))}
        </div>

        {/* 3. Main Content Card */}
        <div className="lg:col-span-3">
          <div className="bg-[#111827] backdrop-blur-xl p-10 rounded-[45px] border border-white/5 shadow-2xl relative overflow-hidden h-full">
            
            <div className="flex items-center justify-between mb-10">
              <div>
                <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">
                  {activeSubTab === "personal" && "Identity & Bio"}
                  {activeSubTab === "security" && "Security Vault"}
                  {/* {activeSubTab === "notifications" && "Notification Center"} */}
                  {/* {activeSubTab === "preferences" && "Heritage Preferences"} */}
                </h3>
                <div className="h-1 w-12 bg-emerald-500 rounded-full mt-1" />
              </div>
              
            </div>

            {activeSubTab === "personal" &&(
              <EditBioData/>
              
            )}

            {activeSubTab === "security" &&(
              <AddAuthor/>
            )}

          </div>
        </div>

      </div>
    </div>
  );
};

export default ProfileComponent;