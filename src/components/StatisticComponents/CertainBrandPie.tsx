import {Pie} from '@ant-design/charts'
import type { FC } from 'react'

const CertainBrandPie:FC = () => {
    const data = [{type:'Adidas',value:2},{type:'Nike',value:4},{type:'Demix',value:1}]
    const config = {
    data,
    angleField: 'value',
    colorField: 'type',
    label: {
      text: 'value',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
    return (
        <Pie {...config}/>
    )
}

export default CertainBrandPie