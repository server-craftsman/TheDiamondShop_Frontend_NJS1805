// import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination } from "antd";

function RingPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/products/diamond-ring");
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
    <div className="ringpage">
    
      <h1>The ring makes you noble and shows your class</h1>
      <h1>Choose what suits you</h1>
      <Row gutter={16}>
        {currentPageData.map((item, index) => (
          <Col span={8} key={index}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <Image
                  width="100%"
                  alt={item.NameRings}
                  src={item.ImageRings}
                />
              }
            >
              <Card.Meta
                title={item.NameRings}
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
        
      />    
 
    </div>
  );
}

export default RingPage;
