import React from "react"
import { X } from "lucide-react"

type ModalProps = {
  open: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

export default function Modal({ open, onClose, title, children }: ModalProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-xl p-8 animate-in fade-in zoom-in duration-300">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">{title}</h3>
          <button onClick={onClose}>
            <X className="text-slate-400 hover:text-red-500" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {children}
        </div>

        {/* Footer */}
        <div className="flex gap-3 pt-6">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl border font-bold text-sm"
          >
            Cancel
          </button>
          <button
            className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-blue-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  )
}
