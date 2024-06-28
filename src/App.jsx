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
import UserProfile from "./pages/userProfile-page/viewProfile";
import Payment from "./pages/payment-page";
import HistoryOrder from "../src/pages/historyOrder-page";
import ShowSearch from "./pages/showsearch-page";

import AddToCart from "./pages/cart-page";
import { CartProvider } from "./CartContext";
import { AuthProvider } from "./AuthContext";
import ResetPassword from "./pages/reset-password-page";
import VerificationCode from "./pages/verify-code-page";
import ChangePassword from "./pages/change-password-page";
import OrderForm from "./pages/order-form";

//==========Sale Pages===========//
import SalePage from "./sales-page";
import ViewOrder from "./sales-page/order-pages/view-order";
import ViewOrderConfirm from "./sales-page/order-pages/view-order-confirm";
import ViewPromotionEvent from "./sales-page/promotion-pages/promotion-event";
import ViewPromotionVoucher from "./sales-page/promotion-pages/promotion-voucher";
import ViewCertificate from "./sales-page/certificate-pages/certificate";
import LayoutSale from "./components/sale-layout";
import ViewWaranty from "./sales-page/warranty-pages";

//==========Manage Pages=========//
import ManageDiamondPage from "./manager-pages/manageproduct/diamond/managediamond-page";
import ManagerPage from "./manager-pages/manager-home-page";
import ManageBridalPage from "./manager-pages/manageproduct/bridals";
import ManageRingPage from "./manager-pages/manageproduct/rings";
import ManageTimepiecesPage from "./manager-pages/manageproduct/timepieces";
import ManagerLayout from "./components/manager-layout";

//=========Product Detail Pages==========//
import DiamondDetail from "./pages/diamond-page/details";
import RingDetail from "./pages/ring-page/details";
import BridalDetails from "./pages/bridal-page/details";
import TimepieceDetail from "./pages/timepiece-page/details";

//===========Admin Pages=========//
import LayoutAdmin from "./components/admin-layout";
import Dashboard from "./admin-pages/dashboard";
import SearchAllProduct from "./pages/searchProduct-page";

//==========Delivery Pages============//
import DeliveryPage from "./delivery-page/delivery-shopping";
import DeliveryLayout from "./components/delivery-layout";
import DeliveryCompleted from "./delivery-page/delivery-completed";
import DeliveryConfirm from "./delivery-page/delivery-confirm";
import ManageCertificate from "./manager-pages/manager-certificate";


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
          path: "/order-form",
          element: <OrderForm />,
        },
        {
          path: "/diamond-detail/:id",
          element: <DiamondDetail />,
        },
        {
          path: "/ring-detail/:id",
          element: <RingDetail />,
        },
        {
          path: "/bridal-detail/:id",
          element: <BridalDetails />,
        },
        {
          path: "/timepieces-detail/:id",
          element: <TimepieceDetail />,
        },
      ],
    },
    //========Manager pages==============//
    {
      path: "/",
      element: <ManagerLayout />,
      children: [
        {
          path: "/manager-page",
          element: <ManagerPage />,
        },
        {
          path: "/manager-diamond-page",
          element: <ManageDiamondPage />,
        },
        {
          path: "/manager-bridal-page",
          element: <ManageBridalPage />,
        },
        {
          path: "/manager-ring-page",
          element: <ManageRingPage />,
        },
        {
          path: "/manager-timepieces-page",
          element: <ManageTimepiecesPage />,
        },
        {
          path: "/manager-certificate",
          element: <ManageCertificate />,
        },
      ],
    },
    //=========Sale page========//
    {
      path: "/",
      element: <LayoutSale />,
      children: [
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
        {
          path: "/view-certificate",
          element: <ViewCertificate />,
        },
        {
          path: "/view-warranty",
          element: <ViewWaranty />,
        },
      ],
    },
    //==============Delivery pages===============//
    {
      path: "/",
      element: <DeliveryLayout />,
      children: [
        {
          path: "/delivery",
          element: <DeliveryPage />,
        },
        {
          path: "/delivery-completed",
          element: <DeliveryCompleted />,
        },
        {
          path: "/delivery-confirm",
          element: <DeliveryConfirm />,
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
