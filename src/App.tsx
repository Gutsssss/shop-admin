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
import { useAppDispatch } from "@hooks/redux";
import { check, logoutAndRemoveToken } from "@store/reducers/ActionCreators";
import { EditPage } from "@pages/ProductsPages/EditProductPage/EditProductPage";
import { useEffect } from "react";
const { Content, Sider } = Layout;
function App() {
  // const {isAuth} = useAppSelector(state => state.userReducer)
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    dispatch(logoutAndRemoveToken());
  };
  useEffect(() => {
    dispatch(check())
  })
  return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          style={{
            overflow: "auto",
            height: "100vh",
            position: "sticky",
            insetInlineStart: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <NavigationBar />
        </Sider> 
        <Content>
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
            <Route
              path="/edit/:id"
              element={
                <ProtectedRoute role="ADMIN">
                  <EditPage />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/login" />} />
            <Route
              path="/exit"
              action={() => {
                handleLogout();
              }}
              element={null}
            />
          </Routes>
        </Content>
        
      </Layout>
  );
}

export default App;
