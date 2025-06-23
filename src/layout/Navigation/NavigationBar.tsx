import { Menu, type MenuProps } from 'antd';
import {routes} from '../../constants/routes'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
const NavigationBar = () => {
  const navigate = useNavigate()
  const onClick:MenuProps['onClick'] = useCallback((info: {key:string}) => {
    navigate(info.key)
  },[navigate]);
  return (
    <Menu
      onClick={onClick}
      style={{height:'100vh'}}
      defaultSelectedKeys={[]}
      mode="inline"
      items={routes}
    />
  );
};

export default NavigationBar;