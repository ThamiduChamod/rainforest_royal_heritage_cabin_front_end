import React from 'react'

export default function AddPackage() {
  return (
    <>
            <input type="text" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Package Name" />
            <input type="text" className="w-full p-3 bg-slate-50 border rounded-xl text-sm" placeholder="Tagline" />
            <textarea className="w-full p-3 bg-slate-50 border rounded-xl text-sm h-20" placeholder="Features (Comma separated)"></textarea>
    </> 
  )
}
