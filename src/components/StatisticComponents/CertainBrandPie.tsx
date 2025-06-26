import {Pie} from '@ant-design/charts'
import { Loader } from '@components/LoadingComp/LoadingComp';
import { useAppDispatch,useAppSelector } from '@hooks/redux';
import { fetchBrands, fetchItems } from '@store/reducers/ActionCreators';
import { useEffect } from 'react';
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
    const productWithBrand = [...items].filter(prod => prod.brandId === brandId)
    return productWithBrand.length
  }
  const getData = () => {
    const res:Array<object> = [];
    if(brands.length !== 0) {
      brands.map(elem => {
     res.push({type:elem.name,quantity:filterBrands(elem.id)})
    })
    }
    return res
  }
    const data = getData()
    const config = {
    data,
    angleField: 'quantity',
    colorField: 'type',
    label: {
      text: 'type',
      style: {
        fontWeight: 'bold',
      },
    },
    legend: {
      color: {
        title: false,
        position: 'right',
        rowPadding: 5,
      },
    },
  };
    return (
        <Pie {...config}/>
    )
}

export default CertainBrandPie