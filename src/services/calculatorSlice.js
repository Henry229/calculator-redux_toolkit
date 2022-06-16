import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  previousOperand: null,
  operation: null,
  currentOperand: null,
  overwrite: null,
}

const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    add_digit: (state, action) => {
      if ( state.overwrite ) {  // 답이 123으로 나온다음에 4를 누르면 클리어되고 4로 시작되어야되는데 이 로직이 
          console.log('@@overwrite: ',state.overwrite,'/', state.currentOperand);
          state.currentOperand= action.payload.digit;
          state.overwrite= false; 
        }

      if (action.payload.digit === "0" && state.currentOperand === "0") {
        return;
      }

      if (action.payload.digit === "." && state.currentOperand === ".") {
        return;
      }

      state.currentOperand = `${state.currentOperand || ""}${action.payload.digit}`;
      console.log('>>>add_digit', action.payload.digit);
    },
    choose_operation: (state, action) => {
      if (state.currentOperand == null && state.previousOperand == null) {
        return;
      };
      
      if ( state.currentOperand == null ) {
          state.operation = action.payload.operation;
          return;
      };
      
      if ( state.previousOperand == null ) {
          state.previousOperand = state.currentOperand;
          state.operation = action.payload.operation;
          state.currentOperand = null;
          return;
      };
      
        state.previousOperand = compute(state);
        state.operation = action.payload.operation;
        state.currentOperand = null;
    },
    clear: (state, action) => {
      state.previousOperand = null;
      state.operation = null;
      state.currentOperand = null;
      state.overwrite = null;
    },
    delete_digit: (state, action) => {
      if (state.overwrite) {
          state.overwrite = false;
          state.currentOperand = null;
          return;
        }

      if (state.currentOperand == null) return;

      if (state.currentOperand.length === 1) {
          state.currentOperand = null;
          return;
      }

      state.currentOperand = state.currentOperand.slice(0,-1); // last digit 지우기위한
    },
    evaluate: (state, action) => {
      if (
        state.currentOperand == null ||
        state.operation == null ||
        state.previousOperand == null 
      ) {
        return;
      }

      state.currentOperand = compute(state);
      state.overwrite = true;
      state.previousOperand = null;
      state.operation = null;
    }
}});

const compute = ({currentOperand, previousOperand, operation}) => {
  const prev = parseInt(previousOperand);
  const current = parseInt(currentOperand);
  console.log('prev: ',prev,'/current: ',current);
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "÷":
      computation = prev / current;
      break;
  };
  return computation.toString();
};

// const INTEGER_FORMATTER = new Intl.NumberFormat("en-us", {
//   maximumFractionDigits: 0,
// })
// function formatOperand(operand) {
//   if (operand == null) return
//   const [integer, decimal] = operand.split(".")
//   if (decimal == null) return INTEGER_FORMATTER.format(integer)
//   return `${INTEGER_FORMATTER.format(integer)}.${decimal}`
// }

export const {add_digit, choose_operation, clear, delete_digit,evaluate} = calculatorSlice.actions;

export default calculatorSlice.reducer;

