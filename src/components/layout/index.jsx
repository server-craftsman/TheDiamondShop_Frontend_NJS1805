import { Outlet } from "react-router-dom";
import Header from "../header";
// import HeaderBottom from "../headerbottom";
function Layout() {
  return <div>
    <Header/>
    {/* <HeaderBottom/> */}
    <Outlet/>
  </div>;
}

export default Layout;
