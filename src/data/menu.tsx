export interface MenuData {
  [key: string]: string[];
}

export const menuData: MenuData = {
  "8th": ["3.5g", "7.0g", "14g", "28g"],
  Candyland: ["3.5g", "7.0g", "14g", "28g"],
  Wholesale: ["14g", "28g", "QP"],
};

export const defaultMeasurements = ["3.5g", "7g", "14g", "28g", "QP", "1/2P"];

export interface Product {
  category_name: string;
  productName: string;
  measurements: string[];
}

export interface Menu {
  products: Product[];
}
