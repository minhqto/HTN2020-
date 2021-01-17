export default (state, action) => {
  switch (action.type) {
    case "IMAGE_URLS":
      return {
        ...state,
        imageUrls: action.payload,
      };
    case "IMAGE_DIALOG_SHOW":
      return {
        ...state,
        isImageDialog: action.payload,
      };
    case "FORM_FILLED_TRUE":
      return {
        ...state,
        isFormFilled: action.payload,
      };
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
        },
      };
    case "EDIT_PLATFORMS":
      const updatedPlatforms = action.payload;

      state.addPost.platforms = updatedPlatforms;

      return {
        ...state,
        addPost: {
          caption: state.addPost.caption,
          platforms: updatedPlatforms,
        },
      };

    default:
      return state;
  }
};
