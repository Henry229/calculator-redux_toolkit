import React, { useReducer } from 'react';
import './app.css';
import OperationButton from './components/operationButton';
import DigitButton from './components/digitButton';
import { useSelector, useDispatch} from 'react-redux';
import {clear, delete_digit, evaluate} from './services/calculatorSlice';

const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
})
function formatOperand(operand) {
  if (operand == null) return
  const [integer, decimal] = operand.split(".")
  if (decimal == null) return INTEGER_FORMATTER.format(integer)
  return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
}

function App() {
  const previousOperand = useSelector(state => state.calculator.previousOperand);
  const operation = useSelector(state => state.calculator.operation);
  const currentOperand = useSelector(state => state.calculator.currentOperand);
  const dispatch = useDispatch();
  console.log(`>>>>previousOperand: ${previousOperand} / currentOperand: ${currentOperand}`);

  return (
    <div className='container'>
      <div className="output">
        <div className="previous-operand">
          {formatOperand(previousOperand)}{operation}
        </div>
        <div className="current-operand">
          {formatOperand(currentOperand)}
        </div>
      </div>
      <button className="span-two"  
        onClick={() => {dispatch(clear())}}
       >
      AC
      </button>
      <button 
        onClick={() => {dispatch(delete_digit())}}
      >
      DEL
      </button>
      <OperationButton operation="÷" />
      <DigitButton digit="1" />
      <DigitButton digit="2" />
      <DigitButton digit="3" />
      <OperationButton operation="*" />
      <DigitButton digit="4" />
      <DigitButton digit="5" />
      <DigitButton digit="6" />
      <OperationButton operation="+" />
      <DigitButton digit="7" />
      <DigitButton digit="8" />
      <DigitButton digit="9" />
      <OperationButton operation="-" />
      <DigitButton digit="." />
      <DigitButton digit="0" />
      <button className="span-two"  
        onClick={() => dispatch(evaluate())}
      >
      =
      </button>
    </div>
  );
}

export default App;
