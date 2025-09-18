"use client";
import { SelectorProps } from "@/types";
import React from "react";

const SelectorTeams = ({
  id,
  name,
  value,
  placeholder,
  options,
  className,
  handleChange,
  excludeTeam,
  disabled,
}: SelectorProps) => {
  const filteredOptions = excludeTeam
    ? options.filter((option) => option.name !== excludeTeam)
    : options;
  return (
    <>
      <select
        id={id}
        name={name}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        className={` ${className} border-2  `}
        data-testid="select"
        required
      >
        <option value="" className="text-black">
          {placeholder}
        </option>
        {filteredOptions.map((option) => (
          <option
            key={option.id}
            value={option.name}
            className="text-black border "
          >
            {option.name}
          </option>
        ))}
      </select>
    </>
  );
};

export default SelectorTeams;
