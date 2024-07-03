import React, { useEffect, useState } from 'react';
import { Table, Input, Button, message, Space } from 'antd';
import axios from 'axios';

function Certificate() {
  const [reportNumber, setReportNumber] = useState('');
  const [certificates, setCertificates] = useState([]);
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

  useEffect(() => {
    fetchCertificates();
  }, []);

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('http://localhost:8090/certificate/lookup');
      setCertificates(response.data);
    } catch (error) {
      console.error('Error fetching certificates:', error);
      message.error('Error fetching certificates');
    }
  };

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

  const handleSearch = async () => {
    if (!reportNumber) {
      fetchCertificates();
      return;
    }
    setLoading(true);
    try {
      const newData = await fetchData(reportNumber);
      setCertificates(newData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <Space>
          <Input
            placeholder="Enter GIA Report Number"
            value={reportNumber}
            onChange={(e) => setReportNumber(e.target.value)}
            style={{ width: 200 }}
          />
          <Button type="primary" onClick={handleSearch} loading={loading}>
            Search
          </Button>
        </Space>
      </div>
      <Table
        dataSource={certificates}
        columns={columns}
        rowKey="CertificateID"
      />
    </div>
  );
}

export default Certificate;
