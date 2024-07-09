import "./index.scss";
import { useEffect, useState } from "react";
import {
  Card,
  Image,
  Col,
  Row,
  Pagination,
  Checkbox,
} from "antd";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

function RingPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/products/diamond-rings"
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
      let passesBrandName = true;
      let passesCategory = true;
      let passesInventory = item.Inventory >= 1; // Filter for Inventory >= 1

      if (newFilters.Price && newFilters.Price.length > 0) {
        passesPrice = newFilters.Price.some((range) =>
          parsePriceRange(range)(item.Price)
        );
      }

      if (newFilters.BrandName && newFilters.BrandName.length > 0) {
        passesBrandName = newFilters.BrandName.includes(item.BrandName);
      }

      if (newFilters.Category && newFilters.Category.length > 0) {
        passesCategory = newFilters.Category.includes(item.Category);
      }

      return passesPrice && passesBrandName && passesCategory && passesInventory;
    });

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilteredData(dataSource);
    setCurrentPage(1); // Reset to first page when filters clear
  };

  return (
    <div>
      <div className="app">
        <div className="filter-section">
          <h3>Price</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ Price: values })}
          >
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
          <Checkbox.Group
            onChange={(values) => handleFilters({ BrandName: values })}
          >
            <Row className="row-column">
              <Checkbox value="Simon G" className="Checkbox">
                Simon G
              </Checkbox>
              <Checkbox value="Allison Kaufman" className="Checkbox">
                Allison Kaufman
              </Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <h3>Gender</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ Category: values })}
          >
            <Row className="row-column">
              <Checkbox value="Gemstone Fashion Rings" className="Checkbox">
                Gemstone Fashion Rings
              </Checkbox>
              <Checkbox value="Diamond Fashion Rings" className="Checkbox">
                Diamond Fashion Rings
              </Checkbox>
              <Checkbox value="Women`s Wedding Bands" className="Checkbox">
                Women`s Wedding Bands
              </Checkbox>
              <Checkbox value="Rings" className="Checkbox">
                Rings
              </Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <button onClick={clearFilters} className="buttonfilter">
            Clear Filters
          </button>
        </div>

        <div className="ringpage">
          <Row gutter={16}>
            {currentPageData.map((item, index) => (
              <Col span={6} key={index}>
                <Card
                  hoverable
                  style={{ width: 240, height: "auto" }}
                  cover={
                    <Link to={`/ring-detail/${item.DiamondRingsID}`}>
                      <Image
                        width="100%"
                        alt={item.NameRings}
                        src={item.ImageRings}
                      />
                    </Link>
                  }
                >
                  <Card.Meta
                    title={
                      <Link to={`/ring-detail/${item.DiamondRingsID}`}>
                        <div
                          style={{
                            maxHeight: "500px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "pre-line", // Correct the property name
                            display: "-webkit-box",
                            WebkitLineClamp: 4, // Correct the property name
                            WebkitBoxOrient: "vertical", // Correct the property name
                            fontSize: "0.9rem",
                            color: "#000000"
                          }}
                        >
                          {item.NameRings.toUpperCase()}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8rem",
                            color: "#888888",
                            maxHeight: "500px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "pre-line", // Correct the property name
                            display: "-webkit-box",
                            WebkitLineClamp: 4, // Correct the property name
                            WebkitBoxOrient: "vertical", // Correct the property name
                        
                          }}
                        >
                        {item.Material.toUpperCase()} - {item.Category.toUpperCase()}
                        </div>
                        <div
                          style={{
                            fontSize: "1.2em",
                            color: "#000000",
                            fontWeight: "bolder"
                          }}
                        >
                        Size: {item.RingSize}
                        </div>

                        <div
                    style={{
                      fontSize: "1.5em",
                      fontWeight: "bold",
                      color: "#FFFFFF",
                      backgroundColor: "#000000",
                      padding: "8px 16px",
                      marginTop: "8px",
                      borderRadius: "4px",
                      textAlign: "center",
                    }}
                  >
                    {`${item.Price}$`}
                  </div>

                      </Link>
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
    </div>
  );
}

export default RingPage;
