import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout, { SimpleLayout } from "./Layout/AppLoyout";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Auth/Login";
import { Signup } from "./Auth/Signup";
import { GetReqTesting } from "./routesTesting/GetReqTesting";
import { Men } from "./Pages/products-section/Men";
import { Women } from "./Pages/products-section/Women";
import { Kids } from "./Pages/products-section/Kids";
import { AddProduct } from "./admin/AddProduct";
import { ToastContainer } from "react-toastify";
import { ProtectedRoute } from "./Layout/ProtectedRoute";
import { ProductDetails } from "./Pages/products-section/ProductDetails";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        },
        {
          path: "/req-testing",
          element: <GetReqTesting />,
        },
        {
          path: "/men",
          element: <Men />,
        },
        {
          path: "/women",
          element: <Women />,
        },
        {
          path: "/kids",
          element: <Kids />,
        },
        {
          path: "/add-product",
          element: <ProtectedRoute><AddProduct /></ProtectedRoute>,
        },
        {
          path: "/product-details",
          element: <ProductDetails />,
        },
      ],
    },

    {
      path: "/",
      element: <SimpleLayout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <Signup />,
        },
      ],
    },
  ]);

  return (
    <div className="dark:bg-gray-950 dark:text-gray-100 text-gray-900 bg-white">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
