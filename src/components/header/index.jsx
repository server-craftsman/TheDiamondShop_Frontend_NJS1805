import "./index.scss";
import { SearchOutlined, UsergroupDeleteOutlined } from "@ant-design/icons";
function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <h2 className="logo">Diamond Shop</h2>
        <div className="search">
          <SearchOutlined className="icon" />
          <input type="text" placeholder="Search..." />
        </div>
      </div>
      <div className="header__right"></div>
      <div>
        <UsergroupDeleteOutlined className="icon" />
      </div>
    </div>
  );
}

export default Header;
