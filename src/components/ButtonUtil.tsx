import React from "react";

type BottonUtilProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

const ButtonUtil = ({ label, onClick, className }: BottonUtilProps) => {
  return (
    <div className="flex w-full flex-col gap-4 ">
      <button
        type="submit"
        className={`flex py-2 flex-col items-center justify-center bg-black text-white rounded-md hover:bg-gray-800 cursor-pointer ${className}`}
        onClick={onClick}
      >
        {label}
      </button>
    </div>
  );
};

export default ButtonUtil;
