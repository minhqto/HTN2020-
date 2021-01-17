import React, { createContext, useReducer } from 'react';
import AppReducer from './AppReducer'

const initialState = {
    employees: [
        { id: 1, name: 'Test', location: 'Test', designation: 'Test' }
    ],
    addPost: {
        caption: '',
        platforms: '',
    }
}

export const GlobalContext = createContext(initialState);
export const GlobalProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    function removeEmployee(id) {
        dispatch({
            type: 'REMOVE_EMPLOYEE',
            payload: id
        });
    };

    function addEmployee(employees) {
        dispatch({
            type: 'ADD_EMPLOYEES',
            payload: employees
        });
    };

    function editEmployee(employees) {
        dispatch({
            type: 'EDIT_EMPLOYEE',
            payload: employees
        });
    };

    function editCaption(caption) {
        dispatch({
            type: 'EDIT_CAPTION',
            payload: caption,
        });
    };

    return (<GlobalContext.Provider value={{
        employees: state.employees,
        addPost: state.addPost,
        removeEmployee,
        addEmployee,
        editEmployee,
        editCaption
    }}>
        {children}
    </GlobalContext.Provider>);
}