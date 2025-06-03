import { Outlet } from "react-router-dom";
import { Header } from "../Sections/Header";
import { Footer } from "../Sections/Footer";

export const MainLayout = () => {

  
    return (
      <section className="w-screen h-screen flex flex-col">
        <div className="fixed top-0 left-0 right-0 z-50 bg-background">
          <Header />
        </div>
        <main className="flex-1 mt-[80px] mb-[60px] overflow-y-auto">
          <Outlet />
        </main>
        <div className="fixed bottom-0 left-0 right-0 bg-background">
          <Footer />
        </div>
      </section>
    );
  };
  
  export const SimpleLayout = () => {
    return (
      <section className="w-screen h-screen flex-grow">
        <Outlet />
      </section>
    );
  };
  
  export default MainLayout;