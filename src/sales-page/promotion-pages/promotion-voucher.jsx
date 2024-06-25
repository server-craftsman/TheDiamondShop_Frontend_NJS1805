//import React from 'react'
import { useEffect, useState } from "react";
import { Button, Layout, Menu, Table, theme } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function PromotionVoucher() {
  const [collapsed, setCollapsed] = useState(false);
  const [promotionVoucher, setpromotionVoucher] = useState([]);
  const columns = [
    {
      title: "VoucherID",
      dataIndex: "VoucherID",
      key: "VoucherID",
    },
    {
        title: "VoucherName",
        dataIndex: "VoucherName",
        key: "VoucherName",
      },
      {
        title: "UsagedQuantity",
        dataIndex: "UsagedQuantity",
        key: "UsagedQuantity",
      },
      {
        title: "TotalQuantity",
        dataIndex: "TotalQuantity",
        key: "TotalQuantity",
      },
      {
        title: "Type",
        dataIndex: "Type",
        key: "Type",
      },
      {
        title: "ValidFrom",
        dataIndex: "ValidFrom",
        key: "ValidFrom",
      },
      {
        title: "ExpirationDate",
        dataIndex: "ExpirationDate",
        key: "ExpirationDate",
      },
      {
        title: "Condition",
        dataIndex: "Condition",
        key: "Condition",
      },
      {
        title: "Prerequisites",
        dataIndex: "Prerequisites",
        key: "Prerequisites",
      },
      {
        title: "Discount",
        dataIndex: "Discount",
        key: "Discount",
      },             
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/vouchers");
      setpromotionVoucher(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
          <Table dataSource={promotionVoucher} columns={columns} />
  )
}

export default PromotionVoucher
