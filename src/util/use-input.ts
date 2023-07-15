import { ChangeEvent, useReducer } from "react";

type InputState = {
  value: string;
  isTouched: boolean;
};

enum InputActionType {
  INPUT,
  BLUR,
  RESET,
}

type InputActionWithValue = {
  type: InputActionType.INPUT | InputActionType.RESET;
  value: string;
};

type InputActionWithoutValue = {
  type: InputActionType.BLUR;
};

type InputAction = InputActionWithValue | InputActionWithoutValue;

const inputStateReducer = (state: InputState, action: InputAction) => {
  if (action.type === InputActionType.INPUT) {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === InputActionType.BLUR) {
    return { value: state.value, isTouched: true };
  }
  if (action.type === InputActionType.RESET) {
    return { value: action.value, isTouched: false };
  }
  return { value: "", isTouched: false };
};

const useInput = (
  validateValue: (value: string) => boolean,
  initialValue = ""
) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, {
    value: initialValue,
    isTouched: false,
  });
  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (
    value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (typeof value === "string") {
      dispatch({ type: InputActionType.INPUT, value: value });
    } else {
      dispatch({ type: InputActionType.INPUT, value: value.target.value });
    }
  };

  const inputBlurHandler = () => {
    dispatch({ type: InputActionType.BLUR });
  };

  const reset = () => {
    dispatch({ type: InputActionType.RESET, value: initialValue });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
