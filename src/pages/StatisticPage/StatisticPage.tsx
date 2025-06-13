import type { FC } from "react";
import DynamicSlotCard from "../../components/DynamicSlotCard/DynamicSlotCard";
import CertainBrandPie from "../../components/StatisticComponents/CertainBrandPie";
const StatisticPage: FC = () => {
    return (
        <div>
            <DynamicSlotCard titleCard="Certain Brand" content={<CertainBrandPie/>}/>
            <DynamicSlotCard titleCard="Certain Brand" content={<CertainBrandPie/>}/>
        </div>
    )
}


export default StatisticPage