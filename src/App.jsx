import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login-page";
import RegisterForm from "./pages/register-page";
import Layout from "./components/layout";
import PasswordForm from "./pages/password-page";

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
    {
      path: "/password-page",
      element: <PasswordForm />,
    },

  ]);

  return <RouterProvider router={router} />;
}

export default App;
