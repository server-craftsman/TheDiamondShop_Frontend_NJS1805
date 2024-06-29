import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination, Button, Checkbox } from "antd";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

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
                    // <Link to={`/diamond-detail/${item.DiamondID}`}>
                      <Image
                        maxWidth="100%"
                        maxHeight="100%"
                        alt={item.DiamondOrigin}
                        src={item.Image}
                      />
                    // </Link>
                  }
                >
                  <Card.Meta
                    title={
                      <Link
                        to={`/diamond-detail/${item.DiamondID}`}
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
                          {item.StockNumber.toUpperCase()}
                        </div>
                        <div style={{ fontSize: "1em", color: "#757575" }}>
                          {item.Clarity}
                        </div>
                        <div style={{ fontSize: "1em", color: "#757575" }}>
                          {item.Color}
                        </div>
                      </Link>
                    }
                    description={
                      <div style={{ fontSize: "1.5em", fontWeight: "bold" }}>
                        {`${item.Price}$`}
                      </div>
                    }
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
<Footer />
      </>
  );
}

export default DiamondPage;
