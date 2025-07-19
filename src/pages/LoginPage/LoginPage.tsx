
import { LoginForm } from "@components/LoginForm/LoginForm";
import { useAppSelector } from "@hooks/redux";
import { useLocation, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { isAuth } = useAppSelector(state => state.userReducer);
  const location = useLocation();
  const navigate = useNavigate();
  
  const from = location.state?.from || '/all';

  if (isAuth) {
    navigate(from, { replace: true });
  }
  return (
    <div>
      {/* {contextHolder} */}
      <LoginForm/>
    </div>
  );
};
export default LoginPage;
