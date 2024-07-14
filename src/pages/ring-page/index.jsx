import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination, Checkbox, Input } from "antd";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

function RingPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceDisabled, setPriceDisabled] = useState("");
  const [brandnameDisabled, setBrandNameDisabled] = useState("");
  const [categoryDisabled, setCategoryDisabled] = useState("");
  const [ringsizeDisabled, setRingSizeDisabled] = useState("");
  const [priceFilters, setPriceFilters] = useState([]);
  const [brandnameFilters, setBrandNameFilters] = useState([]);
  const [categoryFilters, setCategoryFilters] = useState([]);
  const [ringsizeFilters, setRingSizeFilters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/products/diamond-rings"
        );
        const data = await response.json();
        const filteredDiamondRings = data.filter((ring) => ring.Inventory >= 1);
        setDataSource(filteredDiamondRings);
        setFilteredData(filteredDiamondRings); // Initialize filteredData with all data
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
      let passesRingSize = true;

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

      if (newFilters.RingSize && newFilters.RingSize.length > 0) {
        passesRingSize = newFilters.RingSize.some(
          (size) => parseFloat(size) === item.RingSize
        );
      }

      return (
        passesPrice && passesBrandName && passesCategory && passesInventory && passesRingSize
      );
    });

    if (newFilters.Price && newFilters.Price.length > 0) {
      setPriceDisabled(false);
      setBrandNameDisabled(true);
      setCategoryDisabled(true);
      setRingSizeDisabled(true);
    } else if (newFilters.BrandName && newFilters.BrandName.length > 0) {
      setPriceDisabled(true);
      setBrandNameDisabled(false);
      setCategoryDisabled(true);
      setRingSizeDisabled(true);
    } else if (newFilters.Category && newFilters.Category.length > 0) {
      setPriceDisabled(true);
      setBrandNameDisabled(true);
      setCategoryDisabled(false);
      setRingSizeDisabled(true);
    } else if (newFilters.RingSize && newFilters.RingSize.length > 0) {

      setPriceDisabled(true);
      setBrandNameDisabled(true);
      setCategoryDisabled(true);
      setRingSizeDisabled(false);
    } else {
      setPriceDisabled(false);
      setBrandNameDisabled(false);
      setCategoryDisabled(false);
      setRingSizeDisabled(false);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilteredData(dataSource);
    setCurrentPage(1); // Reset to first page when filters clear
  
    setPriceFilters([]);
    setBrandNameFilters([]);
    setCategoryFilters([]);
    setRingSizeFilters([]);

    setPriceDisabled(false);
    setBrandNameDisabled(false);
    setCategoryDisabled(false);
    setRingSizeDisabled(false);

  };

  const handleSearch = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  
    const filtered = dataSource.filter((item) => {
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
    <div>
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
            onChange={(values) => handleFilters({ BrandName: values })}
            disabled={brandnameDisabled}
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
            disabled={categoryDisabled}
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
          <h3>Size</h3>
          <Checkbox.Group onChange={(values) => handleFilters({ RingSize: values })} disabled={ringsizeDisabled}>
            <Row className = "row-column">
            <Checkbox value="5.00" className="Checkbox">5.00</Checkbox>
              <Checkbox value="5.25" className="Checkbox">5.25</Checkbox>
              <Checkbox value="5.50" className="Checkbox">5.50</Checkbox>
              <Checkbox value="5.75" className="Checkbox">5.75</Checkbox>
              <Checkbox value="6.00" className="Checkbox">6.00</Checkbox>
              <Checkbox value="6.25" className="Checkbox">6.25</Checkbox>
              <Checkbox value="6.50" className="Checkbox">6.50</Checkbox>
              <Checkbox value="6.75" className="Checkbox">6.75</Checkbox>
              <Checkbox value="7.00" className="Checkbox">7.00</Checkbox>
              <Checkbox value="7.25" className="Checkbox">7.25</Checkbox>
              <Checkbox value="7.50" className="Checkbox">7.50</Checkbox>
              <Checkbox value="7.75" className="Checkbox">7.75</Checkbox>
              <Checkbox value="8.00" className="Checkbox">8.00</Checkbox>
              <Checkbox value="8.25" className="Checkbox">8.25</Checkbox>
              <Checkbox value="8.50" className="Checkbox">8.50</Checkbox>
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
                            color: "#000000",
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
                          {item.Material.toUpperCase()} -{" "}
                          {item.Category.toUpperCase()}
                        </div>
                        {/* <div
                          style={{
                            fontSize: "1.2em",
                            color: "#000000",
                            fontWeight: "bolder",
                          }}
                        >
                          Size: {item.RingSize}
                        </div> */}

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
