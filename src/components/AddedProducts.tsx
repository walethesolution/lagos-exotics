"use client";
import React, { useState } from "react";
import { menuData } from "../data/menu";
import { EditIcon } from "./EditIcon";
import { DeleteIcon } from "./DeleteIcon";

interface ConfirmationModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

// ConfirmationModal component for displaying confirmation dialog
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

export interface AddedProductsProps {
  formDataList: {
    productName: string;
    measurements: string[];
    category: string;
  }[];
}

const AddedProducts: React.FC<AddedProductsProps> = ({ formDataList }) => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  if (!formDataList) {
    return <div>No data available</div>;
  }

  const groupedData: { [key: string]: typeof formDataList } = {};
  formDataList.forEach((formData) => {
    if (!groupedData[formData.category]) {
      groupedData[formData.category] = [];
    }
    groupedData[formData.category].push(formData);
  });

  const handleEdit = (formData: any) => {
    console.log("Edit", formData);
  };

  const handleDelete = (formData: any) => {
    console.log("Delete", formData);
  };

  const handleSubmit = () => {
    setShowConfirmation(true);
  };

  const handleConfirmation = async (confirmed: boolean) => {
    if (confirmed) {
      try {
        // Make an HTTP POST request to the menu route with formDataList
        const response = await fetch("/menu", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataList),
        });

        if (response.ok) {
          // If the request is successful, set submitted to true
          setSubmitted(true);

          // Optionally, you can perform additional actions upon successful submission
          console.log("Data submitted successfully!");
        } else {
          // Handle HTTP errors
          console.error("HTTP error:", response.status);
        }
      } catch (error) {
        // Handle other errors
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
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={() => handleConfirmation(true)}
          onCancel={() => handleConfirmation(false)}
        />
      )}
    </div>
  );
};

export default AddedProducts;
