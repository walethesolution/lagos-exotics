"use client";
import { createContext, useState } from "react";

interface CategoryContextValue {
  selectedCategory: string;
  setSelectedCategory: React.Dispatch<React.SetStateAction<string>>;
  handleSelectionChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

interface CCPProps {
  children: React.ReactNode;
}

export const CategoryContext = createContext<CategoryContextValue>({
  selectedCategory: "",
  setSelectedCategory: () => {},
  handleSelectionChange: () => {},
});

const CategoryContextProvider: React.FC<CCPProps> = ({ children }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  return (
    <CategoryContext.Provider
      value={{ selectedCategory, setSelectedCategory, handleSelectionChange }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
