import { MenuListProps } from "../data/menu";

const MenuList: React.FC<MenuListProps> = ({ menuItems }) => {
  return (
    <div className="flex flex-col gap-4 border-b pb-7">
      <h2 className="text-center text-2xl font-thin mb-4">Menu</h2>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="flex font-serif mb-2">
            <div className="flex flex-col">
              <strong>{item.name}</strong>
              Quantity: {item.quantity}
              <strong>Price: {item.price}</strong>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MenuList;
