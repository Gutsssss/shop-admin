import NavigationBar from "./layout/Navigation/NavigationBar";
import { Layout } from "antd";
import HomePage from "@pages/HomePage/HomePage";
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import StatisticPage from "@pages/StatisticPage/StatisticPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import AllProductsPage from "@pages/ProductsPages/AllProductsPage/AllProductsPage";
import { CreateProductPage } from "@pages/ProductsPages/CreateProductPage/CreateProductPage";
import { ProtectedRoute } from "@components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { check, logoutAndRemoveToken } from "@store/reducers/ActionCreators";
import { useEffect } from "react";
import { Loader } from "@components/Loader/Loader";
const { Content, Sider } = Layout;
function App() {
  const {isAuth,isLoading} = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAndRemoveToken())
  }
  useEffect(() => {
    dispatch(check())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  return (
      <Layout style={{ minHeight: "100vh" }}>
        {isAuth && <Sider>
            <NavigationBar />
          </Sider>}
          {isLoading ? <Loader/> : <Content>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute role="ADMIN">
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/statistic"
              element={
                <ProtectedRoute role="ADMIN">
                  <StatisticPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/all"
              element={
                <ProtectedRoute role="ADMIN">
                  <AllProductsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute role="ADMIN">
                  <CreateProductPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route
              path="/exit"
              action={() => {
                handleLogout()
              }}
              element={null}
            />
          </Routes>
        </Content>}
        
      </Layout>
  );
}

export default App;
