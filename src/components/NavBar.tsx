import { useEffect, useState } from "react";
import logo from "../assets/photos/logo.png"
import {Link} from "react-router-dom"
import { useNavigate } from "react-router-dom";
import NavProfile from "./NavProfile";
import { getProfile } from "../services/profile";
// import logo from "../assets/photos/logo.png"; // Oyaage logo path eka hariyata thiyaganna

export default  function Header() {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");
    setIsLoggedIn(loggedIn === "true");
    
     
  }, []);

  

  

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/About" },
    { name: "Gallery", path: "/gallery" },
    { name: "Contact", path: "/contact" },
  ];


  return (
    // Updated: Background eka Dark Green/Forest theme ekata haduwa
    <nav className=" absolute  left-1/2 -translate-x-1/2 z-50 flex items-center justify-between w-full md:w-full px-5 md:px-16 py-4 max-w-7xl mx-auto 
        border-b-3 border-[#b6b6b6]">

      {/* LOGO */}
      <a href="/" className="flex items-center gap-2 group ">
        <div className=" p-2  transition-colors group-hover:bg-300 ">
            {/* Logo placeholder - replace with your <img> tag */ <img src={logo} className="w-10 h-auto scale-250"></img>}
            {/* <div className="w-8 h-8 bg-emerald-500 rounded-full blur-[2px] animate-pulse"></div> */}
        </div>
        <span className="hidden sm:block text-white font-semibold tracking-widest uppercase text-sm italic">
          Rainforest Royal <br></br> Heritage Cabin
        </span>
      </a>

      {/* DESKTOP MENU - Updated hover colors to Green tones */}
      <div className="hidden md:flex items-center gap-10 text-white/90 font-bold text-lg tracking-wide">
        {menuItems.map((item) => (
          <Link
            key={item.name}  
            to={item.path}
            className="relative after:absolute after:-bottom-1 after:left-0  after:w-0
              after:bg-emerald-400 after:transition-all after:duration-300
              hover:after:w-full hover:text-emerald-300 transition-colors"
          >
            {item.name}
          </Link>
        ))}
      </div>

      

      
         
<div className="hidden md:flex items-center gap-6">
  {isLoggedIn ? (
    <NavProfile /> 
  ) : (
    
    <button
      className="text-white/80 hover:text-white transition font-bold text-lg cursor-pointer"
      onClick={() => navigate("/LogIn")}
    >
      Login
    </button>
  )}

  <button 
    className="px-7 py-2.5 rounded-full bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-500 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)] transition-all active:scale-95 cursor-pointer"
    onClick={() => navigate("/Dashboard")}
  >
    Book Now
  </button>
</div>

      
      <div
        className={`fixed inset-0 z-50 md:hidden transition-all duration-500
        ${menuOpen ? "bg-black backdrop-blur-xl opacity-100 visible" : "opacity-0 invisible"}`}
        onClick={() => setMenuOpen(false)}
      >
        <div
          className={`absolute top-0 right-0 h-full w-4/5 max-w-sm
            bg-black
            p-8 shadow-2xl transition-transform duration-500 ease-out
            ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* MOBILE HEADER */}
          <div className="flex justify-between items-center mb-12 bg-black">
            <span className="bg-black text-white font-bold tracking-widest uppercase">Rainforest</span>
            <button onClick={() => setMenuOpen(false)} className="text-white/60 hover:text-white">
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

         

          
        </div>
      </div>
    </nav>
  );
}