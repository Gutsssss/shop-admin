import DynamicSlotCard from "@components/DynamicSlotCard/DynamicSlotCard";
import CertainBrandPie from "@components/StatisticComponents/CertainBrandPie";
import CertainBrandColumn from "@components/StatisticComponents/CertainBrandColumn";
const StatisticPage = () => {
    return (
        <div>
            <DynamicSlotCard titleCard="Certain Brand" children={<CertainBrandPie/>}/>
            <DynamicSlotCard titleCard="Certain Brand" children={<CertainBrandColumn/>}/>
        </div>
    )
}


export default StatisticPage