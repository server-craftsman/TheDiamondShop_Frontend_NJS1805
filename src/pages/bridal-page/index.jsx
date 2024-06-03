import { useEffect, useState } from "react";
import "./index.scss";
import { Card, Image, Col, Row, Pagination } from "antd";

function BridalPage() {
  const [dataSource, setDataSource] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10); // Default items per page

  useEffect(() => {
    // Function to fetch data from the API
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/products/bridals");
        const data = await response.json();
        setDataSource(data); // Update state with data from the API
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
  const currentPageData = dataSource.slice(startIndex, endIndex);
  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bridalpage">
      <Row gutter={16}>
        {currentPageData.map((item, index) => (
          <Col span={8} key={index}>
            <Card
              hoverable
              style={{ width: 240 }}
              cover={
                <Image
                  width="100%"
                  alt={item.NameBridal}
                  src={item.ImageBridal}
                />
              }
            >
              <Card.Meta
                title={item.NameBridal}
                description={`${item.Price}$`}
              />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        defaultCurrent={currentPage}
        total={dataSource.length}
        defaultPageSize={itemsPerPage}
        onChange={handlePageChange}
        onShowSizeChange={(currentPage, size) => {
          setItemsPerPage(size); // Cập nhật kích thước trang mới
        }}
        showQuickJumper
        showTotal={(total) => `Total ${total} item`}
      />
    </div>
  );
}

export default BridalPage;
