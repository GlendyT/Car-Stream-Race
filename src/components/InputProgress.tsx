import React from "react";

type InputProgressProps = {
  id: string;
  value: number;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const InputProgress = ({ id, value, handleProgressChange }: InputProgressProps) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium mb-2">
        Progreso:
      </label>
      <input
        type="number"
        id={id}
        value={value}
        onChange={handleProgressChange}
        min="0"
        className="p-2 rounded-md bg-gray-700 text-white w-full"
        placeholder="Progreso actual"
      />
    </div>
  );
};

export default InputProgress;