import { useState, type FC } from "react";
import { Button, Form, Input } from "antd";
import { login } from "@store/reducers/ActionCreators";
import { useNavigate } from "react-router-dom";

type FieldType = {
  username?: string;
  password?: string;
};
const LoginPage: FC = () => {
  const navigate = useNavigate()
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')

  const auth = async () => {
    const response = await login(email, password);
    navigate('/home');
    return response
      

}

  return (
    <div>
      <Form style={{margin:'20px'}}>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)}/>
        </Form.Item>
        <Form.Item<FieldType>
      label="Password"
      name="password"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password value={password} onChange={(e) => setPassword(e.target.value)}/>
    </Form.Item>
    <Form.Item label={null}>
      <Button type="primary" htmlType="submit" onClick={auth}>
        Login
      </Button>
    </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
