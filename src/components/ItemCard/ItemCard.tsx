import { Card,message } from "antd";
import Meta from "antd/es/card/Meta";
import { type IShopItem } from "../../models/IShopItem";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useAppDispatch } from "@hooks/redux";
import { deleteProductFromApi } from "@store/reducers/ActionCreators";
import { Link } from "react-router-dom";

type ItemCardProps = IShopItem & {messageText:string}

export const ItemCard = ({name,price,rating,id,img,messageText}:ItemCardProps) => {
    const dispatch = useAppDispatch();
    const [messageApi] = message.useMessage()
    const successMessage = (text:string) => {
        messageApi.open({
            type:'success',
            content: `${text}`
        })
    }
    const errorMessage = (text:string) => {
        messageApi.open({
            type:'error',
            content: `${text}`
        })
    }
    const deleteProduct = (id: number) => {
        try {
            dispatch(deleteProductFromApi(id))
            successMessage(`Товар с id:${id} успешно удален`)
        }
        catch(err) {
            console.log(err)
            errorMessage(messageText as string)
        }
    }
    return (
        <>
        <Card
  style={{ 
    width: 300,
    margin: 10,
    display: 'grid',
    gridTemplateRows: 'auto 1fr auto',
  }}
  cover={
    <img 
      loading="lazy" 
      style={{
        height: 300,
        objectFit: 'cover',
        width: '100%'
      }} 
      alt={name} 
      src={`${import.meta.env.VITE_APP_API_URL}${img}`} 
    />
  }
  actions={[
    <Link to={`/edit/${id}`}><EditOutlined key="edit" /></Link>,
    <DeleteOutlined 
      onClick={() => deleteProduct(id!)} 
      style={{color:'red'}} 
      key="delete" 
    />
  ]}
>
  <div style={{
    padding: '16px',
    overflow: 'hidden'
  }}>
    <h3 style={{ marginBottom: 8 }}>{name}</h3>
    <Meta
      title={`${price} ₽`}
      description={`Рейтинг: ${rating}`}
    />
  </div>
</Card>
        </>
    )
}