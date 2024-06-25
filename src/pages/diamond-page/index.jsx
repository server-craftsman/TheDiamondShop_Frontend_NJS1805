import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";

function DiamondPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/products/diamonds");
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
    switch (range) {
      case "Under $1000":
        return (price) => price < 1000;
      case "$1001-$2000":
        return (price) => price >= 1001 && price <= 2000;
      case "$2001-$3000":
        return (price) => price >= 2001 && price <= 3000;
      case "$3001-$4000":
        return (price) => price >= 3001 && price <= 4000;
      case "$4001-$5000":
        return (price) => price >= 4001 && price <= 5000;
      case "Over $5001":
        return (price) => price > 5001;
      default:
        return () => true;
    }
  };

  const handleFilters = (newFilters) => {
    let filtered = dataSource.filter((item) => {
      let passesPrice = true;
      let passesColor = true;
      let passesShape = true;

      if (newFilters.Price && newFilters.Price.length > 0) {
        passesPrice = newFilters.Price.some((range) =>
          parsePriceRange(range)(item.Price)
        );
      }

      if (newFilters.Color && newFilters.Color.length > 0) {
        passesColor = newFilters.Color.includes(item.Color);
      }

      if (newFilters.Shape && newFilters.Shape.length > 0) {
        passesShape = newFilters.Shape.includes(item.Shape);
      }

      return passesPrice && passesColor && passesShape;
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilteredData(dataSource);
    setCurrentPage(1); // Reset to first page when filters clear
  };



  return (
    <>
    <div className="app">
      <div className="filter-section">
        <h3>Price</h3>
        <Checkbox.Group onChange={(values) => handleFilters({ Price: values })}>
          <Row className="row-column">
            <Checkbox value="Under $1000" className="Checkbox">
              Under $1000
            </Checkbox>
            <Checkbox value="$1001-$2000" className="Checkbox">
              $1001-$2000
            </Checkbox>
            <Checkbox value="$2001-$3000" className="Checkbox">
              $2001-$3000
            </Checkbox>
            <Checkbox value="$3001-$4000" className="Checkbox">
              $3001-$4000
            </Checkbox>
            <Checkbox value="$4001-$5000" className="Checkbox">
              $4001-$5000
            </Checkbox>
            <Checkbox value="Over $5001" className="Checkbox">
              Over $5001
            </Checkbox>
          </Row>
        </Checkbox.Group>
        <hr />
        <h3>Color</h3>
        <Checkbox.Group onChange={(values) => handleFilters({ Color: values })}>
          <Row>
            <Checkbox value="D" className="Checkbox">
              D
            </Checkbox>
            <Checkbox value="E" className="Checkbox">
              E
            </Checkbox>
            <Checkbox value="F" className="Checkbox">
              F
            </Checkbox>
            <Checkbox value="H" className="Checkbox">
              H
            </Checkbox>
            <Checkbox value="I" className="Checkbox">
              I
            </Checkbox>
            <Checkbox value="J" className="Checkbox">
              J
            </Checkbox>
            <Checkbox value="K" className="Checkbox">
              K
            </Checkbox>
          </Row>
        </Checkbox.Group>
        <hr />
        <h3>Shape</h3>
        <Checkbox.Group onChange={(values) => handleFilters({ Shape: values })}>
          <Row className="row-column">
            <Checkbox value="Round" className="Checkbox">
              Round
            </Checkbox>
            <Checkbox value="Princess" className="Checkbox">
              Princess
            </Checkbox>
            <Checkbox value="Cushion" className="Checkbox">
              Cushion
            </Checkbox>
            <Checkbox value="Emerald" className="Checkbox">
              Emerald
            </Checkbox>
          </Row>
        </Checkbox.Group>
        <hr />
        <button onClick={clearFilters} className="buttonfilter">
          Clear Filters
        </button>
      </div>
      <div className="diamondpage">
        <Row gutter={16}>
          {currentPageData.map((item, index) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                style={{ width: 240 }}
                cover={
                  <Link to={`/diamond-detail/${item.DiamondID}`}>
                    <Image
                      width="100%"
                      alt={item.DiamondOrigin}
                      src={item.Image}
                    />
                  </Link>
                }
              >
                <Card.Meta
                  title={
                    <Link to={`/diamond-detail/${item.DiamondID}`}>
                      {item.DiamondOrigin.toUpperCase()}
                    </Link>
                  }
                  description={`${item.Price}$`}
                />
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
              title="Store Location"
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
            © 2024 Diamond Store All Rights Reserved. Website designed,
            maintained, and hosted by Punchmark.{" "}
            <a href="#">Accessibility Statement</a>.
          </p>
        </div>
      </footer>
      </>
  );
}

export default DiamondPage;
