import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination, Button, Checkbox } from "antd";
import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

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
  return (
    <div>
      <div className="app">
        <div className="filter-section">
          <h3>Price</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ Price: values })}
          >
            <Row className="row-column">
              <Checkbox value="Under $480" className="Checkbox">
                Under $480
              </Checkbox>
              <Checkbox value="$480-$730" className="Checkbox">
                $480-$730
              </Checkbox>
              <Checkbox value="Over $730" className="Checkbox">
                Over $730
              </Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <h3>DialColor</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ DialColor: values })}
          >
            <Row className="row-column">
              <Checkbox value="White" className="Checkbox">
                White
              </Checkbox>
              <Checkbox value="Black" className="Checkbox">
                Black
              </Checkbox>
              <Checkbox value="Blue" className="Checkbox">
                Blue
              </Checkbox>
              <Checkbox value="Gray" className="Checkbox">
                Grayd
              </Checkbox>
              <Checkbox value="Red" className="Checkbox">
                Red
              </Checkbox>
              <Checkbox value="Light Blue" className="Checkbox">
                Light Blue
              </Checkbox>
              <Checkbox value="Green" className="Checkbox">
                Green
              </Checkbox>
              <Checkbox value="Silver-Tone" className="Checkbox">
                Silver-Tone
              </Checkbox>
              <Checkbox value="Pink" className="Checkbox">
                Pink
              </Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <h3>Gender</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ Gender: values })}
          >
            <Row className="row-column">
              <Checkbox value="Women" className="Checkbox">
                Women
              </Checkbox>
              <Checkbox value="Men" className="Checkbox">
                Men
              </Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <button onClick={clearFilters} className="buttonfilter">
            Clear Filters
          </button>
        </div>

        <div className="timepiecepage">
          <Row gutter={16}>
            {currentPageData.map((item, index) => (
              <Col span={6} key={index}>
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
                  <Card.Meta
                    title={
                      <Link
                        to={`/timepieces-detail/${item.DiamondTimepiecesID}`}
                      >
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
                            color: "#000000",
                          }}
                        >
                          {item.NameTimepieces.toUpperCase()}
                        </div>
                        
                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "0.8em",
                            color: "#999999",
                          }}
                        >
                        Gender: {item.Gender}
                        </div>
                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "0.8em",
                            color: "#999999",
                            maxHeight: "500px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "pre-line", // Correct the property name
                            display: "-webkit-box",
                            WebkitLineClamp: 4, // Correct the property name
                            WebkitBoxOrient: "vertical", // Correct the property name                          
                          }}
                        >
                        Collection: {item.Collection}
                        </div>

                        <div
                          style={{
                            marginTop: "8px",
                            fontSize: "1.2em",
                            fontWeight: "bolder",
                            color: "#000000",
                          }}
                        >
                        CaseSize: {item.CaseSize}
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

export default TimepiecePage;
