import type { FC } from "react";
import { Button, Form, Input } from "antd";

type FieldType = {
  username?: string;
  password?: string;
};
const LoginPage: FC = () => {
  return (
    <div>
      <Form>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
