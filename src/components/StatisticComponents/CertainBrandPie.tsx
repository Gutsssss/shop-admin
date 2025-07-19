import { Pie } from "@ant-design/charts";
import { Loader } from "@components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "@hooks/redux";
import type { IShopItem } from "@models/IShopItem";
import { fetchBrands, fetchItems } from "@store/reducers/ActionCreators";
import { useEffect } from "react";

const CertainBrandPie = () => {
  const dispatch = useAppDispatch();
  const { brands } = useAppSelector((state) => state.brandReducer);
  const { items, isLoading } = useAppSelector((state) => state.itemReducer);

  useEffect(() => {
    dispatch(fetchItems());
    dispatch(fetchBrands());
  }, [dispatch]);

  const filterBrands = (brandId: number): number => {
    if (!items) return 0;
    return items.filter((prod: IShopItem) => 
      Number(prod.brandId) === Number(brandId)
    ).length;
  };

  const modifyData = (): PieDataItem[] => {
    if (!brands || !items) return [];
    return brands.map((elem: IBrand) => ({
      type: elem.name,
      value: filterBrands(Number(elem.id))
    }));
  };

  const data = modifyData();

  if (isLoading || !data.length) {
    return <Loader />;
  }

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <Pie
        data={data}
        angleField="value"
        colorField="type"
        label={{ type: 'inner', offset: '-30%' }}
        interactions={[{ type: 'element-active' }]}
      />
    </div>
  );
};
export default CertainBrandPie