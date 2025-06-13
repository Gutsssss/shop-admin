import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
export const routes:MenuItem[] = [
    {
        key:'Home',
        label:'Home',
    },
    {
        key:'Statistic',
        label:'Statistic',
    },
    {
        key:'ShopItems',
        label:'Shop items',
        type:"group",
        children:[
            {key:'All',label:'All products'},
            {key:'Create',label:'Create product'},
            {key:'Edit',label:'Edit product'}
        ]
    },
    {
        key:'Orders',
        label:'Orders',
    },
    {
        key:"Exit",
        label:"Exit",
        style: {color:'black',paddingLeft:'20px',background:'#fc2847' },
    },
]