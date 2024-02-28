import React, { Suspense } from "react";
import Layout from "@/src/components/Layout";
import ProductForm from "@/src/components/ProductForm";

const page = () => {
  return (
    <Layout>
      <Suspense fallback={<div>Loading...</div>}>
        <ProductForm />
      </Suspense>
    </Layout>
  );
};

export default page;
