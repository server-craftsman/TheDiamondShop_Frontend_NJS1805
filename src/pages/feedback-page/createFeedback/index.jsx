import React from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';

const FeedbackForm = () => {
  const [form] = Form.useForm();

  const onFinish = async (values) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      const response = await axios.post('http://localhost:8090/features/feedback', values, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response.status === 201) {
        message.success('Feedback submitted successfully!');
        form.resetFields();
      } else {
        message.error('Failed to submit feedback.');
      }
    } catch (error) {
      message.error(`Error: ${error.response.data.error}`);
    }
  };

  return (
    <div>
      <h2>Submit Feedback</h2>
      <Form form={form} onFinish={onFinish}>
        <Form.Item
          label="Content"
          name="content"
          rules={[{ required: true, message: 'Please input your feedback content!' }]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          label="Rating"
          name="rating"
          rules={[{ required: true, message: 'Please input your rating!' }]}
        >
          <Input type="number" min="1" max="5" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FeedbackForm;
