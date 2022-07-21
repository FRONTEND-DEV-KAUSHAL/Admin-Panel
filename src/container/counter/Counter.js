import { Button } from '@mui/material';
import React from 'react';

function Counter(props) {
    return (
        <div>
            <Button onClick={() => handleIncrement()}>+</Button>
            {c.counter}
            <Button onClick={() => handleDecrement()}>+</Button>
            
        </div>
    );
}

export default Counter;