import { Card } from "antd";
import Meta from "antd/es/card/Meta";
import type { FC } from "react";
import { type IShopItem } from "../../models/IShopItem";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";


export const ItemCard:FC<IShopItem> = ({name,price,rating}) => {
    return (
        <Card
        style={{ width: 300,margin:10 }}
        cover={<img loading="lazy" style={{maxHeight:300,objectFit:'cover'}} alt="example" src="/RTLAEH160701_27505985_1_v1_2x.webp" />}
        actions={[
      <EditOutlined key="edit" />,
      <DeleteOutlined style={{color:'red'}} key="delete" />
    ]}
        >
            <h1>{name}</h1>
            <Meta
      title={price}
      description={rating}
    />
        </Card>
    )
}