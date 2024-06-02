//import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination, Button } from "antd";

function DesignerPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/products/designer");
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
    <div className="designerpage">
      <Row gutter={16}>
        {currentPageData.map((item, index) => (
          <Col span={8} key={index}>
            <Card hoverable style={{ width: 240 }} className="designer-card">
              <div className="image-container">
                <Image width="100%" alt={item.BrandName} src={item.ImageLogo} />
                <div className="overlay">
                  <span className="brand-name">{item.BrandName}</span>
                  <div className="button-group">
                    <Button href="#" className="button">
                      Shop
                    </Button>
                    <Button href="#" className="button">
                      Learn
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        total={dataSource.length}
        pageSize={itemsPerPage}
        onChange={handlePageChange}
      />
    </div>
  );
}

export default DesignerPage;
