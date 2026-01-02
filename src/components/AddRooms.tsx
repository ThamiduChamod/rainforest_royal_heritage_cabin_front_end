import React from 'react'

export default function AddRooms() {
  return (
    <>
        <input type="text" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Room Type" />
        <div className="grid grid-cols-2 gap-4">
            <input type="number" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Price" />
            <input type="number" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Pax" />
        </div>
    </>
  )
}
