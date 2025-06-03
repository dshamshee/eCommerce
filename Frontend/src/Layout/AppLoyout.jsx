import { Outlet } from "react-router-dom";
import { Header } from "../Sections/Header";
import { Footer } from "../Sections/Footer";

export const MainLayout = () => {
    return (
      <section className="min-h-screen flex flex-col overflow-x-hidden">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background">
          <Header />
        </div>
        <main className="flex-grow mt-16">
          <Outlet />
        </main>
        <div>
          <Footer />
        </div>
      </section>
    );
  };
  
  export const SimpleLayout = () => {
    return (
      <section className="min-h-screen flex-grow overflow-x-hidden">
        <Outlet />
      </section>
    );
  };
  
  export default MainLayout;