"use client";
import React, { useState, useEffect } from "react";
import Button from "./Button";
import Link from "next/link";
import SavedCategories from "./SavedCategories";
import { defaultMeasurements } from "../data/menu";

const NewCategory = () => {
  const [selectedButtons, setSelectedButtons] = useState<string[]>([]);
  const [showOtherButton, setShowOtherButton] = useState<boolean>(false);
  const [otherMeasurement, setOtherMeasurement] = useState<string>("");
  const [newMeasurement, setNewMeasurement] = useState<string>("");
  const [newCategory, setNewCategory] = useState<string>("");
  const [savedCategories, setSavedCategories] = useState<
    {
      category_name: string;
      measurements: string[];
    }[]
  >([]);

  // useEffect(() => {
  //   localStorage.setItem("savedCategories", JSON.stringify(savedCategories));
  // }, [savedCategories]);

  // useEffect(() => {
  //   const savedCategoriesFromStorage = localStorage.getItem("savedCategories");
  //   if (savedCategoriesFromStorage) {
  //     setSavedCategories(JSON.parse(savedCategoriesFromStorage));
  //   }
  // }, []);

  const handleButtonClick = (text: string) => {
    if (selectedButtons.includes(text)) {
      setSelectedButtons(
        selectedButtons.filter((buttonText) => buttonText !== text)
      );
    } else {
      setSelectedButtons([...selectedButtons, text]);
    }
    setShowOtherButton(false);
  };

  const handleOtherButtonClick = () => {
    setSelectedButtons([]);
    setShowOtherButton(true);
  };

  const handleOtherMeasurementChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOtherMeasurement(event.target.value);
  };

  const handleNewCategoryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setNewCategory(event.target.value);
  };

  const handleCreateButton = () => {
    if (otherMeasurement.trim() !== "") {
      setShowOtherButton(false);
      setOtherMeasurement("");
      setNewMeasurement(otherMeasurement);
    }
  };

  // const handleSave = async () => {
  //   try {
  //     const response = await fetch("/api/new-categories", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         category_name: newCategory,
  //         measurements: selectedButtons,
  //       }),
  //     });

  //     if (response.ok) {
  //       console.log("Data submitted successfully!");
  //       setSavedCategories([
  //         ...savedCategories,
  //         {
  //           category_name: NewCategory,
  //           measurements: selectedButtons,
  //         },
  //       ]);
  //       setSelectedButtons([]);
  //       setNewCategory("");
  //     } else {
  //       console.error("HTTP error:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  const handleSave2 = () => {
    const newCategoryData = {
      category_name: newCategory,
      measurements: selectedButtons,
    };

    const updatedSavedCategories = [...savedCategories, newCategoryData];

    localStorage.setItem(
      "savedCategories",
      JSON.stringify(updatedSavedCategories)
    );

    setSavedCategories(updatedSavedCategories);
    setNewCategory("");
    setSelectedButtons([]);

    alert("Category saved!");
  };

  return (
    <div className="flex flex-col p-6">
      <div className="flex flex-col gap-8">
        <h1 className="text-center text-xl underline">
          Add category <br />
          and measurements
        </h1>
        <form
          action=""
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
          }}>
          <label className="flex flex-col gap-1">
            Enter Category
            <input
              type="text"
              id="new-category"
              name="new-category"
              value={newCategory}
              onChange={handleNewCategoryChange}
              className="block appearance-none w-full bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            />
          </label>
          <div className="flex flex-col gap-3">
            <h1>Select measurements</h1>
            <div className="flex flex-col gap-3">
              <div className="flex gap-3">
                {defaultMeasurements.map((defaultMeasurement) => (
                  <Button
                    key={defaultMeasurement}
                    text={defaultMeasurement}
                    className={
                      selectedButtons.includes(defaultMeasurement)
                        ? "bg-blue-500"
                        : ""
                    }
                    onClick={() => handleButtonClick(defaultMeasurement)}
                  />
                ))}
              </div>
              <div className="flex gap-3">
                {newMeasurement !== "" && (
                  <Button
                    text={newMeasurement}
                    onClick={() => handleButtonClick(newMeasurement)}
                    className=""
                  />
                )}
              </div>
            </div>
            {showOtherButton && (
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter Other Measurement"
                  value={otherMeasurement}
                  onChange={handleOtherMeasurementChange}
                  className="block appearance-none w-full bg-gray-200 border border-gray-400 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                />
                <button
                  type="button"
                  onClick={handleCreateButton}
                  className="px-3 py-2 bg-blue-500 text-white rounded">
                  Create
                </button>
              </div>
            )}
          </div>
          <Button text="other" onClick={handleOtherButtonClick} />
          <>
            <button
              type="button"
              className="w-full px-3 py-3 bg-green-700 text-white"
              onClick={handleSave2}>
              SAVE
            </button>
          </>
        </form>
        <Link href="/saved-categories">VIEW SAVED CATEGORIES</Link>
      </div>
      <SavedCategories savedCategories={savedCategories} />
    </div>
  );
};

export default NewCategory;
