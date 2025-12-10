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
        width={150}
        height={60}
        className="rounded-md"
      />
    </div>
  );
};

export default Logo;
