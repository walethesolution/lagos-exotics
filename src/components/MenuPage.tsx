import React from "react";
import Layout from "@/src/components/Layout";
import AddedProducts from "./AddedProducts";
import { FormDataProvider } from "./FormDataContext";

const MenuPage: React.FC = () => {
  return (
    <Layout>
      <FormDataProvider>
        <AddedProducts />
      </FormDataProvider>
    </Layout>
  );
};

export default MenuPage;
