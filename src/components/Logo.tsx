import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <h1 className="text-xs">
      Dev{" "}
      <Link
        href="https://ttechdesigners.com/"
        target="_blank"
        rel="noopener noreferrer"
        className={` text-center font-extrabold  text-purple-900 transition-colors duration-300 `}
      >
        TTechDesigners
      </Link>
    </h1>
  );
};

export default Logo;
