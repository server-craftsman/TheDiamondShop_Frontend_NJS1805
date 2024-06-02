// import Carousel from "../../components/carousel";
// import Header from "../../components/header";
import "./index.scss";
import { useEffect, useState } from "react";
import { Card, Image, Col, Row, Pagination } from "antd";

function TimepiecePage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); 

  useEffect(() => {
   
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/products/timepieces");
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
    <div className="timepiecepage">
      <Row gutter={16}>
        {currentPageData.map((item, index) => (
          <Col span={8} key={index}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <Image
                  width="100%"
                  alt={item.NameTimepieces}
                  src={item.ImageTimepieces}
                />
              
              }
            >
              <Card.Meta
                title={item.NameTimepieces}
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

export default TimepiecePage;
