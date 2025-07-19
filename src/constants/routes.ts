import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];

export const routes: MenuItem[] = [
  {
    key: '/statistic',
    label: 'Statistic',
  },
  {
    key: 'shop-items',
    label: 'Shop items',
    type: "group",
    children: [
      { key: '/all', label: 'All products' },
      { key: '/create', label: 'Create product' },
      // { key: '/edit/:id', label: 'Edit product' }
    ]
  },
  {
    key: '/orders',
    label: 'Orders',
  },
  {
    key: '/exit',
    label: "Exit",
    style: { color: 'black', paddingLeft: '20px', background: '#fc2847' },
  },
];