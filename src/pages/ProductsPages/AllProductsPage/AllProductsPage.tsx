import { useEffect, type FC } from "react";
import { UseAppDispatch, UseAppSelector } from "@hooks/redux";
import { fetchItems } from "@store/reducers/ActionCreators";
import { LoadingComp } from "@components/LoadingComp/LoadingComp";
import { ItemCard } from "@components/ItemCard/ItemCard";

const AllProductsPage: FC = () => {
  const dispatch = UseAppDispatch();
  const { items, isLoading } = UseAppSelector((state) => state.itemReducer);
  useEffect(() => {
    dispatch(fetchItems());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  if (isLoading) {
    return <LoadingComp />;
  }
  return (
    <div>
      {items.map((item) => (
        <ItemCard
          key={item.id}
          id={item.id}
          img=""
          name={item.name}
          price={item.price}
          typeId={item.typeId}
          brandId={item.brandId}
          rating={item.rating}
        />
      ))}
    </div>
  );
};

export default AllProductsPage;
