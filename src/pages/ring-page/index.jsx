// import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination } from "antd";

function RingPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/products/diamond-rings"
        );
        const data = await response.json();
        setDataSource(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = dataSource.slice(startIndex, endIndex);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="app">
        <div className="filter-section">
          <h2>Price</h2>
          <label>
            <input type="checkbox" /> Under $480
          </label>
          <br />
          <label>
            <input type="checkbox" /> $480-$730
          </label>
          <br />
          <label>
            <input type="checkbox" /> Over $730
          </label>

          <h2>Brands</h2>
          <label>
            <input type="checkbox" /> Citizen
          </label>

          <h2>Gender</h2>
          <label>
            <input type="checkbox" /> Men`s
          </label>
          <br />
          <label>
            <input type="checkbox" /> Women`s
          </label>
        </div>
        <div className="ringpage">
          <Row gutter={16}>
            {currentPageData.map((item, index) => (
              <Col span={8} key={index}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <Image
                      width="100%"
                      alt={item.NameRings}
                      src={item.ImageRings}
                    />
                  }
                >
                  <Card.Meta
                    title={item.NameRings}
                    description={`${item.Price}$`}
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            total={dataSource.length}
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
                <a href="/desginer-page">Designers</a>
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

export default RingPage;
