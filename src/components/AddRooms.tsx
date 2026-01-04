import React, { useState } from "react";
import { addRoom } from "../services/rooms";

export default function AddRooms() {
  const [form, setForm] = useState({
    type: "",
    price: "",
    pax: "",
    bedType: "",
    count: "",
    amenities:""
  });

  const [amenities , setAmenities] = useState<string[]>([])

  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(form)

      const data = new FormData();
    data.append("type", form.type);
    data.append("price", form.price);
    data.append("pax", form.pax);
    data.append("bedType", form.bedType);
    data.append("status", "AVAILABLE");
    data.append("count", form.count);

    // amenities → string → array backend eke split karanna puluwan
    data.append("amenities", form.amenities);

    if (image) {
      data.append("image", image);
    }

    const obj = {
      type:form.type,
      price: form.price,
      pax: form.pax,
      bedType:form.bedType ,
      amenities: amenities,
      status: "AVAILABLE",
      file: image,
      count: form.count,

    }
    const res = await addRoom(data)
      if(res.data.isSave){
        alert("Image save successfully")
      }
    console.log(res)

  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Room Type */}
      <input
        name="type"
        value={form.type}
        onChange={handleChange}
        placeholder="Room Type (Deluxe, Family...)"
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
        required
      />

      {/* Price & Pax */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="price"
          type="number"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
          required
        />
        <input
          name="pax"
          type="number"
          value={form.pax}
          onChange={handleChange}
          placeholder="Pax"
          className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
          required
        />
      </div>

      {/* Bed Type */}
      <select
        name="bedType"
        value={form.bedType}
        onChange={handleChange}
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
        required
      >
        <option value="">Select Bed Type</option>
        <option value="Single Bed">Single Bed</option>
        <option value="Double Bed">Double Bed</option>
        <option value="Queen Bed">Queen Bed</option>
        <option value="King Bed">King Bed</option>
      </select>

      {/* Amenities */}
       <input
        name="amenities"
        value={form.amenities}
        onChange={handleChange}
        placeholder="Amenities (WiFi, AC, TV)"
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
      />

      {/* Room Count */}
      <input
        name="count"
        type="number"
        value={form.count}
        onChange={handleChange}
        placeholder="Room Count"
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
      />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="w-full text-sm"
      />

      {/* Preview */}
      {image && (
        <img
          src={URL.createObjectURL(image)}
          className="h-32 w-full object-cover rounded-xl"
        />
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-slate-900 text-white py-3 rounded-xl font-bold hover:bg-blue-600 transition"
      >
        {loading ? "Saving..." : "Save Room"}
      </button>
    </form>
  );
}
