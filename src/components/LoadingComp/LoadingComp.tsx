import { Spin } from 'antd'
import type { FC } from 'react'
import style from './LoadingComp.module.css'
export const LoadingComp:FC = () => {
    return <div className={style.loading}><Spin/></div>
}