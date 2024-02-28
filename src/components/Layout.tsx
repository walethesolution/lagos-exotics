"use client";
import Header from "./Header";
import Footer from "./Footer";
import CategoryContextProvider from "./CategoryContextProvider";
import { FormDataProvider } from "./FormDataContext";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CategoryContextProvider>
      <FormDataProvider>
        <div className="flex flex-col min-h-screen p-3 ">
          <Header />
          <div className="flex-grow border border-gray-400 rounded-lg my-6 mx-3">
            {children}
          </div>
          <Footer />
        </div>
      </FormDataProvider>
    </CategoryContextProvider>
  );
};

export default Layout;
