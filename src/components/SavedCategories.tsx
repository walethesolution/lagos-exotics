"use client";
import React, { useState } from "react";

interface SavedCategory {
  category_name: string;
  measurements: string[];
}

interface SavedCategoriesProps {
  savedCategories: SavedCategory[];
}

const SavedCategories: React.FC<SavedCategoriesProps> = ({
  savedCategories,
}) => {
  // const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // const handleCategoryChange = (categoryName: string) => {
  //   setSelectedCategory(categoryName);
  // };

  return (
    <div className="mt-4">
      <table className="divide-y divide-gray-200">
        <thead className="min-w-full">
          <tr>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Categories
            </th>
            <th className="bg-gray-50 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Measurements
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-gray-200">
          {savedCategories &&
            savedCategories.map((savedCategory, index) => (
              <tr key={index}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {savedCategory.category_name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {savedCategory.measurements.join(", ")}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SavedCategories;
