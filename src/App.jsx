import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login-page";
import RegisterForm from "./pages/register-page";
import Layout from "./components/layout";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register-page",
          element: <RegisterForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
