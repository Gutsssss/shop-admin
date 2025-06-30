import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { searchProducts } from "@store/reducers/ActionCreators";
import { Loader } from "@components/Loader/Loader";
import { ItemCard } from "@components/ItemCard/ItemCard";
import { MyInput } from "@components/MyInput/MyInput";
import style from './AllProductsPage.module.css'
import { NoData } from "@components/NoData/NoData";

const AllProductsPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.itemReducer);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timerId = setTimeout(() => {
      if (input.trim() !== '') {
        dispatch(searchProducts(input));
      }
    }, 500);
    return () => clearTimeout(timerId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  const handleInputChange = (value: string) => {
    setInput(value);
};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      
      <MyInput input={input} onChangeInput={handleInputChange}/>
      <div className={style.mainProducts}>
        {items?.length > 0 ? (
          items.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              typeId={item.typeId}
              brandId={item.brandId}
              rating={item.rating}
            />
          ))
        ) : (
          <div className={style.noResults}>
            {input ? <NoData/> : 'Введите поисковый запрос'}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;