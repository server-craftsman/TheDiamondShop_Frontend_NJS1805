import { useEffect, useState } from "react";
import "./index.scss";
import { Card, Image, Col, Row, Pagination, Button, Checkbox } from "antd";
import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

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

        const filteredBridals = data.filter((bridal) => bridal.Inventory >= 1);
        setDataSource(filteredBridals); // Update state with data from the API
        setFilteredData(filteredBridals); // Initialize filteredData with all data
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
    item.type = "Bridal";
    addToCart({
      id: item.BridalID,
      name: item.NameBridal,
      image: item.ImageBridal,
      price: item.Price,
      quantity: 1,
      type: item.type, // Hoặc số lượng mà người dùng chọn
    });
  }

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
            onChange={(values) => handleFilters({ Material: values })}
          >
            <Row className="row-column">
              <Checkbox value="Platinum" className="Checkbox">
                Platinum
              </Checkbox>
              <Checkbox value="14K White Gold" className="Checkbox">
                14K White Gold
              </Checkbox>
              <Checkbox value="18K White Gold" className="Checkbox">
                18K White Gold
              </Checkbox>
              <Checkbox value="14K Yellow Gold" className="Checkbox">
                14K Yellow Gold
              </Checkbox>
              <Checkbox value="18K Yellow Gold" className="Checkbox">
                18K Yellow Gold
              </Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <h3>Gender</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ Gender: values })}
          >
            <Row className="row-column">
              <Checkbox value="Womens" className="Checkbox">
                Womens
              </Checkbox>
              <Checkbox value="Mans" className="Checkbox">
                Mans
              </Checkbox>
            </Row>
          </Checkbox.Group>
          <hr />
          <button onClick={clearFilters} className="buttonfilter">
            Clear Filters
          </button>
        </div>

        <div className="bridalpage">
          <Row gutter={16}>
            {currentPageData.map((item, index) => (
              <Col span={6} key={index}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={
                    <Link to={`/bridal-detail/${item.BridalID}`}>
                      <Image
                        width="100%"
                        alt={item.NameBridal}
                        src={item.ImageBridal}
                      />
                    </Link>
                  }
                >
                  <Card.Meta
                    title={
                      <Link to={`/bridal-detail/${item.BridalID}`}>
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
                          {item.NameBridal.toUpperCase()}
                        </div>
                        <div
                          style={{
                            fontSize: "0.8em",
                            marginTop: "4px",
                            color: "#888888",
                          }}
                        >
                          {item.Material} - {item.Gender}
                        </div>
                        <div
                          style={{
                            fontSize: "1.2em",
                            marginTop: "4px",
                            color: "#000000",
                            fontWeight: "bolder",
                          }}
                        >
                          Size: {item.RingSizeRang}
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

export default BridalPage;
