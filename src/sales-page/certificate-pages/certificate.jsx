import { useState } from 'react';
import { Table, Input, Button, message, Space } from 'antd';
import axios from 'axios';

function Certificate() {
  const [reportNumber, setReportNumber] = useState('');
  const [reportNumbers, setReportNumbers] = useState([]);
  const [reportData, setReportData] = useState([]);
  const [loading, setLoading] = useState(false);

  const columns = [
    { title: 'GIA Report Number', dataIndex: 'GIAReportNumber', key: 'GIAReportNumber' },
    { title: 'Inspection Date', dataIndex: 'InspectionDate', key: 'InspectionDate' },
    { title: 'Clarity Grade', dataIndex: 'ClarityGrade', key: 'ClarityGrade' },
    { title: 'Shape and Cutting Style', dataIndex: 'ShapeAndCuttingStyle', key: 'ShapeAndCuttingStyle' },
    { title: 'Measurements', dataIndex: 'Measurements', key: 'Measurements' },
    { title: 'Carat Weight', dataIndex: 'CaratWeight', key: 'CaratWeight' },
    { title: 'Color Grade', dataIndex: 'ColorGrade', key: 'ColorGrade' },
    { title: 'Symmetry Grade', dataIndex: 'SymmetryGrade', key: 'SymmetryGrade' },
    { title: 'Cut Grade', dataIndex: 'CutGrade', key: 'CutGrade' },
    { title: 'Polish Grade', dataIndex: 'PolishGrade', key: 'PolishGrade' },
    { title: 'Fluorescence', dataIndex: 'Fluorescence', key: 'Fluorescence' },
  ];

  const fetchData = async (reportNumber) => {
    try {
      const response = await axios.get(`http://localhost:8090/certificate/${reportNumber}`);
      return response.data ? [response.data] : [];
    } catch (error) {
      console.error(`Error fetching data for report number ${reportNumber}:`, error);
      message.error(`Certificate for ${reportNumber} not available`);
      return [];
    }
  };

  const handleAddReportNumber = async () => {
    if (reportNumber && !reportNumbers.includes(reportNumber)) {
      setReportNumbers([...reportNumbers, reportNumber]);
      setLoading(true);
      try {
        const newData = await fetchData(reportNumber);

        // Ensure each item has a unique key
        const uniqueNewData = newData.map((item, index) => ({
          ...item,
          uniqueKey: `${item.GIAReportNumber}-${index}`,
        }));

        setReportData([...reportData, ...uniqueNewData]);
      } finally {
        setLoading(false);
      }
    }
    setReportNumber('');
  };

  return (
    <div>
      <Space>
        <Input
          placeholder="Enter GIA Report Number"
          value={reportNumber}
          onChange={(e) => setReportNumber(e.target.value)}
          style={{ width: 200 }}
        />
        <Button type="primary" onClick={handleAddReportNumber} loading={loading}>
          Add
        </Button>
      </Space>
      <Table
        columns={columns}
        dataSource={reportData}
        rowKey="uniqueKey"
        style={{ marginTop: 20 }}
      />
    </div>
  );
}

export default Certificate;

