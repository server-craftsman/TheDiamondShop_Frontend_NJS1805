import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login-page";
import RegisterForm from "./pages/register-page";
import Layout from "./components/layout";
import PasswordForm from "./pages/forgot-password-page/index";
import BridalPage from "./pages/bridal-page";
import DiamondPage from "./pages/diamond-page";
import RingPage from "./pages/ring-page";
import TimepiecePage from "./pages/timepiece-page";
import DesignerPage from "./pages/designer-page";
import OurstorePage from "./pages/ourstore-page";

import AddToCart from "./pages/cart-page";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";

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
        {
          path: "/forgot-password-page",
          element: <PasswordForm />,
        },
        {
          path: "/bridal-page",
          element: <BridalPage />,
        },
        {
          path: "/diamond-page",
          element: <DiamondPage />,
        },
        {
          path: "/ring-page",
          element: <RingPage />,
        },
        {
          path: "/timepiece-page",
          element: <TimepiecePage />,
        },
        {
          path: "/designer-page",
          element: <DesignerPage />,
        },
        {
          path: "/ourstore-page",
          element: <OurstorePage />,
        },
        {
          path: "/cart-page",
          element: <AddToCart />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <CartProvider>
        <RouterProvider router={router} />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
