import type { ReactNode } from 'react'
import Card from 'antd/es/card/Card'
interface DynamicSlotProps {
    children?: ReactNode,
    titleCard:string
}

const DynamicSlotCard = ({children,titleCard}:DynamicSlotProps) => {
    return (
        <Card title={titleCard}>
            {children}
        </Card>
    )
}
export default DynamicSlotCard