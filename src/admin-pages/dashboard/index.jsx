import React, { useEffect, useState } from 'react';
import "../dashboard/index.scss";
import { Table, message } from 'antd';
import { Card, Col, Row } from 'antd';
import AreaCard from './areaCard';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar, PieChart, Pie } from 'recharts';
import axios from 'axios';
import { Try } from '@mui/icons-material';


function Dashboard() {

  const [dataBestSeller, setDataBestSeller] = useState([]);
  const [page, setPage] = useState([1]);
  const [pageSize, setPageSize] = useState([5]);
  const [dataSource, setDataSource] = useState([]);

  const [inventoryData, setInventoryData] = useState([]);
  const [outStockData, setOutStockData] = useState([]);

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [revenue, setRevenue] = useState({
    DailyRevenue: 0,
    WeeklyRevenue: 0,
    MonthlyRevenue: 0
  })

  const [dataRevenueChart, setDataRevenueChart] = useState({
    Date: 0,
    Revenue: 0
  })

  const [totalOrder, setTotalOrder] = useState({
    DailyOrders: 0,
    WeeklyOrders: 0,
    MonthlyOrders: 0
  })

  const [dataNewUser, setDataNewUser] = useState({
    NewCustomersToday: 0,
    NewCustomersThisWeek: 0,
    NewCustomersThisMonth: 0
  });

  //DASHBOARD TOTAL PRODUCT=====================================
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8090/admin/dashboard");
        const data = await response.json();
        setDataSource(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //TOTAL REVENUE==================================================
  useEffect(() => {
    const fetchDataRevenue = async () => {
      try {
        const [revenueResponse, revenueChartResponse] = await Promise.all([
          axios.get("http://localhost:8090/admin/revenue"),
          axios.get("http://localhost:8090/admin/revenue-chart")
        ]);
        setRevenue(revenueResponse.data);
        setDataRevenueChart(revenueChartResponse.data);
      } catch (err) {
        setError('Failed to fetch data');
        console.log("Error data: ", err);
      }
    };
    fetchDataRevenue();
  }, []);


  const revenueChart = [
    {
      "name": "Daily Revenue",
      "value": revenue.DailyRevenue,
      fill: '#8884d8'
    },
    {
      "name": "Weekly Revenue",
      "value": revenue.WeeklyRevenue,
      fill: '#83a6ed'
    },
    {
      "name": "Monthly Revenue",
      "value": revenue.MonthlyRevenue,
      fill: '#8dd1e1'
    },
  ];


  //TOTAL ORDER====================================================
  useEffect(() => {
    const fetchDataOrder = async () => {
      try {
        const responseOrder = await axios.get("http://localhost:8090/admin/total-order");
        setTotalOrder(responseOrder.data);
      } catch (error) {
        setError('Failed to fetch data');
      }
    };
    fetchDataOrder();
  }, []);

  const dataTotalOrder = [
    {
      "name": "Total Orders",
      "Daily Orders": totalOrder.DailyOrders,
      "Weekly Orders": totalOrder.WeeklyOrders,
      "Monthly Orders": totalOrder.MonthlyOrders,
    },
  ]


  //BEST SELLER====================================================
  // useEffect(() => {
  //   const fetchBestSellers = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:8090/admin/best-seller');
  //       setDataBestSeller([
  //         { key: '1', category: "Diamond", ID: response.data.DiamondID, Name: response.data.DiamondOrigin , soldOut: response.data.SoldOutDiamonds },
  //         { key: '2', category: "Bridal", ID: response.data.BridalID, Name: response.data.NameBridal , soldOut: response.data.SoldOutBridals },
  //         { key: '3', category: "Diamond Rings", ID: response.data.DiamondRingsID, Name: response.data.NameRings , soldOut: response.data.SoldOutDiamondRings },
  //         { key: '4', category: "Diamond Timpieces", ID: response.data.DiamondTimepiecesID, Name: response.data.NameTimepieces , soldOut: response.data.SoldOutDiamondTimepieces },
  //       ]);
  //     } catch (error) {
  //       message.error('Failed to fetch best-selling products');
  //     }
  //   };

  //   fetchBestSellers();
  // }, []);

  // const columns = [
  //   {
  //     title: 'Category',
  //     dataIndex: 'category',
  //     key: 'category',
  //   },
  //   {
  //     title: 'ID',
  //     dataIndex: 'ID',
  //     key: 'ID',
  //   },
  //   {
  //     title: 'Name',
  //     dataIndex: 'Name',
  //     key: 'Name',
  //   },
  //   {
  //     title: 'Sold Out',
  //     dataIndex: 'soldOut',
  //     key: 'soldOut',
  //   },
  // ];

  useEffect(() => {
    const fetchBestSellers = async () => {
      try {
        const response = await axios.get("http://localhost:8090/admin/best-seller");
        console.log('Fetched data:', response.data); // Log the fetched data

        // Check if response.data is an array
        if (Array.isArray(response.data)) {
          const bestSellers = response.data.map((item, index) => ({
            key: index,
            category: item.Category,
            ID: item.ID,
            Name: item.Name,
            soldOut: item.SoldOut
          }));
          setData(bestSellers);
        } else if (typeof response.data === 'object') {
          // Convert single object to array if needed
          const bestSellers = [response.data];
          setData(bestSellers);
        } else {
          message.error('Unexpected data format');
          console.error('Unexpected data format:', response.data);
        }
      } catch (error) {
        console.error("Error fetching best-selling products:", error); // Log detailed error
        message.error('Failed to fetch best-selling products'); // Use message from antd
      } finally {
        setLoading(false);
      }
    };

    fetchBestSellers();
  }, []);

  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'ID',
      dataIndex: 'ID',
      key: 'ID',
    },
    {
      title: 'Name',
      dataIndex: 'Name',
      key: 'Name',
    },
    {
      title: 'Sold Out',
      dataIndex: 'soldOut',
      key: 'soldOut',
    },
  ];

  useEffect(() => {
    const fetchDataInventory = async () => {
      try {
        const response = await axios.get("http://localhost:8090/admin/inventory-list");
        setInventoryData(response.data);
      } catch (error) {
        console.error("error fetachdata", error);
      }
    };
    fetchDataInventory();
  }, [])

  const InventoryList = [
    { title: 'Product Image', dataIndex: 'Image', key: 'Image' },
    { title: 'Product Type', dataIndex: 'ProductType', key: 'ProductType' },
    // { title: 'Product ID', dataIndex: 'ProductID', key: 'ProductID' },
    { title: 'Inventory', dataIndex: 'Inventory', key: 'Inventory' },
  ];

  //OUT STOCK DATA====================================================

  useEffect(() => {
    const fetchDataOutStock = async () => {
      try {
        const response = await axios.get("http://localhost:8090/admin/out-stock-list");
        setOutStockData(response.data);
      } catch (error) {
        console.error("error fetachdata", error);
      }
    };
    fetchDataOutStock();
  }, [])

  const outStockList = [
    { title: 'Product Type', dataIndex: 'ProductType', key: 'ProductType' },
    { title: 'Product ID', dataIndex: 'ProductID', key: 'ProductID' },
    { title: 'Inventory', dataIndex: 'Inventory', key: 'Inventory' },
  ];

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


  //NEW USER==========================================================
  useEffect(() => {
    const fetchDataNewUser = async () => {
      try {
        const response = await axios.get("http://localhost:8090/admin/new-customer");
        setDataNewUser(response.data)
      } catch (error) {
        console.error("Error", error);
      }
    };
    fetchDataNewUser();
  }, [])


  const dataUser = [
    {
      "name": "Data New User",
      "day": dataNewUser.NewCustomersToday,
      "week": dataNewUser.NewCustomersThisWeek,
      "month": dataNewUser.NewCustomersThisMonth
    },
    // {
    //   "name": "Page B",
    //   "uv": 3000,
    //   "pv": 1398,
    //   "amt": 2210
    // },
    // {
    //   "name": "Page C",
    //   "uv": 2000,
    //   "pv": 9800,
    //   "amt": 2290
    // },
    
  ]



  return (
    <div className='dashboard'>

      <section className="content-area-top">
        <div className="area-top-l">

          <h1 className="area-top-title">Dashboard</h1> <br />

        </div>
      </section>

      {/* STATIC */}
      <div style={{ padding: "24px" }}>
        <h2 style={{ color: "red" }}>Total statistics</h2>
        <Row gutter={16}>
          <Col span={4}>
            <Card title="Total Diamonds" bordered={false}>
              {dataSource.TotalDiamonds}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Total Bridal" bordered={false}>
              {dataSource.TotalBridal}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Total Diamond Rings" bordered={false}>
              {dataSource.TotalDiamondRings}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Total Timepieces" bordered={false}>
              {dataSource.TotalDiamondTimepieces}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Total Completed Orders" bordered={false}>
              {dataSource.TotalCompletedOrders}
            </Card>
          </Col>
          <Col span={4}>
            <Card title="Total Revenue" bordered={false}>
              {dataSource.TotalRevenue}$
            </Card>
          </Col>
        </Row>
      </div>

      <br />
      <div className='revenue-by-day'>
        <h2 >Total shop revenue</h2>
        {/* CARD ITEM */}
        <section className='content-area-cards'>
          <AreaCard
            colors={["#e4e8ef", "#475be8"]}
            percentFillValue={revenue.DailyRevenue}
            cardInfo={{
              title: "Revenue by day",
              value: (
                <span>
                  ${revenue.DailyRevenue}
                </span>
              ),


            }}
          />
          <AreaCard
            colors={["#e4e8ef", "#4ce13f"]}
            percentFillValue={revenue.WeeklyRevenue}
            cardInfo={{
              title: "Revenue by week",
              value: (
                <span>
                  ${revenue.WeeklyRevenue}
                </span>
              ),

            }}
          />

          <AreaCard
            colors={["#e4e8ef", "#f29a2e"]}
            percentFillValue={revenue.MonthlyRevenue}
            cardInfo={{
              title: "Revenue by month",
              value: (
                <span>
                  ${revenue.MonthlyRevenue}
                </span>
              ),

            }}
          />
        </section>
        <br />


        <br />
        <section className='content-area-chart'>
          <ResponsiveContainer width="100%" height={500} >
            <PieChart >
              <Pie data={revenueChart} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label />
              <Tooltip />
              <Legend />
            </PieChart>
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
            percentFillValue={totalOrder.DailyOrders}
            cardInfo={{
              title: "Total order by day",
              value: (
                <span>
                  {totalOrder.DailyOrders}
                </span>
              ),
            }}
          />

          <AreaCard
            colors={["#e4e8ef", "#4ce13f"]}
            percentFillValue={totalOrder.WeeklyOrders}
            cardInfo={{
              title: "Total order by week",
              value: (
                <span>
                  {totalOrder.WeeklyOrders}
                </span>
              ),
            }}
          />

          <AreaCard
            colors={["#e4e8ef", "#f29a2e"]}
            percentFillValue={totalOrder.MonthlyOrders}
            cardInfo={{
              title: "Total order by month",
              value: (
                <span>
                  {totalOrder.MonthlyOrders}
                </span>
              ),
            }}
          />
        </section>

        <section className='content-area-chart'>
          <ResponsiveContainer width="100%" height={400} >
            <BarChart width={1450} height={400} data={dataTotalOrder}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Daily Orders" fill="#8884d8" />
              <Bar dataKey="Weekly Orders" fill="#EE0000" />
              <Bar dataKey="Monthly Orders" fill="#ff80be" />
            </BarChart>
          </ResponsiveContainer>
        </section>

      </div>
      <br />

      {/* ======================Product BEST SELLER======================== */}
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

            <Table columns={columns} dataSource={data} />;
          </div>

        </section>
      </div>

      <br />
      {/* ============PRODUCT INVENTORY LIST================= */}
      <div className='inventory-management'>
        <h2>Total List Inventory</h2>

        <Table columns={InventoryList} dataSource={inventoryData} />

      </div>

      <br />
      <br />

      {/* ============PRODUCT OUT STOCK LIST================= */}
      <div className='inventory-management'>
        <h2>Total OUT STOCK LIST </h2>

        <Table columns={outStockList} dataSource={outStockData} />

      </div>
      <br />
      <br />

      {/* ============Số Lượng Khách Hàng Mới================= */}
      <div className='inventory-management'>
        <h2>Total New Customer</h2>

        <section className='content-area-cards'>
          <AreaCard
            colors={["#e4e8ef", "#475be8"]}
            percentFillValue={dataNewUser.NewCustomersToday || "0"}
            cardInfo={{
              title: "New Customers Today",
              value: (
                <span>
                  {dataNewUser.NewCustomersToday}
                </span>
              ),
            }}
          />

          <AreaCard
            colors={["#e4e8ef", "#4ce13f"]}
            percentFillValue={dataNewUser.NewCustomersThisWeek}
            cardInfo={{
              title: "New Customers This Week",
              value: (
                <span>
                  {dataNewUser.NewCustomersThisWeek || "0"}
                </span>
              ),
            }}
          />

          <AreaCard
            colors={["#e4e8ef", "#f29a2e"]}
            percentFillValue={dataNewUser.NewCustomersThisMonth}
            cardInfo={{
              title: "New Customers This Month",
              value: (
                <span>
                  {dataNewUser.NewCustomersThisMonth || "0"}
                </span>
              ),
            }}
          />
        </section>

        <section className='content-area-chart'>
          <LineChart width={730} height={250} data={dataNewUser}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="day" stroke="#8884d8" />
            <Line type="monotone" dataKey="week" stroke="#82ca9d" />
            <Line type="monotone" dataKey="month" stroke="#82ca9d" />
          </LineChart>
        </section>
      </div>


    </div>
  )
}

export default Dashboard
