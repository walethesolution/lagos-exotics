"use client";
import React, { useContext, useState } from "react";
import { menuData, Product } from "../data/menu";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";
import { useRouter, usePathname } from "next/navigation";
import { FormDataContext } from "./FormDataContext";

interface DeleteConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmationModal: React.FC<DeleteConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p>Are you sure you want to delete this product?</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-red-500 text-white px-4 py-2 mr-2 rounded"
            onClick={onConfirm}>
            Delete
          </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-4 rounded-lg">
        <p>Are you sure you want to submit now?</p>
        <div className="flex justify-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
            onClick={onConfirm}>
            Yes
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const AddedProducts: React.FC = () => {
  const { formDataList, setFormDataList } = useContext(FormDataContext);
  const [showDeleteConfirmation, setShowDeleteConfirmation] =
    useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  if (!formDataList) {
    return <div>No data available</div>;
  }

  const groupedData: { [key: string]: typeof formDataList } = {};
  formDataList.forEach((formData) => {
    if (!groupedData[formData.category_name]) {
      groupedData[formData.category_name] = [];
    }
    groupedData[formData.category_name].push(formData);
  });

  const handleEdit = async (product: Product) => {
    try {
      const response = await fetch(`/api/update-product`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName: product.productName,
          category: product.category_name,
          measurements: product.measurements,
        }),
      });

      if (response.ok) {
        console.log("Product edited successfully!");
        setFormDataList((prevFormDataList) =>
          prevFormDataList.map((item) =>
            item.productName === product.productName
              ? {
                  ...item,
                  category: product.category_name,
                  measurements: product.measurements,
                }
              : item
          )
        );
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  // Define a single function to handle deletion
  const handleDelete = (product: Product) => {
    setSelectedProduct(product);
    setShowDeleteConfirmation(true);
  };

  // Function to handle confirmation and deletion
  const confirmDelete = async () => {
    setShowDeleteConfirmation(false);
    if (selectedProduct) {
      try {
        const response = await fetch(`/api/delete-product`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ productName: selectedProduct.productName }),
        });

        if (response.ok) {
          setFormDataList(
            formDataList.filter((product) => product !== selectedProduct)
          );
        } else {
          console.error("HTTP error:", response.status);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  // Function to handle cancellation of deletion
  const cancelDelete = () => {
    setShowDeleteConfirmation(false);
    setSelectedProduct(null);
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed: boolean) => {
    if (confirmed) {
      try {
        const response = await fetch("/api/create-product", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataList),
        });

        if (response.ok) {
          console.log("Data submitted successfully!");
          console.log(
            "Form Data List being sent to ReadOnlyProducts:",
            formDataList
          );
          router.push("/menu");
        } else {
          console.error("HTTP error:", response.status);
        }
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
    setShowConfirmation(false);
  };

  return (
    <div className="mt-12 mb-6">
      <h2 className="text-5xl font-bold mb-2 text-center ">Menu List</h2>
      {Object.entries(groupedData).map(([category, formDataList]) => (
        <div key={category}>
          <h3 className="text-xl font-bold mb-2 text-center text-[#ae8625]">
            {category}
          </h3>
          {formDataList.map((formData, index) => (
            <div key={index} className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-medium text-center mt-2">
                  {formData.productName}
                </h4>
                <table className="table-auto">
                  <thead>
                    <tr>
                      {menuData[category].map((heading, index) => (
                        <th key={index} className="px-4 py-2">
                          {heading}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      {formData.measurements.map((measurement, index) => (
                        <td
                          key={index}
                          className="border px-4 py-2 text-center"
                          style={{ width: 100 }}>
                          {measurement}
                        </td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex gap-5 mt-2 items-center justify-center">
                {!submitted && (
                  <>
                    <span
                      className="text-lg text-default-400 cursor-pointer active:opacity-50 bg-blue-500 rounded"
                      onClick={() => handleEdit(formData)}>
                      <EditIcon />
                    </span>
                    <span
                      className="text-lg bg-red-500 cursor-pointer active:opacity-50 rounded"
                      onClick={() => handleDelete(formData)}>
                      <DeleteIcon />
                    </span>
                  </>
                )}
              </div>
              {/* {selectedProduct === formData && (
                // <EditProduct
                //   selectedProduct={selectedProduct}
                //   setSelectedProduct={setSelectedProduct}
                //   formDataList={formDataList}
                //   setFormDataList={setFormDataList}
                // />
              )} */}
            </div>
          ))}
        </div>
      ))}
      {!submitted && (
        <div className="text-center mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded"
            onClick={handleSubmit}>
            Submit
          </button>
        </div>
      )}
      <>
        {showConfirmation && (
          <ConfirmationModal
            onConfirm={() => handleConfirmation(true)}
            onCancel={() => handleConfirmation(false)}
          />
        )}
      </>
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  );
};

export default AddedProducts;
