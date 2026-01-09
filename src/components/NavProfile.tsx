import React, { useEffect, useRef, useState } from "react";
import { User, LogOut, Settings, Camera, MapPin, Phone, Globe, X, Save } from "lucide-react";
import { getProfile, saveProfile, updateImage } from "../services/profile";
import { getMyDetails } from "../services/auth";


const NavProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);

// 1. useRef එකක් සාදාගන්න
const fileRef = useRef<HTMLInputElement | null>(null);

const handleButtonClick = () => {
     console.log("click")

  fileRef.current?.click(); // බොත්තම එබූ විට file picker එක open කරයි
};

// ... ඔබේ handleFileChange function එක එලෙසම තබන්න

  const [userData, setUserData] = useState({
    profileId: "",
    
    phone: "+94 77 000 0000",
    address: "Sinharaja Forest Edge, Deniyaya",
    country: "Sri Lanka",
    image: "https://www.vecteezy.com/vector-art/24766958-default-male-avatar-profile-icon-social-media-user-vector"
  });

  const [user, setUser] = useState({
    name: "name",
    lastName:" ",
    email: "@gmail.com",
  })


  useEffect(() => {
    getMyData()
  },[])
  const getMyData = async () => {
    try {
      const me = await getMyDetails();

      setUser({
        name: me.data.firstName,
        lastName: me.data.lastName,
        email: me.data.email,
      })
      
      const res = await getProfile();

      setUserData({
        profileId: res.data.user,
        phone: res.data.phone || "",
        address: res.data.address || "",
        country: res.data.country || "",
        image: res.data.image || userData.image
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const signOut =()=>{
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("role")
    window.location.reload();
  }

  const updateData = async ()=>{
    const data ={
      
      address : userData.address,
      phone : userData.phone,
      country : userData.country

    }
    try {
      const res = await saveProfile(data)

      if(res.isSave){
        alert(res.message)
      }

    } catch (error) {
      alert("can't update profile or save details")
    }
    
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
   console.log("click")
  const file = e.target.files?.[0];
  if (!file) return;

  if(!userData.profileId){
    alert("First add other details")
  }

  const formData = new FormData();
  formData.append("image", file);
  try {
    const res = await updateImage(formData);
    
    if (res.isSave) {
      userData.image = res.image
      if(res.isSave){
        alert("Profile picture updated successfully!");
      }else{
      alert(res.message)
      }
    }
  } catch (error) {
    console.error("Update failed:", error);
    alert("Failed to update image.");
  }
};
  

  return (
    <div className="relative inline-block text-left font-sans">
      {/* Navbar Profile Trigger */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 p-1 pr-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all active:scale-95"
      >
        <img src={userData.image} alt="Profile" className="w-9 h-9 rounded-full object-cover border border-emerald-500/50" />
        <span className="hidden md:block text-sm font-bold text-white tracking-tight">{user.name}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)}></div>
          <div className="absolute right-0 mt-3 w-64 origin-top-right bg-[#111827] border border-white/10 rounded-3xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className=" p-5 border-b border-white/5 bg-gradient-to-br from-emerald-500/10 to-transparent">
              <div className=" flex items-center">
                <img src={userData.image} alt="Profile" className="w-9 h-9 rounded-full object-cover border border-emerald-500/50" />
                <span className="m-2 hidden md:block text-sm font-bold text-white tracking-tight">{user.name}</span>
                </div>
                <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </div>
            
            <div className="p-2">
              <button 
                onClick={() => { setShowModal(true); setIsOpen(false); }}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-slate-300 hover:bg-white/5 hover:text-white transition-all text-sm font-bold"
              >
                <Settings size={18} className="text-emerald-500" /> Account Settings
              </button>
              
              <button onClick={signOut}
                className="w-full flex items-center gap-3 p-3 rounded-2xl text-rose-400 hover:bg-rose-500/10 transition-all text-sm font-bold mt-1">
                <LogOut size={18} /> Sign Out
              </button>
            </div>
          </div>
        </>
      )}

      {/* Edit Profile Modal */}
      {showModal && (
        <div className="fixed top-82 inset-0 z-[100] flex items-center justify-self-end p-4 backdrop-blur-md bg-black/60 animate-in fade-in duration-300">
          <div className="bg-[#111827] w-full max-w-lg rounded-[40px] border border-white/10 shadow-2xl overflow-hidden relative">
            
            {/* Modal Header */}
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-gradient-to-r from-emerald-900/20 to-transparent">
              <h3 className="text-xl font-black text-white uppercase italic tracking-tighter">Update Profile</h3>
              <button onClick={() => setShowModal(false)} className="p-2 rounded-full hover:bg-white/10 text-slate-400 transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body (Scrollable if needed) */}
            <div className="p-8 space-y-6">
              {/* Profile Image Edit */}
              <div className="flex flex-col items-center mb-6">
                <div className="relative group">
                   <img src={userData.image} className="w-24 h-24 rounded-[30px] border-4 border-emerald-500/20 object-cover" alt="Edit" />
                   <button onClick={handleButtonClick} className="absolute inset-0 bg-black/40 rounded-[30px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} className="text-white" />
                   </button>
                </div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-3">Change Avatar</p>
                <input
                  ref={fileRef}
                  type="file"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-emerald-500/50" size={16} />
                    <input type="text" 
                    value={`${user.name} ${user.lastName}`} 
                    readOnly 
                    className="w-full p-3.5 pl-11 bg-slate-900/50 border border-white/10 rounded-2xl text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Contact Dial</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-3.5 text-emerald-500/50" size={16} />
                    <input type="text" value={userData.phone} onChange={(e) => setUserData({...userData, phone: e.target.value})} className="w-full p-3.5 pl-11 bg-slate-900/50 border border-white/10 rounded-2xl text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Residency Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-emerald-500/50" size={16} />
                    <input type="text" value={userData.address} onChange={(e) => setUserData({...userData, address: e.target.value})} className="w-full p-3.5 pl-11 bg-slate-900/50 border border-white/10 rounded-2xl text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>

                <div className="space-y-1 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-1">Country / Region</label>
                  <div className="relative">
                    <Globe className="absolute left-4 top-3.5 text-emerald-500/50" size={16} />
                    <input type="text" value={userData.country} onChange={(e) => setUserData({...userData, country: e.target.value})} className="w-full p-3.5 pl-11 bg-slate-900/50 border border-white/10 rounded-2xl text-white text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-8 bg-slate-900/30 border-t border-white/5 flex gap-4">
               <button onClick={() => setShowModal(false)} className="flex-1 py-4 rounded-2xl font-bold text-xs uppercase tracking-widest text-slate-400 hover:bg-white/5 transition-all">Cancel</button>
               <button onClick={() =>{
                updateData()
                setShowModal(false)
                
              }} 
                className="flex-1 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-2xl font-black text-xs uppercase tracking-[3px] text-white shadow-xl shadow-emerald-900/20 flex items-center justify-center gap-2">
                 <Save size={16} /> Update Details
               </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
};

export default NavProfile;