"use client";
import Header from "./Header";
import Footer from "./Footer";
import CategoryContextProvider from "./CategoryContextProvider";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <CategoryContextProvider>
      <div className="flex flex-col min-h-screen text-balance">
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </CategoryContextProvider>
  );
};

export default Layout;
