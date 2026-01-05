import { useRef, useState } from "react";
import { Camera } from "lucide-react";
import { updateImage } from "../services/profile";

export default function ProfileImagePicker() {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileRef.current?.click(); // 👈 file picker open
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    console.log(file); // 👉 backend send later

    const res = await updateImage({image: file})
    alert(res.message)
    console.log("aaa")
  };

  return (
    <div className="relative w-32 h-32">
      {/* Image */}
      <img
        src={preview || "https://via.placeholder.com/150"}
        className="w-full h-full object-cover rounded-[32px]"
      />

      {/* Camera Button */}
      <button
        onClick={handleButtonClick}
        className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2.5 rounded-2xl shadow-xl hover:scale-110 transition-transform border-4 border-[#111827]"
      >
        <Camera size={16} />
      </button>

      {/* Hidden File Input */}
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
