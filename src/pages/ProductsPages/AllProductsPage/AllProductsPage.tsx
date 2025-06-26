import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchItems } from "@store/reducers/ActionCreators";
import { Loader } from "@components/LoadingComp/LoadingComp";
import { ItemCard } from "@components/ItemCard/ItemCard";
import { MyInput } from "@components/MyInput/MyInput";
import style from './AllProductsPage.module.css'
const AllProductsPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading,error } = useAppSelector((state) => state.itemReducer);
  useEffect(() => {
    dispatch(fetchItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div>
      <MyInput/>
      <div className={style.mainProducts}>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          img={item.img}
          name={item.name}
          price={item.price}
          typeId={item.typeId}
          brandId={item.brandId}
          rating={item.rating}
          messageText={error}
        />
      ))}
    </div>
    </div>
  );
};

export default AllProductsPage;
