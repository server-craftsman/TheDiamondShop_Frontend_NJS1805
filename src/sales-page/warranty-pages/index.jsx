import React, { useEffect, useState } from 'react';
import { Button, Input, Table } from "antd";
import axios from 'axios';

function WarrantyPages() {
  const [warranty, setWarranty] = useState([]);
  const [reportNo, setReportNo] = useState('');

  const columns = [
    { title: "ReportNo", dataIndex: "ReportNo", key: "ReportNo" },
    { title: "Descriptions", dataIndex: "Descriptions", key: "Descriptions" },
    { title: "Date", dataIndex: "Date", key: "Date", sorter: (record1, record2) => new Date(record1.Date) - new Date(record2.Date) },
    { title: "PlaceToBuy", dataIndex: "PlaceToBuy", key: "PlaceToBuy" },
    { title: "Period", dataIndex: "Period", key: "Period" },
    { title: "WarrantyType", dataIndex: "WarrantyType", key: "WarrantyType" },
    { title: "WarrantyConditions", dataIndex: "WarrantyConditions", key: "WarrantyConditions" },
    { title: "AccompaniedService", dataIndex: "AccompaniedService", key: "AccompaniedService" },
    { title: "Condition", dataIndex: "Condition", key: "Condition" },
    { title: "OrderDetailID", dataIndex: "OrderDetailID", key: "OrderDetailID" },
  ];

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8090/warranty/view-warranty");
      setWarranty(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  const handleViewByReportNo = async () => {
    if (!reportNo) {
      return;
    }
    try {
      const response = await axios.get(`http://localhost:8090/warranty/view-warranty/${reportNo}`);
      setWarranty(response.data);
    } catch (error) {
      console.error(`Error fetching data for report number ${reportNo}:`, error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Input
          placeholder="Enter Report No"
          value={reportNo}
          onChange={(e) => setReportNo(e.target.value)}
          style={{ width: 200, marginRight: 10 }}
        />
        <Button type="primary" onClick={handleViewByReportNo}>
          View by Report No
        </Button>
      </div>
      <Table dataSource={warranty} columns={columns} rowKey="ReportNo" />
    </div>
  )
}

export default WarrantyPages;
