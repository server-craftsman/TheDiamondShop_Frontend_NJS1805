import React, { useEffect, useState } from 'react';
import "../dashboard/index.scss";
import { Table } from 'antd';
import { Card, Col, Row } from 'antd';
import AreaCard from './areaCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie } from 'recharts';


function Dashboard() {
  const [totalDiamond, setTotalDiamond] = useState(0);
  const [dataSource, setDataSource] = useState([]);
  const [page, setPage] = useState([1]);
  const [pageSize, setPageSize] = useState([5]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8090/products/diamonds');
        const data = await response.json();
        setDataSource(data);
        setTotalDiamond(data.length); // Calculate total based on data length
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Diamond ID",
      dataIndex: "DiamondID",
      key: "DiamondID",
    },
    {
      title: "Diamond Origin",
      dataIndex: "DiamondOrigin",
      key: "DiamondOrigin",
    },
    {
      title: "Carat Weight",
      dataIndex: "CaratWeight",
      key: "CaratWeight",
    },
    {
      title: "Color",
      dataIndex: "Color",
      key: "Color",
    },
    {
      title: "Clarity",
      dataIndex: "Clarity",
      key: "Clarity",
    },
    {
      title: "Cut",
      dataIndex: "Cut",
      key: "Cut",
    },
    {
      title: "Price",
      dataIndex: "Price",
      key: "Price",
    },
    {
      title: "Shape",
      dataIndex: "Shape",
      key: "Shape",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (Image) => {
        <Image src={Image} width={140} height={120} />
      }
    },
    {
      title: "Polish",
      dataIndex: "Polish",
      key: "Polish",
    },
    {
      title: "Symmetry",
      dataIndex: "Symmetry",
      key: "Symmetry",
    },
    {
      title: "Table Percentage",
      dataIndex: "TablePercentage",
      key: "TablePercentage",
    },
    {
      title: "Depth",
      dataIndex: "Depth",
      key: "Depth",
    },
    {
      title: "Measurements",
      dataIndex: "Measurements",
      key: "Measurements",
    },
    {
      title: "GIA Report Number",
      dataIndex: "GIAReportNumber",
      key: "GIAReportNumber",
    },
    {
      title: "Stock Number",
      dataIndex: "StockNumber",
      key: "StockNumber",
    },
    {
      title: "Lab Report Number",
      dataIndex: "LabReportNumber",
      key: "LabReportNumber",
    },
    {
      title: "Gemstone",
      dataIndex: "Gemstone",
      key: "Gemstone",
    },
    {
      title: "Grading Report",
      dataIndex: "GradingReport",
      key: "GradingReport",
    },
    {
      title: "Descriptors",
      dataIndex: "Descriptors",
      key: "Descriptors",
    },
    {
      title: "Fluorescence",
      dataIndex: "Fluorescence",
      key: "Fluorescence",
    },

  ];

  const chartData = dataSource.map((item, index) => ({
    name: `Diamond ${index + 1}`,
    Price: item.Price,
    CaratWeight: item.CaratWeight,
    TablePercentage: item.TablePercentage,
    Depth: item.Depth,
  }));

  const data = [
    {
      "name": "Day",
      "diamond": 4000,
      "ring": 2400,
      "timepieces": 6000,
    },
    {
      "name": "Week",
      "diamond": 2000,
      "ring": 1209,
      "timepieces": 7421,
    },
    {
      "name": "Month",
      "diamond": 4573,
      "ring": 1234,
      "timepieces": 7468,
    },

  ]

  const dataPieOrder = [
    {
      "name": "Order Day",
      "value": 40,
      fill: '#8884d8'
    },
    {
      "name": "Order Week",
      "value": 80,
      fill: '#83a6ed'
    },
    {
      "name": "Order Month",
      "value": 100,
      fill: '#8dd1e1'
    },
  ];

  //PRODUCT HOT SALE ======================================================
  const ProductHotSale = [
    {
      title: "Diamond ID",
      dataIndex: "DiamondID",
      key: "DiamondID",
    },
    {
      title: "Name Product",
      dataIndex: "DiamondOrigin",
      key: "DiamondOrigin",
    },
    {
      title: "Carat Weight",
      dataIndex: "CaratWeight",
      key: "CaratWeight",
    },
    {
      title: "Color",
      dataIndex: "Color",
      key: "Color",
    },
    {
      title: "Clarity",
      dataIndex: "Clarity",
      key: "Clarity",
    },
    {
      title: "Cut",
      dataIndex: "Cut",
      key: "Cut",
    },
    {
      title: "Image",
      dataIndex: "Image",
      key: "Image",
      render: (Image) => {
        <Image src={Image} width={140} height={120} />
      }
    },


  ];

  //PRODUCT SOLD================================================
  const dataProductSold = [
    {
      "name": "Diamond",
      "Inventory Quantity": 4000,
      "Out Of Stock": 2400
    },
    {
      "name": "Diamond Rings",
      "Inventory Quantity": 3000,
      "Out Of Stock": 1398
    },
    {
      "name": "Diamond Timpieces",
      "Inventory Quantity": 2000,
      "Out Of Stock": 9800
    },

  ]

  //FINANCE REPORT===================================================
  const dataFinance = [
    { "name": "2024-01-01", "price": 2169 },
    { "name": "2024-01-08", "price": 5163 },
    { "name": "2024-01-15", "price": 5591 },
    { "name": "2024-01-22", "price": 2021 },
    { "name": "2024-01-29", "price": 4022 },
    { "name": "2024-02-05", "price": 4600 },
    { "name": "2024-02-12", "price": 3335 },
    { "name": "2024-02-19", "price": 4800 },
    { "name": "2024-02-26", "price": 4900 },
    { "name": "2024-03-04", "price": 4271 },
    { "name": "2024-03-11", "price": 4557 },
    { "name": "2024-03-18", "price": 5200 },
    { "name": "2024-03-25", "price": 3728 },
    { "name": "2024-04-01", "price": 5400 },
    { "name": "2024-04-08", "price": 3964 },
    { "name": "2024-04-15", "price": 5600 },
    { "name": "2024-04-22", "price": 3964 },
    { "name": "2024-04-29", "price": 5467 },
    { "name": "2024-05-06", "price": 5900 },
    { "name": "2024-05-13", "price": 4371 },
    { "name": "2024-05-20", "price": 6100 },
    { "name": "2024-05-27", "price": 5317 },
    { "name": "2024-06-03", "price": 2168 },
    { "name": "2024-06-10", "price": 4029 },
    { "name": "2024-06-17", "price": 2597 },
    { "name": "2024-06-24", "price": 2783 },
  ];

  return (
    <div className='dashboard'>
      <section className="content-area-top">
        <div className="area-top-l">

          <h1 className="area-top-title">Dashboard</h1> <br />

        </div>
      </section>
      <br />
      <div className='revenue-by-day'>
        <h2 >Total shop revenue</h2>
        {/* CARD ITEM */}
        <section className='content-area-cards'>
          <AreaCard
            colors={["#e4e8ef", "#475be8"]}
            percentFillValue={totalDiamond}
            cardInfo={{
              title: "Revenue by day",
              value: (
                <span>
                  ${totalDiamond}
                </span>
              ),
              text: "Available to payout",

            }}
          />
          <AreaCard
            colors={["#e4e8ef", "#4ce13f"]}
            percentFillValue={90}
            cardInfo={{
              title: "Revenue by week",
              value: (
                <span>
                  $5999
                </span>
              ),
              text: "Available to payout",
            }}
          />
          <AreaCard
            colors={["#e4e8ef", "#f29a2e"]}
            percentFillValue={40}
            cardInfo={{
              title: "Revenue by month",
              value: "$18.2K",
              text: "Available to payout",
            }}
          />
        </section>
        <br />
        <section className='content-area-chart'>

          <br />
          <ResponsiveContainer width="100%" height={400} >
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="diamond" fill="#8884d8" />
              <Bar dataKey="ring" fill="#82ca9d" />
              <Bar dataKey="timepieces" fill="#FF6600" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>

      <br />
      {/* ===============TOTAL NUMBER OF ORDER================== */}
      <div className='total-order'>
        <h2>Total number of orders</h2>
        <section className='content-area-cards'>
          <AreaCard
            colors={["#e4e8ef", "#475be8"]}
            percentFillValue={40}
            cardInfo={{
              title: "Total order by day",
              value: (
                <span>
                  40
                </span>
              ),
              text: "Available to payout",

            }}
          />
          <AreaCard
            colors={["#e4e8ef", "#4ce13f"]}
            percentFillValue={80}
            cardInfo={{
              title: "Total order by week",
              value: (
                <span>
                  80
                </span>
              ),
              text: "Available to payout",
            }}
          />
          <AreaCard
            colors={["#e4e8ef", "#f29a2e"]}
            percentFillValue={200}
            cardInfo={{
              title: "Total order by month",
              value: "200",
              text: "Available to payout",
            }}
          />
        </section>

        <section className='content-area-chart'>
          <ResponsiveContainer width="100%" height={500} >
            <PieChart >
              <Pie data={dataPieOrder} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label />
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </section>

      </div>
      <br />

      {/* ======================Product Hot Sale======================== */}
      <div className='product-hotSale'>
        <h2>Product Hot Sale</h2>
        <section className='content-area-cards'>
          <AreaCard
            colors={["#e4e8ef", "#475be8"]}
            percentFillValue={1083 / 100}
            cardInfo={{
              title: "Number of products sold",
              value: (
                <span>
                  1083
                </span>
              ),
              text: "Available to payout",

            }}
          />
          <div style={{ marginLeft: '40px' }}>

            <Table
              columns={ProductHotSale}
              dataSource={dataSource}
              pagination={{
                current: page,
                pageSize: pageSize,
                total: 20,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize);
                }

              }} />
          </div>

        </section>
      </div>

      <br />
      {/* ============PRODUCT SOLD================= */}
      <div className='inventory-management'>
        <h2>Total Product sold</h2>

        <section className='content-area-chart'>
          <ResponsiveContainer width="100%" height={400} >
            <BarChart width={1450} height={400} data={dataProductSold}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Inventory Quantity" fill="#8884d8" />
              <Bar dataKey="Out Of Stock" fill="#EE0000" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      </div>

      <br />
      <br />
      {/* ===================FINANCE REPORT============================ */}
      <div className='financial-report'>
        <h2>Financial report</h2>
        <ResponsiveContainer width="100%" height={400} >
          <LineChart data={dataFinance}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="price" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>



      {/* STATICS */}
      <br />
      {/* data price and name */}
      <section className='content-area-chart'>
        <h2>Diamond statistics</h2>
        <br />

        <ResponsiveContainer width="100%" height={400} >
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="Price" stroke="#8884d8" />
            <Line type="monotone" dataKey="CaratWeight" stroke="#82ca9d" />
            <Line type="monotone" dataKey="TablePercentage" stroke="#FF5733" />
            <Line type="monotone" dataKey="Depth" stroke="#ffcf40" />
          </LineChart>
        </ResponsiveContainer>
      </section>

      <br />
      {/* List DIAMOND */}
      {/* <section className="content-area-table">
        <div className="data-table-info">
          <h2 className="data-table-title">List Diamond</h2>

        </div>
        <Table
          columns={columns}
          dataSource={dataSource}
          pagination={{
            current: page,
            pageSize: pageSize,
            total: 500,
            onChange: (page, pageSize) => {
              setPage(page);
              setPageSize(pageSize);
            }

          }} />
      </section> */}


    </div>
  )
}

export default Dashboard
