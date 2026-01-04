import { PenLine, Save } from "lucide-react";
import React, { useState } from "react";
import Field from "./Field"
import { saveProfile } from "../services/profile";

export default function EditBioData() {
  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState({
    address: "",
    email: "",
    phone: "",
    country: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setIsEdit(false);
    console.log("Saved Data:", data);

    const save ={
        address: data.address,
        phone: data.phone,
        country: data.country
    }

    const res = await saveProfile(save)

    if(res.isSave){
      alert(res.message)
    }else{
      alert("Bio data save fail")
    }
    
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* Official Name */}
      <Field
        label="Address"
        name="address"
        value={data.address}
        isEdit={isEdit}
        onChange={handleChange}
      />

      {/* Email (locked) */}
      <Field
        label="Verified Email"
        name="email"
        value={data.email}
        isEdit={isEdit}
        onChange={handleChange}
        disabled
      />

      {/* Phone */}
      <Field
        label="Contact"
        name="phone"
        value={data.phone}
        isEdit={isEdit}
        onChange={handleChange}
      />

      {/* Language */}
      <Field
        label="Country"
        name="country"
        value={data.country}
        isEdit={isEdit}
        onChange={handleChange}
      />

      {/* image */}
      {/* <Field
        label="Profile Photo"
        name="image"
        value={data.image}
        isEdit={isEdit}
        onChange={handleChange}
      /> */}

      {/* Button */}
      <button
        onClick={isEdit ? handleSave : () => setIsEdit(true)}
        className="md:col-span-2 flex items-center justify-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[2px] transition-all border border-white/10"
      >
        {isEdit ? <Save size={14} /> : <PenLine size={14} />}
        {isEdit ? "Save Changes" : "Edit Fields"}
      </button>
    </div>
  );
}
