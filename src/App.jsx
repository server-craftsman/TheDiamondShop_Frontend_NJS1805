import { RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "./pages/home";
import LoginPage from "./pages/login-page";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LoginPage />,
      //  element: <HomePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
