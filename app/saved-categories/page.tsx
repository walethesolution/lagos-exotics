"use client";
import React, { useState, useEffect } from "react";
import Layout from "@/src/components/Layout";
import SavedCategories from "@/src/components/SavedCategories";

const Page = () => {
  const [savedCategories, setSavedCategories] = useState([]);

  // useEffect(() => {
  //   const fetchSavedCategories = async () => {
  //     try {
  //       const response = await fetch("/api/saved-categories");
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         setSavedCategories(data.savedCategories);
  //       } else {
  //         console.error("Failed to fetch saved categories", response.status);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching saved categories:", error);
  //     }
  //   };

  //   fetchSavedCategories();
  // }, []);
  useEffect(() => {
    const savedCategoriesFromStorage = localStorage.getItem("savedCategories");
    if (savedCategoriesFromStorage) {
      setSavedCategories(JSON.parse(savedCategoriesFromStorage));
    }
  }, []);

  return (
    <div>
      <Layout>
        <div className="flex flex-col items-center">
          <h1 className="mt-2 text-xl">Saved Categories</h1>
          <SavedCategories savedCategories={savedCategories} />
        </div>
      </Layout>
    </div>
  );
};

export default Page;
