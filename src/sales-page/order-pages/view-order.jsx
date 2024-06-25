import { useEffect, useState} from "react";
import { Button, Table } from "antd";
//import { Link} from "react-router-dom";
import axios from "axios";
import './orderpages.scss'

const ViewOrder = () => {
  //const [collapsed, setCollapsed] = useState(false);
  const [orderdetail, setOrderDetail] = useState([]);

  const columns = [
    {
      title: "OrderID",
      dataIndex: "OrderID",
      key: "OrderID",
    },
    {
      title: "Orderdate",
      dataIndex: "Orderdate",
      key: "Orderdate",
      sorter: (record1, record2) => {
        const date1 = new Date(record1.Orderdate);
        const date2 = new Date(record2.Orderdate);
        return date1 - date2;
      },
    },
    {
      title: "Firstname",
      dataIndex: "Firstname",
      key: "Firstname",
    },
    {
      title: "Lastname",
      dataIndex: "Lastname",
      key: "Lastname",
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "TotalPrice",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    },
    {
      title: "OrderStatus",
      dataIndex: "OrderStatus",
      key: "OrderStatus",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Button onClick={() => handleVerifyOrder(record.OrderID)}>
          Verify Order
        </Button>
      ),
    }
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/features/view-order");
      setOrderDetail(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifyOrder = async (orderID) => {
    try {
      const response = await axios.put(
        "http://localhost:8090/features/update-order-status-sale",
        { orderID }
      );
      console.log("Order verified successfully:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error verifying order:", error);
    }
  };

  return ( 
          <Table dataSource={orderdetail} columns={columns} />
  );
};

export default ViewOrder;
