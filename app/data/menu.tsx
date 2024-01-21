export interface MenuListProps {
  menuItems: MenuItem[];
}

export interface MenuItem {
  name: string;
  quantity: string;
  price: string;
}

export const initialMenuData: MenuItem[] = [
  { name: "Blackberry Runtz", quantity: "8th", price: "$20" },
  { name: "Strawberry Cough", quantity: "1/2 oz", price: "$40" },
  { name: "Blue Dream", quantity: "oz", price: "$80" },
  { name: "Blackberry Runtz", quantity: "8th", price: "$20" },
  { name: "Strawberry Cough", quantity: "1/2 oz", price: "$40" },
  { name: "Blue Dream", quantity: "oz", price: "$80" },
  { name: "Blackberry Runtz", quantity: "8th", price: "$20" },
  { name: "Strawberry Cough", quantity: "1/2 oz", price: "$40" },
  { name: "Blue Dream", quantity: "oz", price: "$80" },
  { name: "Blackberry Runtz", quantity: "8th", price: "$20" },
  { name: "Strawberry Cough", quantity: "1/2 oz", price: "$40" },
  { name: "Blue Dream", quantity: "oz", price: "$80" },
];
