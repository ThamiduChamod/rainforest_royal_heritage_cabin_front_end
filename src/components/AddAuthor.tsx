import { UserPlus, Mail, PenTool, FileText } from "lucide-react";
import { useState } from "react";

export default function AddAuthor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    bio: "",
    expertise: ""
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form);
    // 👉 API CALL HERE
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* Name */}
      <div>
        <label className="text-sm font-semibold text-slate-600">
          Author Name
        </label>
        <div className="relative mt-1">
          <UserPlus className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            name="name"
            onChange={handleChange}
            placeholder="John Doe"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-semibold text-slate-600">
          Email Address
        </label>
        <div className="relative mt-1">
          <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            name="email"
            type="email"
            onChange={handleChange}
            placeholder="author@email.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Expertise */}
      <div>
        <label className="text-sm font-semibold text-slate-600">
          Expertise
        </label>
        <div className="relative mt-1">
          <PenTool className="absolute left-3 top-3 text-slate-400" size={18} />
          <input
            name="expertise"
            onChange={handleChange}
            placeholder="Technology, Finance, Health"
            className="w-full pl-10 pr-4 py-3 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label className="text-sm font-semibold text-slate-600">
          Short Bio
        </label>
        <div className="relative mt-1">
          <FileText className="absolute left-3 top-3 text-slate-400" size={18} />
          <textarea
            name="bio"
            onChange={handleChange}
            placeholder="Brief description about the author..."
            className="w-full pl-10 pr-4 py-3 h-24 rounded-xl border bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      {/* Button */}
      <button
        type="submit"
        className="w-full bg-slate-900 hover:bg-blue-600 text-white py-3 rounded-xl font-bold transition"
      >
        Register Author
      </button>
    </form>
  );
}
