import NavigationBar from "./layout/Navigation/NavigationBar";
import { Layout } from "antd";
import HomePage from "@pages/HomePage/HomePage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StatisticPage from "@pages/StatisticPage/StatisticPage";
import LoginPage from "@pages/LoginPage/LoginPage";
import AllProductsPage from "@pages/ProductsPages/AllProductsPage/AllProductsPage";
import { CreateProductPage } from "@pages/CreateProductPage/CreateProductPage";
const { Content, Sider } = Layout;
function App() {
  const isLoginPage = location.pathname.toLowerCase() === '/login';
  return (
    <Router>
      <Layout style={{ minHeight: "100vh" }}>
      {!isLoginPage && (
        <Sider>
          <NavigationBar />
        </Sider>
      )}
      <Content>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          {!isLoginPage && (
            <>
              <Route path="/home" element={<HomePage />} />
              <Route path="/statistic" element={<StatisticPage />} />
              <Route path="/all" element={<AllProductsPage />} />
              <Route path="/create" element={<CreateProductPage />} />
            </>
          )}
        </Routes>
      </Content>
    </Layout>
    </Router>
  );
}

export default App;
