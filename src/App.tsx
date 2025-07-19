import { useEffect } from "react";
import { Layout } from "antd";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import NavigationBar from "./layout/Navigation/NavigationBar";
import LoginPage from "@pages/LoginPage/LoginPage";
import AllProductsPage from "@pages/ProductsPages/AllProductsPage/AllProductsPage";
import StatisticPage from "@pages/StatisticPage/StatisticPage";
import { CreateProductPage } from "@pages/ProductsPages/CreateProductPage/CreateProductPage";
import { ProtectedRoute } from "@components/ProtectedRoute/ProtectedRoute";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { check, logoutAndRemoveToken } from "@store/reducers/ActionCreators";
import { EditPage } from "@pages/ProductsPages/EditProductPage/EditProductPage";

const { Content, Sider } = Layout;

function App() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, isAuth } = useAppSelector(state => state.userReducer);

  useEffect(() => {
    dispatch(check());
  }, [dispatch]);

  useEffect(() => {
    if (isAuth && window.location.pathname === "/") {
      navigate("/all", { replace: true });
    }
  }, [isAuth, navigate]);

  const handleLogout = () => {
    dispatch(logoutAndRemoveToken());
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {isAuth && (
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
      )}
      <Content>
        <Routes>
          <Route 
            path="/login" 
            element={isAuth ? <Navigate to="/all" replace /> : <LoginPage />} 
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
            path="/statistic"
            element={
              <ProtectedRoute role="ADMIN">
                <StatisticPage />
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
          <Route 
            path="*" 
            element={<Navigate to={isAuth ? "/all" : "/login"} replace />} 
          />
          <Route
            path="/exit"
            action={handleLogout}
            element={null}
          />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;