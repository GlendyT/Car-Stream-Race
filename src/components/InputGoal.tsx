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
      <label htmlFor="goal" className="block text-xs font-medium ">
        Goal:
      </label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={handleGoalChange}
        disabled={disabled}
        min="1"
        className="p-2 rounded-md text-black text-sm border-2 w-full"
        placeholder="Add goals"
        title="Enter the Goal"
      />
    </div>
  );
};

export default InputGoal;
