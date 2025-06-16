import {type FC} from 'react';
import { Menu, type MenuProps } from 'antd';
import {routes} from '../../constants/routes'
import { useNavigate } from 'react-router-dom';

const NavigationBar: FC = () => {
  const navigate = useNavigate()
  const onClick:MenuProps['onClick'] = (info) => {
    const {key} = info
    navigate(key.toString())
  };
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