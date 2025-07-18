import { CreateForm } from "@components/CreateForm/CreateForm";
import { CreateProductForm } from "@components/CreateProductForm/CreateProductForm";
import { useAppDispatch } from "@hooks/redux";
import type { IShopItem } from "@models/IShopItem";
import { createBrandOnApi, createProductOnApi, createTypeOnApi } from "@store/reducers/ActionCreators";
import { Divider } from "antd";

type ActionType = 'brand' | 'type';

const actionsByType: Record<ActionType, (name: string) => ReturnType<typeof createBrandOnApi>> = {
  brand: (name: string) => createBrandOnApi(name),
  type: (name: string) => createTypeOnApi(name),
};

export const CreateProductPage = () => {
  const dispatch = useAppDispatch()
  const handleCreate = (name:string,dataType:string) => {
      try {
        if (Object.keys(actionsByType).includes(dataType)) {
        dispatch(actionsByType[dataType](name))
}
      }
      catch(err) {
        console.log(err)
      }
  }
  const createProduct = async (product:IShopItem) => {
    try {
        dispatch(await createProductOnApi(product))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div>
      <CreateProductForm keyForm={`createForm`} onSubmit={createProduct}/>
      <Divider orientation="left">Brand</Divider>
      <CreateForm label="Создание бренда" createFunc={(name) => handleCreate(name,'brand')}/>
        <Divider orientation="left">Type</Divider>
      <CreateForm label="Создание типа" createFunc={(name) => handleCreate(name,'type')}/>
    </div>
  );
};
