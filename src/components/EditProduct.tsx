import React, { useState } from "react";

interface Product {
  productName: string;
  category: string;
  measurements: string[];
}

interface EditableProductFormProps {
  selectedProduct: Product;
  setSelectedProduct: React.Dispatch<React.SetStateAction<Product | null>>;
  formDataList: Product[];
  setFormDataList: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const EditProduct: React.FC<EditableProductFormProps> = ({
  selectedProduct,
  setSelectedProduct,
  formDataList,
  setFormDataList,
}) => {
  const [editedProduct, setEditedProduct] = useState<Product>(selectedProduct);
  const [editedMeasurements, setEditedMeasurements] = useState<string>(
    selectedProduct.measurements.join(",")
  );

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/update-product`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...editedProduct,
          measurements: editedMeasurements.split(", "),
        }),
      });

      if (response.ok) {
        setFormDataList(
          formDataList.map((item) =>
            item.productName === editedProduct.productName
              ? editedProduct
              : item
          )
        );
        setSelectedProduct(null);
      } else {
        console.error("HTTP error:", response.status);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    if (name === "measurements") {
      setEditedMeasurements(value);
    } else {
      setEditedProduct((prevProduct) => ({
        ...prevProduct,
        [name]: value,
      }));
    }
  };

  const handleCancel = () => {
    setSelectedProduct(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Product Name:
        <input
          type="text"
          name="productName"
          value={editedProduct.productName}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Category:
        <input
          type="text"
          name="category"
          value={editedProduct.category}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Measurements:
        <input
          type="text"
          name="measurements"
          value={editedMeasurements}
          onChange={handleInputChange}
        />
      </label>
      <div className="flex gap-2">
        <button type="submit">Save</button>
        <button onClick={() => setSelectedProduct(null)}>Cancel</button>
      </div>
    </form>
  );
};

export default EditProduct;
