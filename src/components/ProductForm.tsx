"use client";
import { menuData } from "../data/menu";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useContext, Suspense } from "react";
import AddedProducts from "./AddedProducts";
import { FormDataContext } from "./FormDataContext";

interface FormData {
  productName: string;
  category_name: string;
  measurements: string[];
}

const ProductForm: React.FC = () => {
  const { formDataList, setFormDataList } = useContext(FormDataContext);
  const [productName, setProductName] = useState<string>("");
  const [measurements, setMeasurements] = useState<string[]>([]);
  const [showItems, setShowItems] = useState<boolean>(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState<boolean>(false);

  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";

  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const handleProductNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const handleMeasurementChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedMeasurements = [...measurements];
    updatedMeasurements[index] = e.target.value;
    setMeasurements(updatedMeasurements);
  };

  // const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!productName.trim()) {
  //     return;
  //   }

  //   const newFormData: FormData = {
  //     productName,
  //     category_name: category,
  //     measurements,
  //   };

  //   try {
  //     const response = await fetch("/api/create-product", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(newFormData),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       setFormDataList([...formDataList, newFormData]);
  //       setProductName("");
  //       setMeasurements([]);
  //     } else {
  //       console.error("Failed to insert product");
  //     }
  //   } catch (error) {
  //     console.error("Error inserting product:", error);
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!productName.trim()) {
      return;
    }

    const newFormData: FormData = {
      productName,
      category_name: category,
      measurements,
    };

    try {
      const savedData = localStorage.getItem("formDataList");
      let formDataList: FormData[] = [];
      if (savedData) {
        formDataList = JSON.parse(savedData);
      }
      formDataList.push(newFormData);
      localStorage.setItem("formDataList", JSON.stringify(formDataList));

      setFormDataList([...formDataList, newFormData]);
      setProductName("");
      setMeasurements([]);
      alert("Product saved!");
    } catch (error) {
      console.error("Error saving product data to localStorage:", error);
    }
  };

  const handleAddItem = () => {
    setShowItems(true);
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      {" "}
      <div className="flex flex-col items-center justify-center mx-4 mt-10">
        <h1 className="text-4xl font-bold text-[#ae8625]">{category}</h1>
        {showSuccessMessage && (
          <p className="text-green-500 font-semibold">
            Item added successfully
          </p>
        )}
        <>
          <form className="w-full max-w-lg mt-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-3 mb-6">
              <div className="w-full px-3">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Product name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-400 rounded py-2.5 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="product-name"
                  type="text"
                  value={productName}
                  onChange={handleProductNameChange}
                  required
                />
                <p className="text-red-500 text-xs italic">
                  Please fill out this field.
                </p>
              </div>
            </div>
            {category && menuData[category] && (
              <div className="flex flex-col mb-2 gap-2">
                {menuData[category].map((measurement, index) => (
                  <label
                    key={index}
                    htmlFor={`measurement_${index}`}
                    className="flex flex-wrap text-gray-500">
                    <input
                      className="w-1/2 appearance-none block bg-gray-200 text-gray-700 border border-gray-400 rounded py-2.5 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id={`measurement_${index}`}
                      type="number"
                      value={measurements[index] || ""}
                      placeholder={measurement}
                      onChange={(e) => handleMeasurementChange(index, e)}
                    />
                  </label>
                ))}
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleAddItem}
                type="submit"
                className="w-1/3 shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded text-center mt-4">
                Add Item
              </button>
              <Link
                href={"/"}
                className="w-1/3 shadow bg-black hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded text-center mt-4">
                Homepage
              </Link>
            </div>
          </form>
        </>
        {showItems && <AddedProducts />}
      </div>
    </Suspense>
  );
};

export default ProductForm;
