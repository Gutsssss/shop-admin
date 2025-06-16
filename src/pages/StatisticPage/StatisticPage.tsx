import type { FC } from "react";
import DynamicSlotCard from "../../components/DynamicSlotCard/DynamicSlotCard";
import CertainBrandPie from "../../components/StatisticComponents/CertainBrandPie";
const StatisticPage: FC = () => {
    return (
        <div>
            <DynamicSlotCard titleCard="Certain Brand" children={<CertainBrandPie/>}/>
            <DynamicSlotCard titleCard="Certain Brand" children={<CertainBrandPie/>}/>
        </div>
    )
}


export default StatisticPage