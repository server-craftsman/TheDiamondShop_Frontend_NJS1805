import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login-page";
import RegisterForm from "./pages/register-page";
import Layout from "./components/layout";
import ForgotPasswordForm from "./pages/forgot-password-page/index";
import BridalPage from "./pages/bridal-page";
import DiamondPage from "./pages/diamond-page";
import RingPage from "./pages/ring-page";
import TimepiecePage from "./pages/timepiece-page";
import DesignerPage from "./pages/designer-page";
import OurstorePage from "./pages/ourstore-page";
import UserProfile from "./pages/userProfile-page";
import Payment from "./pages/payment-page";
import HistoryOrder from "../src/pages/historyOrder-page";
import ShowSearch from "./pages/showsearch-page";

import AddToCart from "./pages/cart-page";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import ResetPassword from "./pages/reset-password-page";
import VerificationCode from "./pages/verify-code-page";
import ChangePassword from "./pages/change-password-page";

//==========Sale Pages===========//
import SalePage from "./sales-page";
import ViewOrder from "./sales-page/order-pages/view-order";
import ViewOrderConfirm from "./sales-page/order-pages/view-order-confirm";
import ViewPromotionEvent from "./sales-page/promotion-pages/promotion-event";
import ViewPromotionVoucher from "./sales-page/promotion-pages/promotion-voucher";
//==========Manage Pages=========//
import ManageDiamondPage from "./manager-pages/manageproduct/managediamond-page";
import ManagerPage from "./manager-pages/manager-home-page";

//===========Admin Pages=========//
import LayoutAdmin from "./components/admin-layout";
import Dashboard from "./admin-pages/dashboard";
import SearchAllProduct from "./pages/searchProduct-page";

//==========Delivery Pages============//
import DeliveryPage from "./delivery-page/delivery-confirm";
import DeliveryLayout from "./components/delivery-layout";

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
          element: <ForgotPasswordForm />,
        },
        {
          path: "/verify-code",
          element: <VerificationCode />,
        },
        {
          path: "/reset-password",
          element: <ResetPassword />,
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
        {
          path: "/payment-page",
          element: <Payment />,
        },
        {
          path: "/userProfile-page",
          element: <UserProfile />,
        },
        {
          path: "/change-password-page",
          element: <ChangePassword />,
        },
        {
          path: "/historyOrder-page",
          element: <HistoryOrder />,
        },
        {
          path: "/showsearch-page",
          element: <ShowSearch />,
        },
        {
          path: "/searchAllProduct-page",
          element: <SearchAllProduct />,
        },
      ],
    },
    {
      path: "/manager-page",
      element: <ManagerPage />,
    },
    {
      path: "/manager-diamond-page",
      element: <ManageDiamondPage />,
    },
    //=========Sale page========//
    {
      path: "/sale-page",
      element: <SalePage />,
    },
    {
      path: "/view-order",
      element: <ViewOrder />,
    },
    {
      path: "/view-order-confirm",
      element: <ViewOrderConfirm />,
    },
    {
      path: "/view-promotion-event",
      element: <ViewPromotionEvent />,
    },
    {
      path: "/view-promotion-voucher",
      element: <ViewPromotionVoucher />,
    },

    //==============================
    {
      path: "/delivery",
      element: <DeliveryLayout />,
      children: [
        {
          path: "/delivery",
          element: <DeliveryPage />,
        },
      ],
    },
    //=======Admin Pages==========//
    {
      path: "/admin-page",
      element: <LayoutAdmin />,
      children: [
        {
          path: "/admin-page",
          element: <Dashboard />,
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
