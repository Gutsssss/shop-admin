import {Pie} from '@ant-design/charts'
import { Loader } from '@components/LoadingComp/LoadingComp';
import { useAppDispatch,useAppSelector } from '@hooks/redux';
import { fetchBrands, fetchItems } from '@store/reducers/ActionCreators';
import { useEffect } from 'react';
import { configPie } from '../../Static/baseConfigPie';
const CertainBrandPie = () => {
    const dispatch = useAppDispatch();
  const { brands } = useAppSelector((state) => state.brandReducer);
  const {items,isLoading} = useAppSelector((state) => state.itemReducer)
  useEffect(() => {
      dispatch(fetchItems());
      dispatch(fetchBrands())
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    if (isLoading) {
      return <Loader />;
    }
  const filterBrands = (brandId:number) => {
    const productWithBrand = items.filter(prod => prod.brandId === brandId)
    return productWithBrand.length
  }
  const modifyData = () => {
    return brands.map(elem => ({
      type:elem.name,
      quantity:filterBrands(elem.id)
    }))
  }
    const data = modifyData()
    const config = {
    data,
    ...configPie
  };
    return (
        <Pie {...config}/>
    )
}

export default CertainBrandPie