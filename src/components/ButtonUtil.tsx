import React from "react";

type BottonUtilProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
  title?: string;
};

const ButtonUtil = ({ label, onClick, className, icon, title }: BottonUtilProps) => {
  return (
    <div className="flex w-auto flex-col  ">
      <button
        type="submit"
        className={`flex py-2 flex-col items-center justify-center  rounded-md  cursor-pointer  ${className}`}
        onClick={onClick}
        title={title || "Click"}
      >
        {label} {icon}
      </button>
    </div>
  );
};

export default ButtonUtil;
