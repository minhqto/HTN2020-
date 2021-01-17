import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  employees: [
    {
      id: 1,
      name: "Ishan Manandhar",
      location: "Kathmandu",
      designation: "Frontend Dev",
    },
  ],
  isFormFilled: false,
  isImageDialog: false,
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setImageDialog(show) {
    dispatch({
      type: "IMAGE_DIALOG_SHOW",
      payload: show,
    });
  }
  function setFormFilled(isFilled) {
    dispatch({
      type: "FORM_FILLED_TRUE",
      payload: isFilled,
    });
  }
  function removeEmployee(id) {
    dispatch({
      type: "REMOVE_EMPLOYEE",
      payload: id,
    });
  }

  function addEmployee(employees) {
    dispatch({
      type: "ADD_EMPLOYEES",
      payload: employees,
    });
  }

  function editEmployee(employees) {
    dispatch({
      type: "EDIT_EMPLOYEE",
      payload: employees,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        removeEmployee,
        addEmployee,
        editEmployee,
        setFormFilled,
        isFormFilled: state.isFormFilled,
        setImageDialog,
        isImageDialog: state.isImageDialog,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
