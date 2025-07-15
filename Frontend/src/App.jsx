import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout, { SimpleLayout } from "./Layout/AppLoyout";
import { AdminLayout } from "./Layout/AdminLayout";
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
import { ProductList } from "./admin/ProductsLIst";
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
import { EditProduct } from "./admin/EditProduct";
import { Orders } from "./admin/Orders";
import { Analytics } from "./admin/Analytics";
import { ViewOrder } from "./admin/ViewOrder";

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
          path: "/men/:limit",
          element: <Men2 />,
        },
        {
          path: "/women/:limit",
          element: <Women2 />,
        },
        {
          path: "/kids",
          element: <Kids />,
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
          path: "/checkout/:source",
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
      path: "/admin",
      element: <ProtectedRoute><AdminLayout /></ProtectedRoute>,
      children: [
        {
          path: "",
          element: <AdminDashboard />,
        },
        {
          path: "add-product",
          element: <AddProduct />,
        },
        {
          path: "products-list/:limit",
          element: <ProductList />,
        },
        {
          path: "edit-product/:id",
          element: <EditProduct />,
        },
        {
          path: 'orders/:limit',
          element: <Orders />
        },
        {
          path: "analytics",
          element: <Analytics />,
        },
        {
          path: "view-order/:id",
          element: <ViewOrder />,
        }
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
