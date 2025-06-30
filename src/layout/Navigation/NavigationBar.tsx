import { Menu, type MenuProps } from 'antd';
import {routes} from '../../constants/routes'
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useAppDispatch } from '@hooks/redux';
import { logoutAndRemoveToken } from '@store/reducers/ActionCreators';
const NavigationBar = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch() 
  const onClick:MenuProps['onClick'] = useCallback((info: {key:string}) => {
    navigate(info.key)
    if(info.key === '/exit') {
      dispatch(logoutAndRemoveToken())
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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