import React, { useState } from "react";
import { MenuItem } from "../data/menu";
import Link from "next/link";

interface AdminProps {
  onAddMenuItem: (item: MenuItem) => void;
}

const Admin: React.FC<AdminProps> = ({ onAddMenuItem }) => {
  const [formData, setFormData] = useState<MenuItem>({
    name: "",
    quantity: "",
    price: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onAddMenuItem(formData);
    setFormData({ name: "", quantity: "", price: "" });
  };

  return (
    <div className="flex flex-col justify-center items-center p-16 gap-4">
      <h2 className="text-4xl">Add Menu Item</h2>
      <div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center gap-4"
        >
          <label className="flex flex-col">
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="text-black h-10 rounded"
            />
          </label>
          <label className="flex flex-col">
            Quantity:
            <input
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
              className="text-black h-10 rounded"
            />
          </label>
          <label className="flex flex-col">
            Price:
            <input
              type="text"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="text-black h-10 rounded"
            />
          </label>
          <button type="submit" className=" bg-[#0000FF] w-9/12 p-3 rounded">
            Add Item
          </button>
          <Link href={"/"} className="bg-[#17a960] w-9/12 p-3 rounded">
            Home page
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Admin;
