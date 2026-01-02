import React from "react";

type FieldProps = {
  label: string;
  name: string;
  value: string;
  isEdit: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

const Field: React.FC<FieldProps> = ({
  label,
  name,
  value,
  isEdit,
  onChange,
  disabled = false,
}) => {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black text-slate-600 uppercase tracking-[3px] ml-1">
        {label}
      </label>

      {isEdit && !disabled ? (
        <input
          type="text"
          name={name}
          value={value}
          onChange={onChange}
          className="w-full p-4 bg-white/10 rounded-2xl border border-white/10 text-white text-sm outline-none focus:ring-2 focus:ring-blue-500"
        />
      ) : (
        <div className="p-4 bg-slate-900/50 rounded-2xl border border-white/5 text-slate-200 text-sm font-bold">
          {value}
        </div>
      )}
    </div>
  );
};

export default Field;
