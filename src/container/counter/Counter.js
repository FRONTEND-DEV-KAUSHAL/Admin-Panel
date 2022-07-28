import { Button } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../redux/Action/Counter.action';

function Counter(props) {
    const c = useSelector(state => state.counter)
    const dispatch = useDispatch()

    const handleIncrement = () => {
        dispatch(increment())
    }

    const handleDecrement = () => {
        dispatch(decrement())
    }
    return (
        <div>
            <Button  onClick={() => handleIncrement()}>+</Button> 
            { c.counter }
            <Button  onClick={() => handleDecrement()}>-</Button>
        </div>
    );
}

export default Counter;