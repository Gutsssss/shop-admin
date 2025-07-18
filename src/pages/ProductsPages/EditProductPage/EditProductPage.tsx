import { CreateProductForm } from "@components/CreateProductForm/CreateProductForm";
import { Loader } from "@components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import type { IShopItem } from "@models/IShopItem";
import { editProductFromApi, getOneProductFromApi } from "@store/reducers/ActionCreators";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export const EditPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { item, isLoading } = useAppSelector((state) => state.itemReducer);
  const fetchProduct = async () => {
            try {
                await dispatch(getOneProductFromApi(Number(id)))
              
            } catch (error) {
                console.log(error)
            }
        }
  useEffect(() => {
        fetchProduct()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, dispatch])
    if (isLoading || !item || item.id !== Number(id)) {
    return <Loader />;
  }
   const editProduct = async (product:IShopItem) => {
      try {
          dispatch(editProductFromApi(product))
          console.log(product)
      } catch (error) {
        console.log(error)
      }
    }
  return (
    <div>
      <CreateProductForm currentProduct={item!} keyForm={Number(id)} onSubmit={editProduct} />
    </div>
  );
};
