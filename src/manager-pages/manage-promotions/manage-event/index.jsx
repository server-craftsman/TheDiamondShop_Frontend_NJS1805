import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form, Input, DatePicker, message } from 'antd';
import axios from 'axios';
import moment from 'moment';

const ManageEvent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8090/events/promotionEvents');
      setEvents(response.data);
    } catch (error) {
      message.error('Failed to fetch events');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (values) => {
    try {
      await axios.post('http://localhost:8090/events/new-event', values);
      message.success('Event created successfully');
      fetchEvents();
      setIsModalVisible(false);
      form.resetFields();
    } catch (error) {
      message.error('Failed to create event');
    }
  };

  const handleUpdate = async (values) => {
    try {
      await axios.put(`http://localhost:8090/events/update-event/${editingEvent.EventID}`, values);
      message.success('Event updated successfully');
      fetchEvents();
      setIsModalVisible(false);
      form.resetFields();
      setEditingEvent(null);
    } catch (error) {
      message.error('Failed to update event');
    }
  };

  const handleEdit = (record) => {
    setEditingEvent(record);
    setIsModalVisible(true);
    form.setFieldsValue({
      ...record,
      EventDate: moment(record.EventDate), // Convert date string to moment object
    });
  };

  const columns = [
    {
      title: 'Event Name',
      dataIndex: 'EventName',
      key: 'EventName',
    },
    {
      title: 'Event Description',
      dataIndex: 'EventDescription',
      key: 'EventDescription',
    },
    {
      title: 'Event Date',
      dataIndex: 'EventDate',
      key: 'EventDate',
    },
    {
      title: 'Event Location',
      dataIndex: 'EventLocation',
      key: 'EventLocation',
    },
    {
      title: 'Event Type',
      dataIndex: 'EventType',
      key: 'EventType',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Button type="link" onClick={() => handleEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" onClick={() => setIsModalVisible(true)} style={{ marginBottom: 16 }}>
        New Event
      </Button>
      <Table columns={columns} dataSource={events} loading={loading} rowKey="EventID" />

      <Modal
        title={editingEvent ? 'Edit Event' : 'New Event'}
        visible={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false);
          form.resetFields();
          setEditingEvent(null);
        }}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              if (editingEvent) {
                handleUpdate(values);
              } else {
                handleCreate(values);
              }
            })
            .catch((info) => {
              console.log('Validate Failed:', info);
            });
        }}
      >
        <Form form={form} layout="vertical" name="eventForm">
          <Form.Item
            name="EventName"
            label="Event Name"
            rules={[{ required: true, message: 'Please input the event name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="EventDescription"
            label="Event Description"
            rules={[{ required: true, message: 'Please input the event description!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="EventDate"
            label="Event Date"
            rules={[{ required: true, message: 'Please select the event date!' }]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            name="EventLocation"
            label="Event Location"
            rules={[{ required: true, message: 'Please input the event location!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="EventType"
            label="Event Type"
            rules={[{ required: true, message: 'Please input the event type!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ManageEvent;
