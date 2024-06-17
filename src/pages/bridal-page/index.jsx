import { useEffect, useState } from "react";
import "./index.scss";
import { Card, Image, Col, Row, Pagination, Button, Checkbox } from "antd";
import { useCart } from "../../CartContext";

function BridalPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default items per page
  const [filteredData, setFilteredData] = useState([]);
  const { addToCart } = useCart();
  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/products/bridals");
        const data = await response.json();
        setDataSource(data); // Update state with data from the API
        setFilteredData(data); // Initialize filteredData with all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Calculate the index range for the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // Slice the data for the current page
  const currentPageData = filteredData.slice(startIndex, endIndex);
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const parsePriceRange = (range) => {
    if (range === "Under $1000") {
      return (price) => price < 1000;
    }
    if (range === "$1001-$2000") {
      return (price) => price >= 1001 && price <= 2000;
    }
    if (range === "$2001-$3000") {
      return (price) => price >= 2001 && price <= 3000;    
    }
    if (range === "$3001-$4000") {
      return (price) => price >= 3001 && price <= 4000;    
    }
    if (range === "$4001-$5000") {
      return (price) => price >= 40001 && price <= 5000;   
     }
    if (range === "Over $5001") {
      return (price) => price > 5001;
    }
    return () => true;
  };

  const handleFilters = (newFilters) => {
    let filtered = dataSource.filter((item) => {
      let passesPrice = true;
      let passesMaterial = true;
      let passesGender = true;

      if (newFilters.Price && newFilters.Price.length > 0) {
        passesPrice = newFilters.Price.some((range) =>
          parsePriceRange(range)(item.Price)
        );
      }

      if (newFilters.Material && newFilters.Material.length > 0) {
        passesMaterial = newFilters.Material.includes(item.Material);
      }

      if (newFilters.Gender && newFilters.Gender.length > 0) {
        passesGender = newFilters.Gender.includes(item.Gender);
      }

      return passesPrice && passesMaterial && passesGender;
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilteredData(dataSource);
    setCurrentPage(1); // Reset to first page when filters clear
  };

  function handleAddToCart(item) {
    // Thay vì setCartItems, sử dụng addToCart từ useCart
    addToCart({
      id: item.BridalID,
      name: item.NameBridal,
      image: item.ImageBridal,
      price: item.Price,
      quantity: 1, // Hoặc số lượng mà người dùng chọn
    });
  }
  return (
    <div>
      <div className="app">
        <div className="filter-section">
          <h3>Price</h3>
          <Checkbox.Group onChange={(values) => handleFilters({ Price: values })}>
            <Row className = "row-column">
              <Checkbox value="Under $1000" className="Checkbox">Under $1000</Checkbox>
              <Checkbox value="$1001-$2000" className="Checkbox">$1001-$2000</Checkbox>
              <Checkbox value="$2001-$3000" className="Checkbox">$2001-$3000</Checkbox>
              <Checkbox value="$3001-$4000" className="Checkbox">$3001-$4000</Checkbox>
              <Checkbox value="$4001-$5000" className="Checkbox">$4001-$5000</Checkbox>
              <Checkbox value="Over $5001" className="Checkbox">Over $5001</Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <h3>Color</h3>
          <Checkbox.Group onChange={(values) => handleFilters({ Material: values })}>
            <Row className = "row-column">
              <Checkbox value="Platinum" className="Checkbox">Platinum</Checkbox>
              <Checkbox value="14K White Gold" className="Checkbox">14K White Gold</Checkbox>
              <Checkbox value="18K White Gold" className="Checkbox">18K White Gold</Checkbox>
              <Checkbox value="14K Yellow Gold" className="Checkbox">14K Yellow Gold</Checkbox>
              <Checkbox value="18K Yellow Gold" className="Checkbox">18K Yellow Gold</Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <h3>Gender</h3>
          <Checkbox.Group onChange={(values) => handleFilters({ Gender: values })}>
            <Row className = "row-column">
              <Checkbox value="Womens" className="Checkbox">Womens</Checkbox>
              <Checkbox value="Mans" className="Checkbox">Mans</Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <button onClick={clearFilters} className="buttonfilter">Clear Filters</button>
        </div>

        <div className="bridalpage">
          <Row gutter={16}>
            {currentPageData.map((item, index) => (
              <Col span={8} key={index}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <Image
                      width="100%"
                      alt={item.NameBridal}
                      src={item.ImageBridal}
                    />
                  }
                >
                  <Card.Meta
                    title={item.NameBridal}
                    description={`${item.Price}$`}
                  />
                  <Button onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </Button>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            total={filteredData.length}
            pageSize={itemsPerPage}
            onChange={handlePageChange}
            onShowSizeChange={(currentPage, size) => {
              setItemsPerPage(size);
            }}
            showQuickJumper
            showTotal={(total) => `Total ${total} item`}
          />
        </div>
      </div>

      <footer>
        <div className="footer-container">
          <div className="footer-column">
            <h3>Diamond Store</h3>
            <p>
              26 Le Van Viet,
              <br />
              Tan Nhon Phu A Ward,
              <br />
              Thu Duc City,
              <br />
              Ho Chi Minh City
              <br />
              (208) 746-2649
            </p>
            <p>
              <strong>Store Information</strong>
            </p>
            <p>
              <strong>Our Hours</strong>
              <br />
              Monday: Closed
              <br />
              Tues - Sat: 9:30am - 5:00pm
              <br />
              Sunday: Closed
            </p>
          </div>
          <div className="footer-column">
            <h3>Main Menu</h3>
            <ul>
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/ourstore-page">Our Store</a>
              </li>
              <li>
                <a href="/diamond-page">Diamonds</a>
              </li>
              <li>
                <a href="/bridal-page">Bridal</a>
              </li>
              <li>
                <a href="/ring-page">Ring</a>
              </li>
              <li>
                <a href="/timepiece-page">Timepieces</a>
              </li>
              <li>
                <a href="#">Designers</a>
              </li>
              <li>
                <a href="#">Contact</a>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h3>Subscribe</h3>
            <p>
              Enter your email to get notified about sales and new products.
            </p>
            <form>
              <input type="email" placeholder="Enter your email address" />
              <button type="submit">
                <img src="email-icon.png" alt="Subscribe" />
              </button>
            </form>
          </div>
          <div className="footer-column">
            <h3>Location</h3>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.339281181677!2d106.7625251!3d10.8501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317527a1fc80477b%3A0x62944f7a73c84aaf!2sVincom%20Thu%20Duc!5e0!3m2!1sen!2s!4v1688018656344!5m2!1sen!2s"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
        <div className="footer-bottom">
          <p>
            &copy; 2024 Diamond Store All Rights Reserved. Website designed,
            maintained, and hosted by Punchmark.{" "}
            <a href="#">Accessibility Statement</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default BridalPage;
