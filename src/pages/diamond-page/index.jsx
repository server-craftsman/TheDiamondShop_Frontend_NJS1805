// import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination } from "antd";

function DiamondPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/products/diamond");
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
    <div className="diamondpage">
      <h1>Diversity of diamond patterns</h1>
      <h1>Let's choose your favorite color</h1>
      <Row gutter={16}>
        {currentPageData.map((item, index) => (
          <Col span={8} key={index}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <Image
                  width="100%"
                  alt={item.DiamondOrigin}
                  src={item.Image}
                />
              }
            >
              <Card.Meta
                title={item.DiamondOrigin}
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
  );
}

export default DiamondPage;
