//import React from 'react'
import { useEffect, useState } from "react";
import { Button, Layout, Menu, Table, theme } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";

function PromotionEvent() {
  
    const [collapsed, setCollapsed] = useState(false);
    const [promotionEvent, setpromotionEvent] = useState([])
    const columns = [
        {
            title: "Event ID",
            dataIndex: "EventID",
            key: "EventID",
        },
        {
            title: "Event Name",
            dataIndex: "EventName",
            key: "EventName",
        },
        {
            title: "Description",
            dataIndex: "EventDescription",
            key: "EventDescription",
        },
        {
            title: "Event Date",
            dataIndex: "EventDate",
            key: "EventDate",
        },
        {
            title: "Event Location",
            dataIndex: "EventLocation",
            key: "EventLocation",
        },
        {
            title: "Event Type",
            dataIndex: "EventType",
            key: "EventType",
        },
    ];
    const fetchData = async () => {
        try {
          const response = await axios.get("http://localhost:8090/events/promotionEvents");
          setpromotionEvent(response.data);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
    
      useEffect(() => {
        fetchData();
      }, []);

      
  return (
            <Table dataSource={promotionEvent} columns={columns} />
  )
}

export default PromotionEvent
