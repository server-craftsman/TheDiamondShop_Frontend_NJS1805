import { Layout, Menu, Table } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import React from 'react';
import "./index.scss";
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';
import price1 from "../../assets/price1.jpeg";
import ReactPlayer from 'react-player';
import Footer from '../../components/footer';
import banner from "../../assets/banner-price.jpg"

function PriceDiamond() {

  const columns36 = [
    {
      title: '3.6mm',
      dataIndex: '3.6mm',
      key: '3.6mm',
    },
    {
      title: 'IF',
      dataIndex: 'if',
      key: 'if',
    },
    {
      title: 'VVS1',
      dataIndex: 'vvs1',
      key: 'vvs1',
    },
    {
      title: 'VVS2',
      dataIndex: 'vvs2',
      key: 'vvs2',
    },
    {
      title: 'VS1',
      dataIndex: 'vs1',
      key: 'vs1',
    },
    {
      title: 'VS2',
      dataIndex: 'vs2',
      key: 'vs2',
    },
  ];

  const data36 = [
    {
      key: '1',
      "3.6mm": 'D',
      if: '10,800,000',
      vvs1: '9,800,000',
      vvs2: '8,800,000',
      vs1: '8,200,000',
      vs2: '7,000,000',
    },
    {
      key: '2',
      "3.6mm": 'E',
      if: '10,500,000',
      vvs1: '9,200,000',
      vvs2: '8,000,000',
      vs1: '7,200,000',
      vs2: '5,000,000',
    },
    {
      key: '3',
      "3.6mm": 'F',
      if: '9,800,000',
      vvs1: '9,100,000',
      vvs2: '7,200,000',
      vs1: '6,000,000',
      vs2: '3,900,000',
    },
    {
      key: '4',
      "3.6mm": 'J',
      if: '8,000,000',
      vvs1: '7,800,000',
      vvs2: '6,500,000',
      vs1: '6,200,000',
      vs2: '5,300,000',
    },
  ];

  const columns39 = [
    {
      title: '3.9 MM',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'IF',
      dataIndex: 'IF',
      key: 'IF',
    },
    {
      title: 'VVS1',
      dataIndex: 'VVS1',
      key: 'VVS1',
    },
    {
      title: 'VVS2',
      dataIndex: 'VVS2',
      key: 'VVS2',
    },
    {
      title: 'VS1',
      dataIndex: 'VS1',
      key: 'VS1',
    },
    {
      title: 'VS2',
      dataIndex: 'VS2',
      key: 'VS2',
    },
  ];

  const data39 = [
    {
      key: '1',
      grade: 'D',
      IF: "12,900,000",
      VVS1: "11,500,000",
      VVS2: "11,000,000",
      VS1: "10,600,000",
      VS2: "9,500,000",
    },
    {
      key: '2',
      grade: 'E',
      IF: "12,400,000",
      VVS1: "10,800,000",
      VVS2: "10,300,000",
      VS1: "8,800,000",
      VS2: "7,500,000",
    },
    {
      key: '3',
      grade: 'F',
      IF: "11,500,000",
      VVS1: "10,100,000",
      VVS2: "9,200,000",
      VS1: "8,000,000",
      VS2: "6,600,000",
    },
    {
      key: '4',
      grade: 'J',
      IF: "9,500,000",
      VVS1: "9,300,000",
      VVS2: "8,600,000",
      VS1: "8,200,000",
      VS2: "7,600,000",
    },
  ];

  const columns41 = [
    {
      title: '3.9 MM',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'IF',
      dataIndex: 'IF',
      key: 'IF',
    },
    {
      title: 'VVS1',
      dataIndex: 'VVS1',
      key: 'VVS1',
    },
    {
      title: 'VVS2',
      dataIndex: 'VVS2',
      key: 'VVS2',
    },
    {
      title: 'VS1',
      dataIndex: 'VS1',
      key: 'VS1',
    },
    {
      title: 'VS2',
      dataIndex: 'VS2',
      key: 'VS2',
    },
  ];

  const data41 = [
    {
      key: '1',
      grade: 'D',
      IF: '20,433,000',
      VVS1: '16,147,000',
      VVS2: '15,289,000',
      VS1: '12,311,000',
      VS2: '11,635,000',
    },
    {
      key: '2',
      grade: 'E',
      IF: '19,576,000',
      VVS1: '15,289,000',
      VVS2: '14,432,000',
      VS1: '11,635,000',
      VS2: '10,913,000',
    },
    {
      key: '3',
      grade: 'F',
      IF: '18,718,000',
      VVS1: '14,432,000',
      VVS2: '13,575,000',
      VS1: '10,913,000',
      VS2: '10,191,000',
    },
    {
      key: '4',
      grade: 'J',
      IF: '10,200,000',
      VVS1: '9,800,000',
      VVS2: '9,100,000',
      VS1: '7,100,000',
      VS2: '6,000,000',
    },
  ];

  const columns45 = [
    {
      title: '4.5mm',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'IF',
      dataIndex: 'IF',
      key: 'IF',
    },
    {
      title: 'VVS1',
      dataIndex: 'VVS1',
      key: 'VVS1',
    },
    {
      title: 'VVS2',
      dataIndex: 'VVS2',
      key: 'VVS2',
    },
    {
      title: 'VS1',
      dataIndex: 'VS1',
      key: 'VS1',
    },
    {
      title: 'VS2',
      dataIndex: 'VS2',
      key: 'VS2',
    },
  ];

  const data45 = [
    {
      key: '1',
      color: 'D',
      IF: '24,800,000',
      VVS1: '21,200,000',
      VVS2: '19,800,000',
      VS1: '18,500,000',
      VS2: '16,000,000',
    },
    {
      key: '2',
      color: 'E',
      IF: '22,600,000',
      VVS1: '19,200,000',
      VVS2: '17,500,000',
      VS1: '16,100,000',
      VS2: '14,900,000',
    },
    {
      key: '3',
      color: 'F',
      IF: '21,900,000',
      VVS1: '18,100,000',
      VVS2: '16,000,000',
      VS1: '14,800,000',
      VS2: '12,000,000',
    },
    {
      key: '4',
      color: 'J',
      IF: '14,000,000',
      VVS1: '13,800,000',
      VVS2: '13,200,000',
      VS1: '12,900,000',
      VS2: '10,500,000',
    },
  ];


  const data50 = [
    { key: '1', color: 'D', IF: 39000000, VVS1: 36500000, VVS2: 35000000, VS1: 32000000, VS2: 30500000 },
    { key: '2', color: 'E', IF: 38100000, VVS1: 35800000, VVS2: 33000000, VS1: 30100000, VS2: 29000000 },
    { key: '3', color: 'F', IF: 32200000, VVS1: 31100000, VVS2: 26000000, VS1: 23000000, VS2: 20200000 },
    { key: '4', color: 'J', IF: 25300000, VVS1: 23800000, VVS2: 24500000, VS1: 19900000, VS2: 18000000 },
  ];

  const columns50 = [
    { title: '5.0mm', dataIndex: 'color', key: 'color' },
    { title: 'IF', dataIndex: 'IF', key: 'IF' },
    { title: 'VVS1', dataIndex: 'VVS1', key: 'VVS1' },
    { title: 'VVS2', dataIndex: 'VVS2', key: 'VVS2' },
    { title: 'VS1', dataIndex: 'VS1', key: 'VS1' },
    { title: 'VS2', dataIndex: 'VS2', key: 'VS2' },
  ];

  const data52 = [
    {
      key: '1',
      grade: 'D',
      IF: 54500000,
      VVS1: 52800000,
      VVS2: 49800000,
      VS1: 46600000,
      VS2: 42100000,
    },
    {
      key: '2',
      grade: 'E',
      IF: 52000000,
      VVS1: 50200000,
      VVS2: 47200000,
      VS1: 45100000,
      VS2: 40800000,
    },
    {
      key: '3',
      grade: 'F',
      IF: 35000000,
      VVS1: 33300000,
      VVS2: 45500000,
      VS1: 43200000,
      VS2: 38600000,
    },
    {
      key: '4',
      grade: 'J',
      IF: 32000000,
      VVS1: 31100000,
      VVS2: 43000000,
      VS1: 40800000,
      VS2: 36500000,
    },
  ];

  const columns52 = [
    {
      title: '5.2mm',
      dataIndex: 'grade',
      key: 'grade',
    },
    {
      title: 'IF',
      dataIndex: 'IF',
      key: 'IF',
    },
    {
      title: 'VVS1',
      dataIndex: 'VVS1',
      key: 'VVS1',
    },
    {
      title: 'VVS2',
      dataIndex: 'VVS2',
      key: 'VVS2',
    },
    {
      title: 'VS1',
      dataIndex: 'VS1',
      key: 'VS1',
    },
    {
      title: 'VS2',
      dataIndex: 'VS2',
      key: 'VS2',
    },
  ];

  const columns53 = [
    {
      title: '5.3mm',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'IF',
      dataIndex: 'if',
      key: 'if',
    },
    {
      title: 'VVS1',
      dataIndex: 'vvs1',
      key: 'vvs1',
    },
    {
      title: 'VVS2',
      dataIndex: 'vvs2',
      key: 'vvs2',
    },
    {
      title: 'VS1',
      dataIndex: 'vs1',
      key: 'vs1',
    },
    {
      title: 'VS2',
      dataIndex: 'vs2',
      key: 'vs2',
    },
  ];

  const data53 = [
    {
      key: '1',
      color: 'D',
      if: '55,900,000',
      vvs1: '54,800,000',
      vvs2: '52,000,000',
      vs1: '48,800,000',
      vs2: '46,800,000',
    },
    {
      key: '2',
      color: 'E',
      if: '54,200,000',
      vvs1: '53,300,000',
      vvs2: '51,900,000',
      vs1: '46,500,000',
      vs2: '45,200,000',
    },
    {
      key: '3',
      color: 'F',
      if: '49,600,000',
      vvs1: '48,000,000',
      vvs2: '46,800,000',
      vs1: '43,600,000',
      vs2: '42,800,000',
    },
    {
      key: '4',
      color: 'J',
      if: '34,800,000',
      vvs1: '32,100,000',
      vvs2: '30,800,000',
      vs1: '29,500,000',
      vs2: '28,200,000',
    },
  ];

  const data54 = [
    {
      key: '1',
      color: 'D',
      IF: 79200000,
      VVS1: 75200000,
      VVS2: 69900000,
      VS1: 62900000,
      VS2: 54800000,
    },
    {
      key: '2',
      color: 'E',
      IF: 68800000,
      VVS1: 66300000,
      VVS2: 64600000,
      VS1: 58000000,
      VS2: 53500000,
    },
    {
      key: '3',
      color: 'F',
      IF: 59200000,
      VVS1: 56500000,
      VVS2: 49800000,
      VS1: 45100000,
      VS2: 42600000,
    },
    {
      key: '4',
      color: 'J',
      IF: 36900000,
      VVS1: 34100000,
      VVS2: 32600000,
      VS1: 29500000,
      VS2: 27600000,
    },
  ];

  const columns54 = [
    {
      title: '5.4mm',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'IF',
      dataIndex: 'IF',
      key: 'IF',
    },
    {
      title: 'VVS1',
      dataIndex: 'VVS1',
      key: 'VVS1',
    },
    {
      title: 'VVS2',
      dataIndex: 'VVS2',
      key: 'VVS2',
    },
    {
      title: 'VS1',
      dataIndex: 'VS1',
      key: 'VS1',
    },
    {
      title: 'VS2',
      dataIndex: 'VS2',
      key: 'VS2',
    },
  ];

  const data60 = [
    { size: 'D', IF: 121800000, VVS1: 119200000, VVS2: 108600000, VS1: 78800000, VS2: 75200000 },
    { size: 'E', IF: 119600000, VVS1: 118500000, VVS2: 106600000, VS1: 76200000, VS2: 73000000 },
    { size: 'F', IF: 118100000, VVS1: 116000000, VVS2: 102000000, VS1: 74400000, VS2: 71500000 },
    { size: 'J', IF: 75500000, VVS1: 70800000, VVS2: 69900000, VS1: 62200000, VS2: 58000000 },
  ];
  const columns60 = [
    { title: '6.0mm', dataIndex: 'size', key: 'size' },
    { title: 'IF', dataIndex: 'IF', key: 'IF' },
    { title: 'VVS1', dataIndex: 'VVS1', key: 'VVS1' },
    { title: 'VVS2', dataIndex: 'VVS2', key: 'VVS2' },
    { title: 'VS1', dataIndex: 'VS1', key: 'VS1' },
    { title: 'VS2', dataIndex: 'VS2', key: 'VS2' },
  ];

  const columns62 = [
    {
      title: '6.2mm ',
      dataIndex: 'cut',
      key: 'cut',
    },
    {
      title: 'IF',
      dataIndex: 'if',
      key: 'if',
    },
    {
      title: 'VVS1',
      dataIndex: 'vvs1',
      key: 'vvs1',
    },
    {
      title: 'VVS2',
      dataIndex: 'vvs2',
      key: 'vvs2',
    },
    {
      title: 'VS1',
      dataIndex: 'vs1',
      key: 'vs1',
    },
    {
      title: 'VS2',
      dataIndex: 'vs2',
      key: 'vs2',
    },
  ];

  const data62 = [
    { cut: 'D', if: '182,200,000', vvs1: '180,900,000', vvs2: '179,000,000', vs1: '176,400,000', vs2: '174,000,000' },
    { cut: 'E', if: '175,500,000', vvs1: '173,200,000', vvs2: '171,600,000', vs1: '168,000,000', vs2: '166,600,000' },
    { cut: 'F', if: '166,600,000', vvs1: '163,800,000', vvs2: '159,800,000', vs1: '155,300,000', vs2: '150,700,000' },
    { cut: 'J', if: '105,000,000', vvs1: '102,000,000', vvs2: '98,800,000', vs1: '96,500,000', vs2: '94,000,000' },
  ];

  const columns63 = [
    {
      title: '6.3mm',
      dataIndex: 'diamond',
      key: 'diamond',
    },
    {
      title: 'IF',
      dataIndex: 'if',
      key: 'if',
    },
    {
      title: 'VVS1',
      dataIndex: 'vvs1',
      key: 'vvs1',
    },
    {
      title: 'VVS2',
      dataIndex: 'vvs2',
      key: 'vvs2',
    },
    {
      title: 'VS1',
      dataIndex: 'vs1',
      key: 'vs1',
    },
    {
      title: 'VS2',
      dataIndex: 'vs2',
      key: 'vs2',
    },
  ];

  const data63 = [
    {
      key: '1',
      diamond: 'D',
      if: '205,300,000',
      vvs1: '203,600,000',
      vvs2: '202,000,000',
      vs1: '199,900,000',
      vs2: '198,100,000',
    },
    {
      key: '2',
      diamond: 'E',
      if: '203,500,000',
      vvs1: '201,700,000',
      vvs2: '198,300,000',
      vs1: '195,000,000',
      vs2: '190,400,000',
    },
    {
      key: '3',
      diamond: 'F',
      if: '198,400,000',
      vvs1: '195,600,000',
      vvs2: '189,100,000',
      vs1: '188,000,000',
      vs2: '185,200,000',
    },
    {
      key: '4',
      diamond: 'J',
      if: '102,600,000',
      vvs1: '98,000,000',
      vvs2: '85,000,000',
      vs1: '72,200,000',
      vs2: '60,500,000',
    },
  ];

  const columns68 = [
    {
      title: '6.8mm',
      dataIndex: 'color',
      key: 'color',
    },
    {
      title: 'IF',
      dataIndex: 'if',
      key: 'if',
    },
    {
      title: 'VVS1',
      dataIndex: 'vvs1',
      key: 'vvs1',
    },
    {
      title: 'VVS2',
      dataIndex: 'vvs2',
      key: 'vvs2',
    },
    {
      title: 'VS1',
      dataIndex: 'vs1',
      key: 'vs1',
    },
    {
      title: 'VS2',
      dataIndex: 'vs2',
      key: 'vs2',
    },
  ];

  const data68 = [
    {
      key: 'D',
      color: 'D',
      if: '340,000,000',
      vvs1: '338,000,000',
      vvs2: '326,000,000',
      vs1: '315,800,000',
      vs2: '300,600,000',
    },
    {
      key: 'E',
      color: 'E',
      if: '338,000,000',
      vvs1: '330,000,000',
      vvs2: '325,200,000',
      vs1: '311,600,000',
      vs2: '292,000,000',
    },
    {
      key: 'F',
      color: 'F',
      if: '299,600,000',
      vvs1: '295,000,000',
      vvs2: '291,100,000',
      vs1: '284,000,000',
      vs2: '282,000,000',
    },
    {
      key: 'J',
      color: 'J',
      if: '140,000,000',
      vvs1: '138,000,000',
      vvs2: '136,100,000',
      vs1: '134,000,000',
      vs2: '112,600,000',
    },
  ];

  const data72 = [
    { grade: 'D', IF: 450000000, VVS1: 430000000, VVS2: 418800000, VS1: 416000000, VS2: 415000000 },
    { grade: 'E', IF: 435000000, VVS1: 415800000, VVS2: 403600000, VS1: 401200000, VS2: 399600000 },
    { grade: 'F', IF: 420200000, VVS1: 400000000, VVS2: 384600000, VS1: 383000000, VS2: 374600000 },
    { grade: 'J', IF: 198800000, VVS1: 196000000, VVS2: 172000000, VS1: 168000000, VS2: 166200000 },
  ];

  const columns72 = [
    { title: '7.2mm', dataIndex: 'grade', key: 'grade' },
    { title: 'IF', dataIndex: 'IF', key: 'IF' },
    { title: 'VVS1', dataIndex: 'VVS1', key: 'VVS1' },
    { title: 'VVS2', dataIndex: 'VVS2', key: 'VVS2' },
    { title: 'VS1', dataIndex: 'VS1', key: 'VS1' },
    { title: 'VS2', dataIndex: 'VS2', key: 'VS2' },
  ]


  const columns81 = [
    {
      title: '8.1mm ',
      dataIndex: ' ',
      key: ' ',
    },
    {
      title: 'IF',
      dataIndex: 'IF',
      key: 'IF',
    },
    {
      title: 'VVS1',
      dataIndex: 'VVS1',
      key: 'VVS1',
    },
    {
      title: 'VVS2',
      dataIndex: 'VVS2',
      key: 'VVS2',
    },
    {
      title: 'VS1',
      dataIndex: 'VS1',
      key: 'VS1',
    },
    {
      title: 'VS2',
      dataIndex: 'VS2',
      key: 'VS2',
    },
  ];

  const data81 = [
    { ' ': 'D', IF: '1,850,000,000', VVS1: '1,680,000,000', VVS2: '1,420,000,000', VS1: '1,100,000,000', VS2: '980,000,000' },
    { ' ': 'E', IF: '1,650,000,000', VVS1: '1,480,000,000', VVS2: '1,220,000,000', VS1: '960,000,000', VS2: '910,000,000' },
    { ' ': 'F', IF: '1,450,000,000', VVS1: '1,280,000,000', VVS2: '1,020,000,000', VS1: '760,000,000', VS2: '710,000,000' },
    { ' ': 'J', IF: '430,000,000', VVS1: '429,000,000', VVS2: '380,000,000', VS1: '352,000,000', VS2: '330,000,000' },
  ];

  const currentDate = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Layout>
      <Header className='header'>

        <Link className='logo' to={"/"}>
          <img src={logo} alt="" width={180} />
        </Link>

        <Menu mode="horizontal" defaultSelectedKeys={['home']}>
          <Menu.Item key="3.6mm">
            <a href="#3.6mm">3.6mm</a>
          </Menu.Item>
          <Menu.Item key="3.9mm">
            <a href="#3.9mm">3.9mm</a>
          </Menu.Item>
          <Menu.Item key="4.1mm">
            <a href="#4.1mm">4.1mm</a>
          </Menu.Item>
          <Menu.Item key="4.5mm">
            <a href="#4.5mm">4.5mm</a>
          </Menu.Item>
          <Menu.Item key="5.0mm">
            <a href="#5.0mm">5.0mm</a>
          </Menu.Item>
          <Menu.Item key="5.2mm">
            <a href="#5.2mm">5.2mm</a>
          </Menu.Item>
          <Menu.Item key="5.3mm">
            <a href="#5.3mm">5.3mm</a>
          </Menu.Item>
          <Menu.Item key="5.4mm">
            <a href="#5.4mm">5.4mm</a>
          </Menu.Item>
          <Menu.Item key="6.0mm">
            <a href="#6.0mm">6.0mm</a>
          </Menu.Item>
          <Menu.Item key="6.2mm">
            <a href="#6.2mm">6.2mm</a>
          </Menu.Item>
          <Menu.Item key="6.3mm">
            <a href="#6.3mm">6.3mm</a>
          </Menu.Item>
          <Menu.Item key="6.8mm">
            <a href="#6.8mm">6.8mm</a>
          </Menu.Item>
          <Menu.Item key="7.2mm">
            <a href="#7.2mm">7.2mm</a>
          </Menu.Item>
          <Menu.Item key="8.1mm">
            <a href="#8.1mm">8.1mm</a>
          </Menu.Item>
        </Menu>
      </Header>

      {/* Content */}

      <div className='banner'>
          <img src={banner} alt="" />
        </div>


      <Content className='content' >
        <div id="3.6mm" style={{ padding: '100px 0 100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <br />
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 3.6mm</h2>
          <br />

          <div>
            <Table columns={columns36} dataSource={data36} pagination={false} />
          </div>

        </div>
        <div id="3.9mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 3.9mm</h2>

          <Table columns={columns39} dataSource={data39} pagination={false} />
        </div>

        <div id="4.1mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 4.1mm</h2>

          <Table columns={columns41} dataSource={data41} pagination={false} />
        </div>

        <div id="4.5mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 4.5mm</h2>

          <Table columns={columns45} dataSource={data45} pagination={false} />
        </div>

        <div id="5.0mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 5.0mm</h2>

          <Table columns={columns50} dataSource={data50} pagination={false} />
        </div>

        <div id="5.2mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 5.2mm</h2>
          <Table columns={columns52} dataSource={data52} pagination={false} />
        </div>

        <div id="5.3mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 5.3mm</h2>
          <Table columns={columns53} dataSource={data53} pagination={false} />
        </div>

        <div id="5.4mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 5.4mm</h2>
          <Table columns={columns54} dataSource={data54} pagination={false} />
        </div>

        <div id="6.0mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 6.0mm</h2>
          <Table columns={columns60} dataSource={data60} pagination={false} />
        </div>

        <div id="6.2mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 6.2mm</h2>
          <Table columns={columns62} dataSource={data62} pagination={false} />
        </div>

        <div id="6.3mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 6.3mm</h2>
          <Table columns={columns63} dataSource={data63} pagination={false} />
        </div>

        <div id="6.8mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 6.8mm</h2>
          <Table columns={columns68} dataSource={data68} pagination={false} />
        </div>

        <div id="7.2mm" style={{ padding: '100px 0', borderBottom: '1px solid #e8e8e8' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 7.2mm</h2>
          <Table columns={columns72} dataSource={data72} pagination={false} />
        </div>

        <div id="8.1mm" style={{ padding: '100px 0 30px' }}>
          <h2 style={{ textAlign: "center" }}>Super Cheap Diamond Price 8.1mm</h2>
          <Table columns={columns81} dataSource={data81} pagination={false} />
        </div>

        <span style={{ color: "red", marginBottom: "30px", fontStyle: "italic" }}>* Note: The common diamond price chart can change continuously depending on the time,
          contact Diamond Shop immediately to receive the most accurate diamond price quote on {currentDate}.</span>

        <br />
        <br />

        <div className='price1'>
          <img src={price1} alt="" />
        </div>

        <br />
        <br />
        <p>Loose diamonds ❤️ or natural diamonds ❤️ with international inspection certificates today
          range in price from 5 million ✓ to hundreds of millions, ✓ especially large to super large
          diamonds cost up to billions copper. According to some market research experts, they depend mainly on 4C standards,
          and there are also a number of other standards such as symmetry, luminescence, cleanliness, certificates...</p>
        <br />
        <br />
        <div className='video-wrapper'>
          <ReactPlayer
            className="video"
            url='https://www.youtube.com/watch?v=hqBM05jXs18'
            playing
            controls
          />
        </div>


      </Content>

      <Footer />
    </Layout>
  );
}

export default PriceDiamond;
