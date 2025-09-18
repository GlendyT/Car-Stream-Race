import { InputGoalProps } from "@/types";
import React from "react";

const InputGoal = ({
  id,
  type,
  value,
  handleGoalChange,
  disabled,
}: InputGoalProps) => {
  return (
    <div>
      <label htmlFor="goal" className="block text-sm font-medium ">
        Goals:
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleGoalChange}
        disabled={disabled}
        min="1"
        className="p-2 rounded-md text-black border-2 w-full"
        placeholder="Ingresa el número de goles"
      />
    </div>
  );
};

export default InputGoal;
