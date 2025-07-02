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
import { Dashboard2 } from "./Pages/Dashboard2";
import ProductsPage from "./Pages/ProductsPage";
import { ProductsList } from "./admin/ProductsLIst";
import { CartPage } from "./Pages/Cart/CartPage";
import { CheckOut } from "./Pages/Cart/CheckOut";
import { MakePayment } from "./Pages/Payment/MakePayment";
import { ErrorPage } from "./Pages/ErrorPage";
import { InvalidRoute } from "./Pages/InvalidRoute";
import ProfilePage from "./Pages/User/ProfilePage";
import Profile2 from "./Pages/User/Profile2";
import { Men2 } from "./Pages/products-section/Men2";
import { Women2 } from "./Pages/products-section/Women2";
import { AdminDashboard } from "./admin/AdminDashboard";

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
          path: "/admin",
          element: <AdminDashboard />,
        },
        {
          path: "/req-testing",
          element: <GetReqTesting />,
        },
        {
          path: "/men",
          element: <Men2 />,
        },
        {
          path: "/women",
          element: <Women2 />,
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
          path: "/products-list",
          element: <ProtectedRoute><ProductsList /></ProtectedRoute>,
        },
        {
          path: "/product-details/:id",
          element: <ProductDetails />,
        },
        {
          path: "/dashboard2",
          element: <Dashboard2 />,
        },
        {
          path: "/products",
          element: <ProductsPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: <CheckOut />,
        },
        {
          path: "/payment/:amount",
          element: <MakePayment />,
        },
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/profile2",
          element: <Profile2 />,
        },
        {
          path: "/error",
          element: <ErrorPage />,
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
        {
          path: "*",
          element: <InvalidRoute />,
        }
      ],
    },
  ]);

  return (
    <div className="dark:text-gray-100 text-gray-900">
      <RouterProvider router={router} />
      <ToastContainer />
    </div>
  );
}

export default App;
