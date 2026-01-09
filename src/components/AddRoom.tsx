import React, { useState, useEffect } from "react";
import { addRoom, updateRoom } from "../services/rooms"; 

type AddRoomsProps = {
  isUpdate?: boolean;
  existingData?: any;
  onSuccess?: () => void; 
};

export default function AddRooms({ isUpdate = false, existingData, onSuccess }: AddRoomsProps) {
  const [form, setForm] = useState({
    type: "",
    price: "",
    pax: "",
    bedType: "",
    count: "",
    amenities: ""
  });

  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (isUpdate && existingData) {
      setForm({
        type: existingData.type || "",
        price: existingData.price || "",
        pax: existingData.pax || "",
        bedType: existingData.bedType || "",
        count: existingData.count || "",
        amenities: Array.isArray(existingData.amenities) 
          ? existingData.amenities.join(", ") 
          : existingData.amenities || ""
      });
      if (existingData.image) setPreview(existingData.image);
    }
  }, [isUpdate, existingData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const data = new FormData();
    data.append("type", form.type);
    data.append("price", form.price);
    data.append("pax", form.pax);
    data.append("bedType", form.bedType);
    data.append("status", "AVAILABLE");
    data.append("count", form.count);
    data.append("amenities", form.amenities);

    if (image) {
      data.append("image", image);
    }

    try {
      let res;
      if (isUpdate) {
        const roomData = {
            id:existingData.id,
            type:data.get("type"),
            pax:data.get("pax"),
            bedType:data.get("bedType"),
            count:data.get("count"),
            amenities: data.get("amenities")
        }
        res = await updateRoom(roomData);
        if (res.isUpdate) alert("Room updated successfully!");
      } else {
        
        res = await addRoom(data);
        if (res.isSave) alert("Room saved successfully!");
      }
      
      if (onSuccess) onSuccess(); 
    } catch (error) {
      console.error(error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-2 h-200">
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Room Type</label>
        <input
          name="type"
          value={form.type}
          onChange={handleChange}
          placeholder="Ex: Deluxe Ocean View"
          className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Price (LKR)</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            placeholder="5000"
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Max Pax</label>
          <input
            name="pax"
            type="number"
            value={form.pax}
            onChange={handleChange}
            placeholder="2"
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Bed Configuration</label>
          <select
            name="bedType"
            value={form.bedType}
            onChange={handleChange}
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required
          >
            <option value="">Select Bed</option>
            <option value="Single Bed">Single Bed</option>
            <option value="Double Bed">Double Bed</option>
            <option value="Queen Bed">Queen Bed</option>
            <option value="King Bed">King Bed</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Total Availability</label>
          <input
            name="count"
            type="number"
            value={form.count}
            onChange={handleChange}
            placeholder="10"
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Amenities (Comma separated)</label>
        <input
          name="amenities"
          value={form.amenities}
          onChange={handleChange}
          placeholder="WiFi, AC, TV, Mini Bar"
          className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Room Image</label>
        <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:bg-slate-50 transition cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
          <p className="text-xs text-slate-500 font-medium">Click to upload or drag and drop</p>
        </div>
      </div>

      {preview && (
        <div className="relative">
          <img src={preview} className="h-40 w-full object-cover rounded-2xl border border-slate-100" />
          <div className="absolute top-2 right-2 bg-black/50 text-white text-[8px] px-2 py-1 rounded-full uppercase font-bold">Preview</div>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[2px] hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-200/20"
      >
        {loading ? "Processing..." : isUpdate ? "Update Room Details" : "Publish Room"}
      </button>
    </form>
  );
}