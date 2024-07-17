import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination, Button, Checkbox, Input } from "antd";
import { useCart } from "../../CartContext";
import { Link } from "react-router-dom";
import Footer from "../../components/footer";

function TimepiecePage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);
  const [filteredData, setFilteredData] = useState([]);
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceDisabled, setPriceDisabled] = useState("");
  const [dialcolorDisabled, setDialColorDisabled] = useState("");
  const [genderDisabled, setGenderDisabled] = useState("");
  const [priceFilters, setPriceFilters] = useState([]);
  const [dialcolorFilters, setDialColorFilters] = useState([]);
  const [genderFilters, setGenderFilters] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8090/products/timepieces"
        );
        const data = await response.json();
        const filteredDiamondTimepieces = data.filter(
          (timepieces) => timepieces.Inventory >= 1
        );
        setDataSource(filteredDiamondTimepieces);
        setFilteredData(filteredDiamondTimepieces); // Initialize filteredData with all data
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

    if (newFilters.Price && newFilters.Price.length > 0) {
      setPriceDisabled(false);
      setDialColorDisabled(true);
      setGenderDisabled(true);
    } else if (newFilters.DialColor && newFilters.DialColor.length > 0) {
      setPriceDisabled(true);
      setDialColorDisabled(false);
      setGenderDisabled(true);
    } else if (newFilters.Gender && newFilters.Gender.length > 0) {
      setPriceDisabled(true);
      setDialColorDisabled(true);
      setGenderDisabled(false);
    } else {
      setPriceDisabled(false);
      setDialColorDisabled(false);
      setGenderDisabled(false);
    }

    setFilteredData(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const clearFilters = () => {
    setFilteredData(dataSource);
    setCurrentPage(1); // Reset to first page when filters clear
  
    setPriceFilters([]);
    setGenderFilters([]);
    setDialColorFilters([]);

    setPriceDisabled(false);
    setDialColorDisabled(false);
    setGenderDisabled(false);

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
            disabled={dialcolorDisabled}
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
            disabled={genderDisabled}
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
              <Col span={6} key={index} sx={{
                  maxWidth: '100%',
                  width: '240px',
                  margin: '3px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height:'520px',
                  textAlign: "center"
                }}>
                <Card
                  hoverable
                  style={{
                    width: '240px',
                    height: '520px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
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
