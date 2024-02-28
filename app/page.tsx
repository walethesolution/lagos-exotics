import React from "react";
import Layout from "../src/components/Layout";
import EnterProduct from "@/src/components/EnterProduct";
import { FormDataProvider } from "@/src/components/FormDataContext";

const IndexPage: React.FC = () => {
  return (
    <FormDataProvider>
      <Layout>
        <EnterProduct />
      </Layout>
    </FormDataProvider>
  );
};

export default IndexPage;
