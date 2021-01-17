export default (state, action) => {
  switch (action.type) {
    case "REMOVE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter(
          (employee) => employee.id !== action.payload
        ),
      };
    case "ADD_EMPLOYEES":
      return {
        ...state,
        employees: [...state.employees, action.payload],
      };
    case "EDIT_EMPLOYEE":
      const updatedEmployee = action.payload;

      const updatedEmployees = state.employees.map((employee) => {
        if (employee.id === updatedEmployee.id) {
          return updatedEmployee;
        }
        return employee;
      });

      return {
        ...state,
        employees: updatedEmployees,
      };
    case "EDIT_CAPTION":
      const updatedCaption = action.payload;

      state.addPost.caption = updatedCaption;

      return {
        ...state,
        addPost: {
          caption: updatedCaption,
          platforms: state.addPost.platforms,
        }
      };
    default:
      return state;
  }
};
