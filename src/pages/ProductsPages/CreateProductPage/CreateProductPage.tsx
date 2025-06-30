import { CreateForm } from "@components/CreateForm/CreateForm";
import { CreateProductForm } from "@components/CreateProductForm/CreateProductForm";
import { useAppDispatch } from "@hooks/redux";
import { createBrand } from "@store/reducers/ActionCreators";

export const CreateProductPage = () => {
  const dispatch = useAppDispatch()
  return (
    <div>
      <CreateProductForm/>
      <CreateForm />
    </div>
  );
};
