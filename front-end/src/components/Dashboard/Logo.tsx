import Image from "next/image";
import React from "react";
import logo from "@/src/Assets/logo.png";

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <Image
        src={logo}
        alt="Logo"
        width={40}
        height={40}
        className="rounded-md"
      />
      <span className="font-bold text-lg">NEBS</span>
    </div>
  );
};

export default Logo;
