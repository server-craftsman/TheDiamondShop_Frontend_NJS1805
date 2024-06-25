import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination, Button, Checkbox } from "antd";
import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";

function TimepiecePage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [filteredData, setFilteredData] = useState([]);
  const { addToCart } = useCart();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/products/timepieces"
        );
        const data = await response.json();
        setDataSource(data);
        setFilteredData(data); // Initialize filteredData with all data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = filteredData.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const parsePriceRange = (range) => {
    if (range === "Under $480") {
      return (price) => price < 480;
    }
    if (range === "$480-$730") {
      return (price) => price >= 480 && price <= 730;
    }
    if (range === "Over $730") {
      return (price) => price > 731;
    }
    return () => true;
  };

  const handleFilters = (newFilters) => {
    let filtered = dataSource.filter((item) => {
      let passesPrice = true;
      let passesDialColor = true;
      let passesGender = true;

      if (newFilters.Price && newFilters.Price.length > 0) {
        passesPrice = newFilters.Price.some((range) =>
          parsePriceRange(range)(item.Price)
        );
      }

      if (newFilters.DialColor && newFilters.DialColor.length > 0) {
        passesDialColor = newFilters.DialColor.includes(item.DialColor);
      }

      if (newFilters.Gender && newFilters.Gender.length > 0) {
        passesGender = newFilters.Gender.includes(item.Gender);
      }

      return passesPrice && passesDialColor && passesGender;
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilteredData(dataSource);
    setCurrentPage(1); // Reset to first page when filters clear
  };

  // function handleAddToCart(item) {
  //   item.type = "DiamondTimepieces";
  //   addToCart({
  //     name: item.NameTimepieces,
  //     image: item.ImageTimepieces,
  //     price: item.Price,
  //     quantity: 1,
  //     type: item.type,
  //   });
  // }
  return (
    <div>
      <div className="app">
        <div className="filter-section">
        <h3>Price</h3>
          <Checkbox.Group onChange={(values) => handleFilters({ Price: values })}>
            <Row className = "row-column">
              <Checkbox value="Under $480" className="Checkbox">Under $480</Checkbox>
              <Checkbox value="$480-$730" className="Checkbox">$480-$730</Checkbox>
              <Checkbox value="Over $730" className="Checkbox">Over $730</Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <h3>DialColor</h3>
          <Checkbox.Group onChange={(values) => handleFilters({ DialColor: values })}>
            <Row className = "row-column">
              <Checkbox value="White" className="Checkbox">White</Checkbox>
              <Checkbox value="Black" className="Checkbox">Black</Checkbox>
              <Checkbox value="Blue" className="Checkbox">Blue</Checkbox>
              <Checkbox value="Gray" className="Checkbox">Grayd</Checkbox>
              <Checkbox value="Red" className="Checkbox">Red</Checkbox>
              <Checkbox value="Light Blue" className="Checkbox">Light Blue</Checkbox>
              <Checkbox value="Green" className="Checkbox">Green</Checkbox>
              <Checkbox value="Silver-Tone" className="Checkbox">Silver-Tone</Checkbox>
              <Checkbox value="Pink" className="Checkbox">Pink</Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <h3>Gender</h3>
          <Checkbox.Group onChange={(values) => handleFilters({ Gender: values })}>
            <Row className = "row-column">
              <Checkbox value="Women" className="Checkbox">Women</Checkbox>
              <Checkbox value="Men" className="Checkbox">Men</Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <button onClick={clearFilters} className="buttonfilter">Clear Filters</button>
        </div>

        <div className="timepiecepage">
          <Row gutter={16}>
            {currentPageData.map((item, index) => (
              <Col span={8} key={index}>
                <Card
                
                hoverable
                style={{ width: 240 }}
                cover={
                  <Link to={`/timepieces-detail/${item.DiamondTimepiecesID}`}>
                  <Image
                    width="100%"
                    alt={item.NameTimepieces}
                    src={item.ImageTimepieces}
                  />
                  </Link>
                }
              >
                {/* <Card.Meta
                  title={item.NameTimepieces}
                  description={`${item.Price}$`}
                />{" "} */}
                <Card.Meta
                title={
                  <Link to={`/timepieces-detail/${item.DiamondTimepiecesID}`}>
                    {item.TimepiecesStyle.toUpperCase()}
                  </Link>
                }
                description={`${item.Price}$`}
              />
                {/* <Button onClick={() => handleAddToCart(item)}>
                  Add to Cart
                </Button> */}
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
              Ho Chi Minh City (208) 746-2649
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
                <a href="/designer-page">Designers</a>
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

export default TimepiecePage;
