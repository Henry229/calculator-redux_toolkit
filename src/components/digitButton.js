import React from 'react';
import {add_digit} from '../services/calculatorSlice';
import {useSelector, useDispatch} from 'react-redux';


const DigitButton = ({digit}) => {
  // const state = useSelector( state => state.calculator);
  const dispatch = useDispatch();
   
  return (
   <button onClick={() => dispatch(add_digit({digit}))}>{digit}</button>
  )
}

export default DigitButton;
