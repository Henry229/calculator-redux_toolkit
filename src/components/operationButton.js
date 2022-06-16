import React from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {choose_operation} from '../services/calculatorSlice';

const OperationButton = ({operation}) => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(choose_operation({operation}))}>
    {operation}
    </button>
  )
}

export default OperationButton
