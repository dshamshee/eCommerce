import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout, { SimpleLayout } from "./Layout/AppLoyout";
import { Dashboard } from "./Pages/Dashboard";
import { Login } from "./Auth/Login";

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
        }
      ]
    },


    {
      path: "/",
      element: <SimpleLayout />,
      children: [
        {
          path: "/",
          element: <Login />,
        }
      ]
    }
  ])


  return(

    <div className="dark:bg-gray-950 dark:text-gray-100 text-gray-900 bg-white">
      <RouterProvider router={router} />
      {/* <ToastContainer /> */}
    </div>
  )
}

export default App
