import type { FC, ReactElement } from 'react'
import Card from 'antd/es/card/Card'
interface DynamicSlotProps<T = unknown> {
    content?: ReactElement<T>,
    titleCard:string
}

const DynamicSlotCard:FC<DynamicSlotProps> = ({content,titleCard}) => {
    return (
        <Card title={titleCard}>
            {content}
        </Card>
    )
}
export default DynamicSlotCard