// import React, { useContext, useState, useEffect } from "react";
// import { Table } from "antd";
// import "../historyOrder-page/index.scss";
// import { AuthContext } from "../../AuthContext";
// import axios from "axios";
// import { Link } from "react-router-dom";
// import moment from "moment";
// function HistoryOrder() {
//   const { user } = useContext(AuthContext); // Assuming user and token are available in AuthContext
//   const [historyOrders, setHistoryOrders] = useState([]);

//   useEffect(() => {
//     fetchHistoryOrders();
//   }, [user]); // Ensure useEffect runs when user changes

//   const fetchHistoryOrders = async () => {
//     try {
//       const token = user?.token; // Retrieve token from AuthContext

//       if (!token) {
//         console.error('Token not found in AuthContext');
//         return;
//       }

//       const response = await fetch('http://localhost:8090/auth/history-order', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`,
//         },
//         credentials: 'include', // Ensure credentials are sent
//       });

//       const data = await response.json();
//       console.log('Fetch response:', data);

//       if (response.ok) {
//         setHistoryOrders(data.historyOrder || []);
//       } else {
//         if (response.status === 401) {
//           console.error('Access denied. Invalid token.');
//           logout(); // Logout user on 401 Unauthorized
//           message.error('Session expired. Please log in again.'); // Notify the user
//         } else {
//           console.error(data.message || 'Failed to fetch history orders');
//         }
//       }
//     } catch (error) {
//       console.error('Fetch error:', error);
//     }

//   };


//   const columns = [
//     {
//       title: "Order ID",
//       dataIndex: "OrderID",
//       key: "OrderID",
//     },
//     {
//       title: "Order Date",
//       dataIndex: "OrderDate",
//       key: "OrderDate",
//       render: (text) => moment(text).format("YYYY-MM-DD"), // Format the date here
//     },
//     {
//       title: "Quantity",
//       dataIndex: "Quantity",
//       key: "Quantity",
//     },
//     {
//       title: "Order Status",
//       dataIndex: "OrderStatus",
//       key: "OrderStatus",
//     },
//     {
//       title: "Total Price",
//       dataIndex: "TotalPrice",
//       key: "TotalPrice",
//     },
//     {
//       title: "View Details",
//       key: "action",
//       render: (text, record) => (
//         <Link to={`/history-order-details/${record.OrderID}`}>View Details</Link>
//       ),
//     },
//   ];

//   const sortedHistoryOrders = [...historyOrders].sort(
//     (a, b) => new Date(b.OrderDate) - new Date(a.OrderDate)
//   );

//   return (
//     <div className="history">
//       <h1>History Order</h1>
//       <Table columns={columns} dataSource={sortedHistoryOrders} rowKey="OrderID" />
//     </div>
//   );
// }

// export default HistoryOrder;



import React, { useContext, useState, useEffect } from "react";
import { Table, Tag, message } from "antd";
import { CheckCircleOutlined, ClockCircleOutlined, CloseCircleOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import "../historyOrder-page/index.scss";
import { AuthContext } from "../../AuthContext";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

function HistoryOrder() {
  const { user, logout } = useContext(AuthContext); // Assuming logout function is available in AuthContext
  const [historyOrders, setHistoryOrders] = useState([]);

  useEffect(() => {
    fetchHistoryOrders();
  }, [user]); // Ensure useEffect runs when user changes

  const fetchHistoryOrders = async () => {
    try {
      const token = user?.token; // Retrieve token from AuthContext

      if (!token) {
        console.error('Token not found in AuthContext');
        return;
      }

      const response = await fetch('http://localhost:8090/auth/history-order', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        credentials: 'include', // Ensure credentials are sent
      });

      const data = await response.json();
      console.log('Fetch response:', data);

      if (response.ok) {
        setHistoryOrders(data.historyOrder || []);
      } else {
        if (response.status === 401) {
          console.error('Access denied. Invalid token.');
          logout(); // Logout user on 401 Unauthorized
          message.error('Session expired. Please log in again.'); // Notify the user
        } else {
          console.error(data.message || 'Failed to fetch history orders');
        }
      }
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  const getStatusTag = (status) => {
    let color;
    let displayText;
    let icon;

    switch (status) {
      case "Completed":
        color = "green";
        displayText = "Completed";
        icon = <CheckCircleOutlined />;
        break;
      case "Pending":
        color = "orange";
        displayText = "Pending";
        icon = <ClockCircleOutlined />;
        break;
      case "Cancelled":
        color = "red";
        displayText = "Cancelled";
        icon = <CloseCircleOutlined />;
        break;
      default:
        color = "blue";
        displayText = status;
        icon = <QuestionCircleOutlined />;
    }

    return <Tag color={color} icon={icon}>{displayText}</Tag>;
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "OrderID",
      key: "OrderID",
    },
    {
      title: "Order Date",
      dataIndex: "OrderDate",
      key: "OrderDate",
      render: (text) => moment(text).format("YYYY-MM-DD"), // Format the date here
    },
    {
      title: "Quantity",
      dataIndex: "Quantity",
      key: "Quantity",
    },
    {
      title: "Order Status",
      dataIndex: "OrderStatus",
      key: "OrderStatus",
      render: (status) => getStatusTag(status), // Render the status with a tag
    },
    {
      title: "Total Price",
      dataIndex: "TotalPrice",
      key: "TotalPrice",
    },
    {
      title: "View Details",
      key: "action",
      render: (text, record) => (
        <Link to={`/history-order-details/${record.OrderID}`}>View Details</Link>
      ),
    },
  ];

  const sortedHistoryOrders = [...historyOrders].sort(
    (a, b) => new Date(b.OrderDate) - new Date(a.OrderDate)
  );

  return (
    <div className="history">
      <h1>History Order</h1>
      <Table columns={columns} dataSource={sortedHistoryOrders} rowKey="OrderID" />
    </div>
  );
}

export default HistoryOrder;
