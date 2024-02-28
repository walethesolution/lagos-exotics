import React from "react";
import Link from "next/link";
import Image from "next/image";
import Lag from "../../public/logo.svg";

const Header: React.FC = () => {
  return (
    <header className="flex items-center mx-auto gap-2">
      <Link href={"/"} className="flex  gap-2 items-center">
        <div className="rounded-lg">
          <Image src={Lag} alt="logo" />
        </div>
        <p className="text-4xl text-center text-black">Lagos Exotics</p>
      </Link>
    </header>
  );
};

export default Header;
