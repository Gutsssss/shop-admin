import { Pie } from '@ant-design/charts';
import { Loader } from '@components/Loader/Loader';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { fetchBrands, fetchItems } from '@store/reducers/ActionCreators';
import { useEffect } from 'react';
import { configPie } from '../../Static/baseConfigPie';
import type { IBrand } from '@models/IBrand';

interface Product {
  brandId: number | string;
  [key: string]: any;
}

interface PieDataItem {
  type: string;
  value: number;
}

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
    return items.filter((prod: Product) => 
      Number(prod.brandId) === brandId
    ).length;
  };

  const modifyData = (): PieDataItem[] => {
    if (!brands) return [];
    return brands.map((elem: IBrand) => ({
      type: elem.name,
      value: filterBrands(elem.id as number)
    }));
  };

  const data = modifyData();
  const config = {
    data,
    ...configPie
  };

  if (isLoading || !data.length) {
    return <Loader />;
  }

  return <Pie {...config} />;
};

export default CertainBrandPie;