import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";

const initialState = {
  employees: [{ id: 1, name: "Test", location: "Test", designation: "Test" }],
  addPost: {
    caption: "",
    platforms: {
      twitter: false,
      instagram: false,
      facebook: false,
    },
  },
  isFormFilled: false,
  isAddDialog: false,
  imageUrls: [],
};

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  function setImageUrls(urls) {
    dispatch({
      type: "IMAGE_URLS",
      payload: urls,
    });
  }
  function setIsAddDialog(show) {
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

  function editCaption(caption) {
    dispatch({
      type: "EDIT_CAPTION",
      payload: caption,
    });
  }

  function editPlatforms(platforms) {
    dispatch({
      type: "EDIT_PLATFORMS",
      payload: platforms,
    });
  }

  return (
    <GlobalContext.Provider
      value={{
        employees: state.employees,
        addPost: state.addPost,
        removeEmployee,
        addEmployee,
        editEmployee,
        editCaption,
        editPlatforms,
        setFormFilled,
        isFormFilled: state.isFormFilled,
        setIsAddDialog,
        isAddDialog: state.isAddDialog,
        imageUrls: state.imageUrls,
        setImageUrls,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
