import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <h1 className="text-xs">
      Dev{" "}
      <Link
        href="https://github.com/GlendyT"
        target="_blank"
        rel="noopener noreferrer"
        className={` text-center font-extrabold  text-purple-900 transition-colors duration-300 `}
      >
        Glendy T
      </Link>
    </h1>
  );
};

export default Logo;
