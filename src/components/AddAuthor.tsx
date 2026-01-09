import { UserPlus, Mail, KeyRound, ShieldCheck, UserCheck, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // ආපසු යාමට අවශ්‍ය නම්
import { sendOTP, verifyOTP } from "../services/auth";
import { authorRegister } from "../services/admin";

export default function AddAuthor() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async () => {
    if (!form.email) return alert("Please enter an email address first.");
    setLoading(true);
    try {
      const res = await sendOTP(form.email);
      alert(res.message);
    } catch (err) {
      alert("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) return alert("Please enter the OTP");
    try {
      const res = await verifyOTP(form.email, otp);
      if (res.isValid) {
        setOtpVerified(true);
        alert(res.message);
      } else {
        alert(res.message);
      }
    } catch (err) {
      alert("OTP Verification failed");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify your email via OTP first.");

    try {
      const res = await authorRegister(form);
      alert(res.message || "Author registered successfully!");
      // සාර්ථක වූ පසු Dashboard එකට යන්න
      navigate("/Dashboard");
    } catch (error) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 animate-in fade-in duration-700">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="mb-6 self-start md:ml-[25%] flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-all font-bold text-sm uppercase tracking-widest"
      >
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="w-full max-w-2xl bg-white rounded-[40px] shadow-2xl shadow-blue-900/5 border border-slate-100 overflow-hidden">
        
        {/* Header Decor */}
        {/* <div className="bg-slate-900 p-10 text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
          <div className="relative z-10 flex items-center gap-4">
            <div className="p-3 bg-blue-600 rounded-2xl">
              <UserPlus size={28} />
            </div>
            <div>
              <h1 className="text-2xl font-black uppercase italic tracking-tighter">Author Registration</h1>
              <p className="text-slate-400 text-xs font-medium uppercase tracking-[2px]">Onboard new content creator</p>
            </div>
          </div>
        </div> */}

        <div className="p-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                <div className="relative group">
                  <UserPlus className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    name="firstName"
                    onChange={handleChange}
                    placeholder="Ex: John"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                <div className="relative group">
                  <UserPlus className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    name="lastName"
                    onChange={handleChange}
                    placeholder="Ex: Doe"
                    className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email with OTP Action */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Work Email</label>
              <div className="relative flex gap-3">
                <div className="relative flex-grow group">
                  <Mail className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    disabled={otpVerified}
                    placeholder="author@hotel.com"
                    className={`w-full pl-12 pr-4 py-3.5 rounded-2xl border transition-all font-medium outline-none
                      ${otpVerified 
                        ? "bg-emerald-50 border-emerald-200 text-emerald-700 cursor-not-allowed" 
                        : "bg-slate-50/50 border-slate-100 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500"
                      }`}
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  disabled={otpVerified || loading}
                  className={`px-6 rounded-2xl font-black text-[10px] uppercase tracking-wider transition-all active:scale-95
                    ${otpVerified 
                      ? "bg-emerald-100 text-emerald-600 cursor-not-allowed" 
                      : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
                    }`}
                >
                  {loading ? "Sending..." : "Send OTP"}
                </button>
              </div>
            </div>

            {/* OTP Verification Box */}
            {!otpVerified && (
              <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100/50 space-y-4 animate-in zoom-in-95 duration-300">
                <div className="flex items-center gap-2 text-blue-600 mb-1">
                  <ShieldCheck size={16} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Identity Verification</span>
                </div>
                <div className="flex gap-3">
                  <input
                    type="text"
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="flex-grow px-5 py-3 rounded-xl border-none shadow-inner bg-white focus:ring-2 focus:ring-blue-500 outline-none text-center font-bold tracking-[10px] text-lg"
                  />
                  <button
                    type="button"
                    onClick={handleVerifyOtp}
                    className="bg-slate-900 hover:bg-black text-white px-8 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Access Password</label>
              <div className="relative group">
                <KeyRound className="absolute left-4 top-3.5 text-slate-400 group-focus-within:text-blue-500 transition-colors" size={18} />
                <input
                  name="password"
                  type="password"
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-slate-100 bg-slate-50/50 focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 outline-none transition-all font-medium"
                  required
                />
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-[3px] transition-all flex items-center justify-center gap-3
                  ${otpVerified 
                    ? "bg-blue-600 hover:bg-blue-700 text-white shadow-xl shadow-blue-200 active:scale-[0.98]" 
                    : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  }`}
              >
                <UserCheck size={18} />
                Confirm Registration
              </button>
              {!otpVerified && (
                <p className="text-center text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-tighter">
                  Email verification required to enable registration
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}