import React, { useState, useEffect } from "react";
import { addPackage, updatePackage } from "../services/package"; 

type AddPackageProps = {
  isUpdate?: boolean;
  existingData?: any;
  onSuccess?: () => void;
};

export default function AddPackage({ isUpdate = false, existingData, onSuccess }: AddPackageProps) {
  
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [tagline, setTagline] = useState("");
  const [status, setStatus] = useState("AVAILABLE");
  const [features, setFeatures] = useState("");
  const [count, setCount] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    if (isUpdate && existingData) {
      setName(existingData.name || "");
      setPrice(existingData.price || "");
      setTagline(existingData.tagline || "");
      setStatus(existingData.status || "AVAILABLE");
      setCount(existingData.count || "");
      setFeatures(
        Array.isArray(existingData.features) 
          ? existingData.features.join(", ") 
          : existingData.features || ""
      );
      if (existingData.image) setPreview(existingData.image);
    }
  }, [isUpdate, existingData]);

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

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price);
      formData.append("tagline", tagline);
      formData.append("status", status);
      formData.append("count", count);
      
      
      const featuresArray = features.split(",").map(f => f.trim());
      formData.append("features", JSON.stringify(featuresArray));

      if (image) {
        formData.append("image", image);
      }

      let res;
      if (isUpdate) {
        console.log(formData.get("name"))
        const data ={
          id: existingData.id,
          name: formData.get("name"),
          price: formData.get("price"),
          tagline:formData.get("tagline"),
          count:formData.get("count"),
          image:formData.get("image"),
        }
        res = await updatePackage(data);
        alert("Package updated successfully!");
      } else {
        res = await addPackage(formData);
        alert("Package saved successfully!");
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
    <form onSubmit={handleSubmit} className="space-y-4 p-2">
      
      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Package Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Ex: Romantic Honeymoon"
          className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none transition"
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Price (LKR)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="25000"
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
            required
          />
        </div>
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Daily Limit / Count</label>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            placeholder="5"
            className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Tagline</label>
        <input
          type="text"
          value={tagline}
          onChange={(e) => setTagline(e.target.value)}
          placeholder="A short description about the package"
          className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Included Features (Comma separated)</label>
        <textarea
          value={features}
          onChange={(e) => setFeatures(e.target.value)}
          placeholder="Lunch, Pool Access, Welcome Drink"
          className="w-full p-3.5 bg-slate-50 border border-slate-100 rounded-2xl text-sm h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 items-end">
        <div className="space-y-1">
          <label className="text-[10px] font-bold text-slate-400 uppercase ml-1">Package Image</label>
          <div className="relative border-2 border-dashed border-slate-200 rounded-2xl p-4 text-center hover:bg-slate-50 transition cursor-pointer h-[110px] flex items-center justify-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Upload Image</p>
          </div>
        </div>
        
        {preview && (
          <img src={preview} className="h-[110px] w-full object-cover rounded-2xl border border-slate-100" />
        )}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[2px] hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-blue-200/20 mt-4"
      >
        {loading ? "Processing..." : isUpdate ? "Update Package" : "Publish Package"}
      </button>
    </form>
  );
}