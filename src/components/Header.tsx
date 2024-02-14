import React from "react";
import Link from "next/link";
import Image from "next/image";
import Lag from "../../public/lag.jpg";

const Header: React.FC = () => {
  return (
    <header>
      <Link href={"/"} className="flex flex-col gap-2 items-center mt-4">
        <p className="text-4xl font-bold text-center italic text-black">
          Lagos Exotics
        </p>
        <div className="w-8 rounded-lg">
          <Image src={Lag} alt="logo" />
        </div>
      </Link>
    </header>
  );
};

export default Header;
