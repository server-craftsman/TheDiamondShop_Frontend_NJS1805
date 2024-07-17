import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination, Button, Checkbox, Input } from "antd";
import { Link } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import './index.scss';
function DiamondPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceDisabled, setPriceDisabled] = useState("");
  const [colorDisabled, setColorDisabled] = useState("");
  const [shapeDisabled, setShapeDisabled] = useState("");
  const [priceFilters, setPriceFilters] = useState([]);
  const [colorFilters, setColorFilters] = useState([]);
  const [shapeFilters, setShapeFilters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/products/diamonds");
        const data = await response.json();
        // Filter out diamonds with Inventory < 1
        const filteredDiamonds = data.filter(
          (diamond) => diamond.Inventory >= 1
        );
        setDataSource(filteredDiamonds);
        setFilteredData(filteredDiamonds); // Initialize filteredData with filtered diamonds
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

    // Disable checkboxes in other groups when one group is selected
    if (newFilters.Price && newFilters.Price.length > 0) {
      // Price is selected, disable Color and Shape checkboxes
      setPriceDisabled(false);
      setColorDisabled(true);
      setShapeDisabled(true);
    } else if (newFilters.Color && newFilters.Color.length > 0) {
      // Color is selected, disable Price and Shape checkboxes
      setPriceDisabled(true);
      setColorDisabled(false);
      setShapeDisabled(true);
    } else if (newFilters.Shape && newFilters.Shape.length > 0) {
      // Shape is selected, disable Price and Color checkboxes
      setPriceDisabled(true);
      setColorDisabled(true);
      setShapeDisabled(false);
    } else {
      // No filters selected, enable all checkboxes
      setPriceDisabled(false);
      setColorDisabled(false);
      setShapeDisabled(false);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilteredData(dataSource);
    setCurrentPage(1); // Reset to first page when filters clear
  
     // Clear checkbox selections by resetting state variables
     setPriceFilters([]); // Replace with your state variable for Price filters
     setColorFilters([]); // Replace with your state variable for Color filters
     setShapeFilters([]); // Replace with your state variable for Shape filters
   
     // Reset checkbox disable states if needed
     setPriceDisabled(false);
     setColorDisabled(false);
     setShapeDisabled(false);
  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    const filtered = dataSource.filter((item) => {
      // General search in all attributes
      return Object.values(item).some((value) => {
        if (typeof value === "string") {
          return value.toLowerCase().includes(searchTerm);
        } else if (typeof value === "number") {
          // Check if the numeric value includes the search term when converted to a string
          return value.toString().toLowerCase().includes(searchTerm);
        }
        return false;
      });
    });
  
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when search term changes
  };

  return (
    <>
      <div className="app">
        <div className="filter-section">
        <h3>Search</h3>
          <Input
            placeholder="Search"
            onChange={handleSearch}
            style={{ marginBottom: 16, 
              width: "100%", 
              height: "50px", 
              fontSize: "20px"}}
          />
          <h3>Price</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ Price: values })}
            disabled={priceDisabled}
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
            onChange={(values) => handleFilters({ Color: values })}
            disabled={colorDisabled}
          >
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
          <Checkbox.Group
            onChange={(values) => handleFilters({ Shape: values })}
            disabled={shapeDisabled}
          >
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
              <Col span={6} key={index} sx={{ maxWidth: '100%', width: '240px', margin: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '450px', textAlign: "center" }}>
                <Card
                  hoverable
                  style={{ width: '240px', height: '450px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                  cover={
                    <Link to={`/diamond-detail/${item.DiamondID}`}>
                      <Image
                        maxWidth="100%"
                        maxHeight="100%"
                        alt={item.DiamondOrigin}
                        src={item.Image}
                      />
                    </Link>
                  }
                >
                  <Card.Grid hoverable={false} maxWidth="100%" style={{width: "100%"}}>
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
                      <div style={{ fontSize: "1.2em", color: "#000000", fontWeight: "bolder" }}>
                        Color: {item.Color}
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
                    
                  </Card.Grid>
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
