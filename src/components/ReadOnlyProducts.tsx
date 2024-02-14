import React from "react";
import { menuData } from "../data/menu";
import { AddedProductsProps } from "./AddedProducts";

const ReadOnlyProducts: React.FC<AddedProductsProps> = ({ formDataList }) => {
  if (!formDataList) {
    return <div>No data available</div>;
  }
  return (
    <div className="mt-12 mb-6">
      <h2 className="text-5xl font-bold mb-2 text-center">Menu List</h2>
      {formDataList.map((formData, index) => (
        <div key={index}>
          <h3 className="text-xl font-bold mb-2 text-center text-[#ae8625]">
            {formData.category}
          </h3>
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-lg font-medium text-center mt-2">
                {formData.productName}
              </h4>
              <table className="table-auto">
                <thead>
                  <tr>
                    {menuData[formData.category].map((heading, index) => (
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
                        style={{ width: 100 }}
                      >
                        {measurement}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReadOnlyProducts;
