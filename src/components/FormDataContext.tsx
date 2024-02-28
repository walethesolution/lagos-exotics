"use client";
import React, { createContext, useContext, useState } from "react";

export interface FormData {
  productName: string;
  category: string;
  measurements: string[];
}

interface FormDataContextType {
  formDataList: FormData[];
  setFormDataList: React.Dispatch<React.SetStateAction<FormData[]>>;
}

interface FormDataProviderType {
  children: React.ReactNode;
}

export const FormDataContext = createContext<FormDataContextType>({
  formDataList: [],
  setFormDataList: () => {},
});

export const FormDataProvider: React.FC<FormDataProviderType> = ({
  children,
}) => {
  const [formDataList, setFormDataList] = useState<FormData[]>([]);

  return (
    <FormDataContext.Provider value={{ formDataList, setFormDataList }}>
      {children}
    </FormDataContext.Provider>
  );
};
