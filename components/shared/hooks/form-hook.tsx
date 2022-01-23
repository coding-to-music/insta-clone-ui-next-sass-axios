import { useCallback, useReducer } from "react";

export interface inputsType {
  title?: { value: string | number; isValid: boolean };
  description?: { value: string | number; isValid: boolean };
  address?: { value: string | number; isValid: boolean };
}
export interface actionObj {
  type: "INPUT_CHANGE";
  value: string | number;
  isValid: boolean;
  inputID: string;
}
export interface actionObjSet {
  type: "SET_DATA";
  formIsValid: boolean;
  inputs: inputsType;
}

//state data arch
// [inputs objects are determined by form creating it using useForm hook]
// inputs:{
//   title?: { value: string | number; isValid: boolean };
//   description?: { value: string | number; isValid: boolean };
//   address?: { value: string | number; isValid: boolean };
// }
// isValid: boolean

const formReducer = (state: any, action: actionObj | actionObjSet) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;

      for (const inputID in state.inputs) {
        if (inputID === action.inputID) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputID].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputID]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return { inputs: action.inputs, isValid: action.formIsValid };
    default:
      return state;
  }
};

const useForm = (initialInputs: any, initialFormValidity: boolean) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        value: value,
        isValid: isValid,
        inputID: id,
      });
    },
    []
  );

  //used to manually set form data if needed from API
  const setFormData = useCallback(
    (inputData: inputsType, formValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputData,
        formIsValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};
export default useForm;
