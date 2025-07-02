import { CreateProductForm } from "@components/CreateProductForm/CreateProductForm";
import { Loader } from "@components/LoadingComp/LoadingComp";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { getOneProductFromApi } from "@store/reducers/ActionCreators";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
export const EditPage = () => {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { item, isLoading } = useAppSelector((state) => state.itemReducer);
  useEffect(() => {
        const fetchProduct = async () => {
            try {
                await dispatch(getOneProductFromApi(Number(id)))
            } catch (error) {
                console.log(error)
            }
        }
        
        fetchProduct()
    }, [id, dispatch])
  return (
    <div>
      {isLoading || (item && item.id !== Number(id)) ? (
        <Loader />
      ) : (
        <CreateProductForm currentProduct={item!} key={id} />
      )}
    </div>
  );
};
