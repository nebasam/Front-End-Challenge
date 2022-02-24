import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useRef } from "react";
import { useDispatch } from "react-redux";

const Text = (props: any) => {
  const valueRef = useRef("");
  const dispatch = useDispatch();

  return (
    <TextField
      name={props.name}
      size="small"
      id="outlined-basic"
      sx={{ m: 1, width: "25ch" }}
      variant="outlined"
      value={props.value}
      inputRef={valueRef}
      onChange={() =>
        dispatch({ type: props.name, payload: valueRef.current.value })
      }
      InputProps={{
        inputMode: "numeric",
        pattern: "[0-9]*",
        "aria-label": "weight",
        endAdornment: <InputAdornment position="end">{props.sign}</InputAdornment>,
      }}
    />
  );
};

export default Text;
