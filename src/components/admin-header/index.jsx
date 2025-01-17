import { useContext, useEffect, useRef } from "react";

import { Link } from "react-router-dom";
import "../admin-header/index.scss";
// import { SidebarContext } from "../../context/SidebarContext";
import {
  CaretDownOutlined,
  DashboardOutlined,
  LaptopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import {
  FaMap,
  FaBoxOpen,
  FaUserCircle,
  FaChartBar,
  FaTools,
  FaSignOutAlt,
} from "react-icons/fa";
import { AuthContext } from "../../AuthContext";

function HeaderAdmin() {
  const { logout } = useContext(AuthContext);
  // const menu = (
  //   <Menu>
  //     <Menu.Item key="1">
  //       <Link to="customer-page">Customer</Link>
  //     </Menu.Item>
  //     <Menu.Item key="2">
  //       <Link to="/manager-page">Manager</Link>
  //     </Menu.Item>
  //     <Menu.Item key="3">
  //       <Link to="/sale-page">Sale Staff</Link>
  //     </Menu.Item>
  //     <Menu.Item key="4">
  //       <Link to="/delivery-page">Delivery</Link>
  //     </Menu.Item>
  //   </Menu>
  // );

  return (
    <nav className={`sidebar "sidebar-show" : ""}`}>
      <div className="sidebar-top">
        <div className="sidebar-brand">
          <span className="sidebar-brand-text">ADMINITRATOR</span>
        </div>
      </div>
      <div className="sidebar-body">

        <div className="sidebar-menu">
          <ul className="menu-list">
          <li className="menu-item">
              <Link to="profileAdmin-page" className="menu-link">
                <span className="menu-link-icon">
                  <FaUserCircle style={{fontSize: "20px"}} />
                </span>
                <span className="menu-link-text">Profile</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="/admin-page" className="menu-link active">
                <span className="menu-link-icon">
                  <DashboardOutlined style={{fontSize: "20px"}} />
                </span>
                <span className="menu-link-text">Dashboard</span>
              </Link>
            </li>
            <li className="menu-item">
              <Link to="account-page" className="menu-link active">
                <span className="menu-link-icon">
                  <UserOutlined style={{fontSize: "20px"}}/>
                </span>
                <span className="menu-link-text">Account</span>
              </Link>
            </li>
            {/* <li className="menu-item">
              <Link to="mapAdmin-page" className="menu-link">
                <span className="menu-link-icon">
                  <FaMap style={{fontSize: "20px"}} />
                </span>
                <span className="menu-link-text">Map</span>
              </Link>
            </li> */}
          </ul>
        </div>

        <div className="sidebar-menu sidebar-menu2">
          <ul className="menu-list">
            <li className="menu-item">
              <Link to="/login" onClick={logout} className="menu-link">
                <span className="menu-link-icon">
                  <FaSignOutAlt style={{fontSize: "20px"}} />
                </span>
                <span className="menu-link-text">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default HeaderAdmin;
