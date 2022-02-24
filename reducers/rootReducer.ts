const initialState = {
  field1: "",
  field2: "",
  field3: "",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "send":
      // alert("Send Br");
      console.log(action.payload);
      return {
        ...state,
        field1: action.payload,
      };
    case "clarity":
      return {
        ...state,
        field2: action.payload,
      };
    case "conclusion":
      return {
        ...state,
        field3: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
