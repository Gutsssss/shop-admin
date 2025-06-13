import {type FC} from 'react';
import { Menu, type MenuProps } from 'antd';
import {routes} from '../../constants/routes'
import { useNavigate } from 'react-router-dom';

const NavigationBar: FC = () => {
  const navigate = useNavigate()
  const onClick:MenuProps['onClick'] = (e) => {
    const {key} = e
    navigate(key.toString())
  };
  return (
    <Menu
      onClick={onClick}
      style={{height:'100vh'}}
      defaultSelectedKeys={['Home']}
      mode="inline"
      items={routes}
    />
  );
};

export default NavigationBar;