import Image from "next/image";
import MenuList from "../components/MenuList";
import Lag from "../../public/lag.jpg";
import { MenuItem } from "../data/menu";
import Instagram from "../../public/instagram.svg";

interface HomeProps {
  menuItems: MenuItem[];
}

const Home: React.FC<HomeProps> = ({ menuItems }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 p-10">
      <Image src={Lag} alt="A pic of the logo" width={50} />
      <h1 className="text-4xl font-extrabold font">Lagos Exotics</h1>
      <MenuList menuItems={menuItems} />

      <div className="flex justify-stretch gap-4 mt-10">
        <p className="text-slate-500 text-sm">
          &copy; 2024 Lagos exotics. All rights reserved{" "}
        </p>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={Instagram}
            alt="Instagram icon"
            className="w-[50px] h-[50px]"
          />
        </a>
      </div>
    </div>
  );
};

export default Home;
