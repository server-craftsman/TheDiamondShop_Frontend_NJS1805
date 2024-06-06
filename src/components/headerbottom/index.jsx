import { CloseOutlined,SearchOutlined,AiOutlineShoppingCart } from "@ant-design/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import "./index.scss";
function HeaderBottom() {
  const [showSearch, setShowSearch] = useState(false);
  return (
    <header>
      <div className={`header__search ${showSearch === true ? "active" : ""}`}>
        <input type="text" placeholder=" Search movie " />
        <CloseOutlined onClick={() => setShowSearch(false)} />
      </div>
      <nav>
        <ul>
          <li onClick={() => setShowSearch(true)}>
            <SearchOutlined />
          </li>

          <li className="cart">
            {" "}
            <Link to="/cart-page">
              <AiOutlineShoppingCart />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default HeaderBottom;
