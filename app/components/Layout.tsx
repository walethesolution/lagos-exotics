"use client";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Admin from "./Admin";
import Home from "./Home";
import { MenuItem } from "../data/menu";
import { initialMenuData } from "../data/menu";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [menuItems, setMenuItems] = useState(initialMenuData);

  const handleAddMenuItem = (item: MenuItem) => {
    setMenuItems((prevItems) => [...prevItems, item]);
  };

  return (
    <div className="text-balance">
      {pathname === "/edit" ? (
        <Admin onAddMenuItem={handleAddMenuItem} />
      ) : (
        <Home menuItems={menuItems} />
      )}
      {children}
    </div>
  );
};

export default Layout;
