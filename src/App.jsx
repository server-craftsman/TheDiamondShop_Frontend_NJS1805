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
import ViewOrder from "./sales-page/order-pages/view-order-page";
import ViewOrderConfirm from "./sales-page/order-pages/view-order-confirm-page";
import ViewPromotionEvent from "./sales-page/promotion-pages/promotion-event";
import ViewPromotionVoucher from "./sales-page/promotion-pages/promotion-voucher";
import ViewCertificate from "./sales-page/certificate-pages";
import LayoutSale from "./components/sale-layout";
import ViewWaranty from "./sales-page/warranty-pages";
import OrderDetail from "./sales-page/order-pages/view-order-page/detail";
import OrderConfirmDetail from "./sales-page/order-pages/view-order-confirm-page/detail";
import ViewRequestWarranty from "./sales-page/view-requestwarranty-page";
import ViewRequestWarrantyDetail from "./sales-page/view-requestwarranty-page/details-request-warranty";
import ViewWarrantyByReportNo from "./sales-page/view-requestwarranty-page/details-warranty";
import EditProfileSales from "./sales-page/updateProfile";

//==========Manage Pages=========//
import ManageDiamondPage from "./manager-pages/manageproduct/diamond/managediamond-page";
import ManagerPage from "./manager-pages/manager-home-page";
import ManageBridalPage from "./manager-pages/manageproduct/bridals";
import ManageRingPage from "./manager-pages/manageproduct/rings";
import ManageTimepiecesPage from "./manager-pages/manageproduct/timepieces";
import ManagerLayout from "./components/manager-layout";
import ViewBridalDetailPage from "./manager-pages/manageproduct/bridals/detail";
import ViewDiamondDetailPage from "./manager-pages/manageproduct/diamond/detail";
import ViewRingDetailPage from "./manager-pages/manageproduct/rings/detail";
import ViewTimepiecesDetailPage from "./manager-pages/manageproduct/timepieces/detail";
import ManageCertificate from "./manager-pages/manager-certificate";
import ManageWarranty from "./manager-pages/manager-warranty/order-warranty";
import RequestWaranty from "./manager-pages/manager-warranty/request-warranty";
import ManageEvent from "./manager-pages/manage-promotions/manage-event";
import EditProfileManager from "./manager-pages/manager-home-page/updateProfile";

//=========Product Detail Pages==========//
import DiamondDetail from "./pages/diamond-page/details";
import TimepieceDetail from "./pages/timepiece-page/details";

//===========Admin Pages=========//
import LayoutAdmin from "./components/admin-layout";
import Dashboard from "./admin-pages/dashboard";
import Account from "./admin-pages/account-page";
import ProfileAdmin from "./admin-pages/profile";
import EditProfileAdmin from "./admin-pages/profile/editProfile";
// import SearchAllProduct from "./pages/searchProduct-page";

//==========Delivery Pages============//
import DeliveryPage from "./delivery-page/delivery-shipping";
import DeliveryLayout from "./components/delivery-layout";
import DeliveryCompleted from "./delivery-page/delivery-completed";
import DeliveryConfirm from "./delivery-page/delivery-confirm";
import DeliveryProfile from "./delivery-page/delivery-profile/view-profile";
import EditDeliveryProfile from "./delivery-page/delivery-profile/edit-profile";
//==================================//
import EditProfile from "./pages/userProfile-page/editProfile";
import HistoryOrderDetails from "./pages/historyOrder-page/details";
import BridalDetail from "./pages/bridal-page/details";
import RingDetail from "./pages/ring-page/details";
import Instruct from "./pages/instruct-page";
import ManageVoucher from "./manager-pages/manage-promotions/manage-voucher";
import ManagerViewWarrantyDetails from "./manager-pages/manager-warranty/request-warranty/view-warranty-detail";
import ManagerViewWarrantyByReportNo from "./manager-pages/manager-warranty/request-warranty/view-warrant-byreportno";
import Feedback from "./pages/feedback-page";
import FeedbackForm from "./pages/feedback-page/createFeedback";
import PriceDiamond from "./pages/priceDiamond-page";
import CustomerViewWarrantyByReportNo from "./pages/historyOrder-page/details/cus-view-warrant-byreportno";
import MapAdmin from "./admin-pages/map-page";
import TakeWarranty from "./delivery-page/take-warranty";
import ReturnWarranty from "./delivery-page/return-warranty";




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
          path: "/instruct-page",
          element: <Instruct />,
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
          path: "/userProfile-edit",
          element: <EditProfile />,
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
          path: "/history-order-details/:orderId",
          element: <HistoryOrderDetails />,
        },
        {
          path: "/customer-view-warranty/:reportNo",
          element: <CustomerViewWarrantyByReportNo />,
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
          path: "/bridal-detail/:id",
          element: <BridalDetail />,
        },
        {
          path: "/ring-detail/:id",
          element: <RingDetail />,
        },
        {
          path: "/timepieces-detail/:id",
          element: <TimepieceDetail />,
        },
        {
          path: "/priceDiamond-page",
          element: <PriceDiamond />,
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
          path: "/profileManager-edit",
          element: <EditProfileManager />,
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
        {
          path: "/manager-order-warranty",
          element: <ManageWarranty />,
        },
        {
          path: "/manager-request-warranty",
          element: <RequestWaranty />,
        },
        {
          path: "/manager-event",
          element: <ManageEvent />,
        },
        {
          path: "manage-voucher",
          element: <ManageVoucher />,
        },
        {
          path: "/manager-view-warrantydetails/:orderId",
          element: <ManagerViewWarrantyDetails />,
        },
        {
          path: "/manager-view-warranty/:reportNo",
          element: <ManagerViewWarrantyByReportNo />,
        },
        {
          path: "/bridals-detail/:id",
          element: <ViewBridalDetailPage />,
        },
        {
          path: "/diamonds-detail/:id",
          element: <ViewDiamondDetailPage />,
        },
        {
          path: "/rings-detail/:id",
          element: <ViewRingDetailPage />,
        },
        {
          path: "/timepieces-details/:id",
          element: <ViewTimepiecesDetailPage />,
        },
        {
          path: "/feedback-page",
          element: <Feedback />,
        },
        {
          path: "/feedback-create",
          element: <FeedbackForm />,
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
          path: "/profileSale-edit",
          element: <EditProfileSales />,
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
        {
          path: "/order/:id",
          element: <OrderDetail />,
        },
        {
          path: "/order-confirm/:id",
          element: <OrderConfirmDetail />,
        },
        {
          path: "/view-requestwarranty",
          element: <ViewRequestWarranty />,
        },
        {
          path: "/view-warrantydetails/:orderId",
          element: <ViewRequestWarrantyDetail />,
        },
        {
          path: "/view-warranty/:reportNo",
          element: <ViewWarrantyByReportNo />,
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
        {
          path: "/delivery-profile-page",
          element: <DeliveryProfile />,
        },
        {
          path: "/deliveryProfile-edit",
          element: <EditDeliveryProfile />,
        },
        {
          path: "/take-item-warranty",
          element: <TakeWarranty />,
        },
        {
          path: "/return-item-warranty",
          element: <ReturnWarranty />,
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
        {
          path: "account-page",
          element: <Account />,
        },
        {
          path: "profileAdmin-page",
          element: <ProfileAdmin />,
        },
        {
          path: "edit-profileAdmin-page",
          element: <EditProfileAdmin />,
        },
        {
          path: "mapAdmin-page",
          element: <MapAdmin />,
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
