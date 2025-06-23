import { Spin } from 'antd'
import style from './LoadingComp.module.css'
export const Loader = () => {
    return <div className={style.loading}><Spin/></div>
}