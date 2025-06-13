import {useEffect, type FC} from 'react';
import { UseAppDispatch, UseAppSelector } from '../../hooks/redux';
import { fetchItems } from '../../store/reducers/ActionCreators';

const HomePage :FC = () => {
    const dispatch = UseAppDispatch()
    const {items} = UseAppSelector(state => state.itemReducer)
    useEffect(() => {
        dispatch(fetchItems())
    },[ ])
    return (
        <div>
            {JSON.stringify(items,null,2)}
        </div>
    ) 
}

export default HomePage