import { CreateForm } from "@components/CreateForm/CreateForm";
import { CreateProductForm } from "@components/CreateProductForm/CreateProductForm";
import { useAppDispatch } from "@hooks/redux";
import { createBrandOnApi, createTypeOnApi } from "@store/reducers/ActionCreators";
import { Divider } from "antd";

export const CreateProductPage = () => {
  const dispatch = useAppDispatch()
  const handleCreate = (name:string,dataType:string) => {
      try {
        if(dataType === 'brand') {
          dispatch(createBrandOnApi(name))
        }
        if(dataType === 'type') {
          dispatch(createTypeOnApi(name))
        }
        
      }
      catch(err) {
        console.log(err)
      }
  }
  return (
    <div>
      <CreateProductForm/>
      <Divider orientation="left">Brand</Divider>
      <CreateForm label="Создание бренда" createFunc={(name) => handleCreate(name,'brand')}/>
        <Divider orientation="left">Type</Divider>
      <CreateForm label="Создание типа" createFunc={(name) => handleCreate(name,'type')}/>
    </div>
  );
};
