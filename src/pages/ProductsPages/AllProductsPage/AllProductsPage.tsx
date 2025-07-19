import { useEffect, useState, useCallback, useRef } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import { fetchItems, searchProducts } from "@store/reducers/ActionCreators";
import { Loader } from "@components/Loader/Loader";
import { ItemCard } from "@components/ItemCard/ItemCard";
import { MyInput } from "@components/MyInput/MyInput";
import style from "./AllProductsPage.module.css";
import { NoData } from "@components/NoData/NoData";

const AllProductsPage = () => {
  const dispatch = useAppDispatch();
  const { items, isLoading } = useAppSelector((state) => state.itemReducer);
  const [input, setInput] = useState("");
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback((query: string) => {
    if (query.trim() === "") {
      dispatch(fetchItems());
    } else {
      dispatch(searchProducts(query.trim()));
    }
  }, [dispatch]);

  useEffect(() => {
    if (input) {
      clearTimeout(input);
    }
    searchTimeoutRef.current = setTimeout(() => {
      performSearch(input);
    }, 500);
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [input, performSearch]);

  const handleInputChange = useCallback((value: string) => {
    setInput(value);
  }, []);

  const displayedItems = input 
    ? items.filter(item => 
        item.name.toLowerCase().includes(input.toLowerCase()))
    : items;

  if (isLoading && !input) {
    return <Loader />;
  }

  return (
    <div>
      <MyInput 
        input={input} 
        onChangeInput={handleInputChange} 
        placeholder="Поиск товаров..."
      />
      
      <div className={style.mainProducts}>
        {displayedItems?.length > 0 ? (
          displayedItems.map((item) => (
            <ItemCard
              key={item.id}
              id={item.id}
              img={item.img}
              name={item.name}
              price={item.price}
              typeId={item.typeId}
              brandId={item.brandId}
              rating={Number(item.rating)}
              messageText={""}
            />
          ))
        ) : (
          <div className={style.noResults}>
            {input ? (
              <NoData text="Ничего не найдено" />
            ) : (
              "Список товаров пуст"
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductsPage;