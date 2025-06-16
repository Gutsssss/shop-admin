import NavigationBar from './layout/Navigation/NavigationBar'
import { Layout } from 'antd'
import HomePage from './pages/HomePage/HomePage'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import StatisticPage from './pages/StatisticPage/StatisticPage';
import LoginPage from './pages/LoginPage/LoginPage';
import AllProductsPage from './pages/ProductsPages/AllProductsPage/AllProductsPage';
import { CreateProductPage } from './pages/CreateProductPage/CreateProductPage';
const {Content,Sider} = Layout
function App() {
  return (
    <Router>
    <Layout style={{minHeight:'100%'}}>
      <Sider>
      <NavigationBar/>
      </Sider>
      <Content>
        <Routes>
          <Route path='/Home' element={<HomePage/>}/>
        </Routes>
        <Routes>
          <Route path='/Statistic' element={<StatisticPage/>}/>
        </Routes>
        <Routes>
          <Route path='/Login' element={<LoginPage/>}/>
        </Routes>
        <Routes>
          <Route path='/All' element={<AllProductsPage/>}/>
        </Routes>
        <Routes>
          <Route path='/Create' element={<CreateProductPage/>}/>
        </Routes>
      </Content>
    </Layout>
    </Router>
  )
}

export default App
