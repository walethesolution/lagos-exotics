"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { menuData } from "../data/menu";
import { CategoryContext } from "./CategoryContextProvider";

const EnterProduct: React.FC = () => {
  const { selectedCategory, handleSelectionChange } =
    useContext(CategoryContext);
  const [selectedCategoryKey, setSelectedCategoryKey] = useState<string>("");

  useEffect(() => {
    setSelectedCategoryKey(selectedCategory);
  }, [selectedCategory]);

  return (
    <div className="flex flex-col gap-4 justify-center items-center mx-4 mt-10">
      <h1 className="text-2xl mb-6 ">Enter Product</h1>
      <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
          Select category
        </label>
        <div className="relative">
          <select
            className="block appearance-none w-full bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="menu"
            value={selectedCategory}
            onChange={handleSelectionChange}
          >
            <option value="">Select a category</option>
            {Object.keys(menuData).map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
      </div>
      <Link
        href={{
          pathname: "/product-form",
          query: { category: selectedCategory },
        }}
        className={`w-1/3 shadow ${
          selectedCategoryKey
            ? "bg-purple-500 hover:bg-purple-400"
            : "bg-gray-300 cursor-not-allowed"
        } focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded text-center`}
        style={{ pointerEvents: selectedCategory ? "auto" : "none" }}
      >
        Next
      </Link>
    </div>
  );
};

export default EnterProduct;
