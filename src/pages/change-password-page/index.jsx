import { Button, Form, Input } from "antd";
import "./index.scss";
function ChangePassword() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="change_password">
      <h1>Change Password</h1>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Old-Password"
          name="old-password"
          rules={[
            {
              required: true,
              message: "Please input your old password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="New-Password"
          name="new-password"
          rules={[
            {
              required: true,
              message: "Please input your new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          label="Confirm-Password"
          name="confirm-password"
          rules={[
            {
              required: true,
              message: "Please confirm your new password!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ChangePassword;
