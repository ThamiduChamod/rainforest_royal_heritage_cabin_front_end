import { useState } from "react"
import { addPackage } from "../services/package"

export default function AddPackage() {
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [tagline, setTagline] = useState("")
  const [status, setStatus] = useState("AVAILABLE")
  const [features, setFeatures] = useState("")
  const [count, setCount] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append("name", name)
      formData.append("price", price)
      formData.append("tagline", tagline)
      formData.append("status", status)
      formData.append("count", count)

      // 🔥 comma separated → array
      formData.append(
        "features",
        JSON.stringify(features.split(",").map(f => f.trim()))
      )

      if (image) {
        formData.append("image", image)
      }

      const res = await addPackage(formData)

      alert(res.data.message)
      console.log(res)
      alert("save")
      
    } catch (error: any) {
      console.error(error)
      alert("Package save failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 max-w-xl mx-auto"
    >
      <input
        type="text"
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
        placeholder="Package Name"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />

      <input
        type="number"
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
        placeholder="Price"
        value={price}
        onChange={e => setPrice(e.target.value)}
        required
      />

      <input
        type="text"
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
        placeholder="Tagline"
        value={tagline}
        onChange={e => setTagline(e.target.value)}
      />

      <textarea
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm h-24"
        placeholder="Features (Comma separated)"
        value={features}
        onChange={e => setFeatures(e.target.value)}
      />

      <input
        type="number"
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
        placeholder="Count"
        value={count}
        onChange={e => setCount(e.target.value)}
      />

      <select
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
        value={status}
        onChange={e => setStatus(e.target.value)}
      >
        <option value="AVAILABLE">AVAILABLE</option>
        <option value="BOOKED">BOOKED</option>
      </select>

      <input
        type="file"
        accept="image/*"
        onChange={e => setImage(e.target.files?.[0] || null)}
        className="w-full p-3 bg-slate-50 border rounded-xl text-sm"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800"
      >
        {loading ? "Saving..." : "Save Package"}
      </button>
    </form>
  )
}
