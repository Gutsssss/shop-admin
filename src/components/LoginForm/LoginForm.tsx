import {  useEffect, useState} from "react";
import { Button, Form, Input, message } from "antd";
import { login } from "@store/reducers/ActionCreators";
import { useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "@hooks/redux";

type FieldType = {
  username?: string;
  password?: string;
};
export const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const { isAuth, error,user } = useAppSelector(
    (state) => state.userReducer
  );
  const errorMessage = (text:string) => {
    messageApi.open({
      type: "error",
      content: `${text}`,
    });
  };
  const auth = async() => {
    try {
      const userData = await dispatch(login(email, password));
      return userData
    } catch (err) {
      console.error("Auth error:", err);
    }
  };
  useEffect(() => {
  if (isAuth && user?.role === 'ADMIN') {
    navigate("/home", { replace: true });
  } else if (error) {
    errorMessage(error as string);
    navigate('/login', { replace: true });
  } else if (isAuth && user?.role !== 'ADMIN') {
    errorMessage('Такого пользователя не существует');
    navigate('/login', { replace: true });
  }
}, [isAuth, error, user?.role, navigate]);

  return (
    <div>
      {contextHolder}
      <Form style={{ margin: "20px" }}>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
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
