import { UserPlus, Mail, PenTool } from "lucide-react";
import { useState } from "react";
import { sendOTP, verifyOTP } from "../services/auth";
import { authorRegister } from "../services/admin";

export default function AddAuthor() {

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [otp, setOtp] = useState('');
  const [otpVerified, setOtpVerified] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const sendOtp = async ()=>{
    if(!form.email){
      alert("FIrst enter email")
    }
    const res = await sendOTP(form.email)
    alert(res.message)
  }

  // 🔐 OTP VERIFY (demo logic)
  const verifyOtp =async () => {
    if(!otp){
      alert("FIrst enter otp");
    }

    const res = await verifyOTP(form.email, otp)

    if (res.isValid) { 
      setOtpVerified(true);
      alert(res.message);
    } else {
      alert(res.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otpVerified) {
      alert("Please verify OTP first");
      return;
    }
    try {
      const res = await authorRegister(form)


      console.log(res)
      alert(res.message)
    } catch (error) {
      alert("Author register fail")
    }

    


    console.log(form);
    // 👉 API CALL HERE (Register Author)
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      {/* First Name */}
      <div>
        <label className="text-sm font-semibold text-slate-600">First Name</label>
        <div className="relative mt-1">
          <UserPlus className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            name="firstName"
            onChange={handleChange}
            placeholder="John"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
      </div>

      {/* Last Name */}
      <div>
        <label className="text-sm font-semibold text-slate-600">Last Name</label>
        <div className="relative mt-1">
          <UserPlus className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            name="lastName"
            onChange={handleChange}
            placeholder="Doe"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-semibold text-slate-600">Email Address</label>
        <div className="relative mt-1 flex gap-2">
          <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            disabled={otpVerified}
            placeholder="author@email.com"
            className={`w-full pl-10 pr-4 py-3 rounded-xl border outline-none
              ${otpVerified
                ? "bg-gray-200 cursor-not-allowed"
                : "bg-slate-50 focus:ring-2 focus:ring-blue-500"
              }`}
            required
          />
          <button
            type="button"
            onClick={sendOtp}
            disabled={otpVerified}
            className={`px-4 rounded-xl font-bold text-white
              ${otpVerified
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
              }`}
          >
            Send OTP
          </button>
        </div>

        {otpVerified && (
          <p className="text-emerald-600 text-xs font-bold mt-1">
            ✓ Email verified
          </p>
        )}
      </div>

      {/* OTP */}
      <div>
        <label className="text-sm font-semibold text-slate-600">OTP</label>
        <div className="relative mt-1 flex gap-2">
          <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            type="number"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="123456"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            disabled={otpVerified}
          />
          <button
            type="button"
            onClick={verifyOtp}
            disabled={otpVerified}
            className={`px-4 rounded-xl font-bold text-white
              ${otpVerified
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-emerald-500 hover:bg-emerald-600"
              }`}
          >
            Verify
          </button>
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-semibold text-slate-600">Password</label>
        <div className="relative mt-1">
          <PenTool className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            name="password"
            type="password"
            onChange={handleChange}
            placeholder="********"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition"
      >
        Register Author
      </button>
    </form>
  );
}
