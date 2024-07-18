import { useEffect, useState } from "react";
import "./index.scss";
import { Card, Image, Col, Row, Pagination, Button, Checkbox, Input } from "antd";
import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

function BridalPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12); // Default items per page
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceDisabled, setPriceDisabled] = useState("");
  const [materialDisabled, setMaterialDisabled] = useState("");
  const [genderDisabled, setGenderDisabled] = useState("");
  const [ringsizerangDisabled, setRingSizeRangDisabled] = useState("");
  const [priceFilters, setPriceFilters] = useState([]);
  const [materialFilters, setMaterialFilters] = useState([]);
  const [genderFilters, setGenderFilters] = useState([]);
  const [ringsizerangFilters, setRingSizeRangFilters] = useState([]);
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
      let passesRingSizeRang = true;

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

      if (newFilters.RingSizeRang && newFilters.RingSizeRang.length > 0) {
        passesRingSizeRang = newFilters.RingSizeRang.some(
          (size) => parseFloat(size) === item.RingSizeRang
        );
      }

      return passesPrice && passesMaterial && passesGender && passesRingSizeRang;
    });

    if (newFilters.Price && newFilters.Price.length > 0) {
      setPriceDisabled(false);
      setMaterialDisabled(true);
      setGenderDisabled(true);
      setRingSizeRangDisabled(true);
    } else if (newFilters.Material && newFilters.Material.length > 0) {
      setPriceDisabled(true);
      setMaterialDisabled(false);
      setGenderDisabled(true);
      setRingSizeRangDisabled(true);
    } else if (newFilters.Gender && newFilters.Gender.length > 0) {
      setPriceDisabled(true);
      setMaterialDisabled(true);
      setGenderDisabled(false);
      setRingSizeRangDisabled(true);
    } else if (newFilters.RingSizeRang && newFilters.RingSizeRang.length > 0) {

      setPriceDisabled(true);
      setMaterialDisabled(true);
      setGenderDisabled(true);
      setRingSizeRangDisabled(false);
    } else {
      setPriceDisabled(false);
      setMaterialDisabled(false);
      setGenderDisabled(false);
      setRingSizeRangDisabled(false);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilteredData(dataSource);
    setCurrentPage(1); // Reset to first page when filters clear

    setPriceFilters([]);
    setGenderFilters([]);
    setMaterialFilters([]);
    setRingSizeRangFilters([]);

    setPriceDisabled(false);
    setMaterialDisabled(false);
    setGenderDisabled(false);
    setRingSizeRangDisabled(false);

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
            style={{
              marginBottom: 16,
              width: "100%",
              height: "50px",
              fontSize: "20px"
            }}
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
          {/* <hr />
          <h3>Color</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ Material: values })}
            disabled={materialDisabled}
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
          </Checkbox.Group> */}
          <hr />
          <h3>Gender</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ Gender: values })}
            disabled={genderDisabled}
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
          {/* <hr />
          <h3>Ring Size Range</h3>
          <Checkbox.Group
            onChange={(values) => handleFilters({ RingSizeRang: values })}
            disabled={ringsizerangDisabled}
          >
            <Row className="row-column">
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
          </Checkbox.Group> */}
          <hr />
          <button onClick={clearFilters} className="buttonfilter">
            Clear Filters
          </button>
        </div>

        <div className="bridalpage">
          <Row gutter={16}>
            {currentPageData.map((item, index) => (
              <Col span={6} key={index} sx={{ maxWidth: '100%', width: '240px', margin: '3px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', textAlign: "center" }}>
                <Card
                  hoverable
                  style={{ width: '240px', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
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
                        {/* <div
                          style={{
                            fontSize: "1.2em",
                            marginTop: "4px",
                            color: "#000000",
                            fontWeight: "bolder",
                          }}
                        >
                          Size: {item.RingSizeRang}
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

export default BridalPage;
