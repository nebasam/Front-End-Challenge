const initialState = {
  field1: "",
  field2: "",
  field3: "",
  mark: 0,
  comment: ''
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case "send":
      // alert("Send Br");
      console.log(action.payload);
      return {
        ...state,
        field1: action.payload,
        mark: (((parseInt(action.payload) || 0) +
        (parseInt(state.field2) || 0) +
        (parseInt(state.field3) || 0)) *
        100) /
      11
      };
    case "clarity":
      return {
        ...state,
        field2: action.payload,
        mark: (((parseInt(state.field1) || 0) +
        (parseInt(action.payload) || 0) +
        (parseInt(state.field3) || 0)) *
        100) /
      11
      };
    case "conclusion":
      return {
        ...state,
        field3: action.payload,
        mark: (((parseInt(state.field1) || 0) +
        (parseInt(state.field2) || 0) +
        (parseInt(action.payload) || 0)) *
        100) /
      11
      };
    case "COMMENT":
      return {
        ...state,
        comment: action.payload
      }
    default:
      return state;
  }
}

export default rootReducer;
