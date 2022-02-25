import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import { useDispatch } from "react-redux";
import { useStyles } from "./rightPane";

export const Toogle = (props: any) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  let numberOfButton = Array.from(Array(props.numberOfChildren).keys())
  const children = [ numberOfButton.map(num => <ToggleButton
    classes={{
      selected: classes.toggleButton,
    }}
    value={`${props.numberOfChildren-num}`}
    size="small"
    className={classes.toggle}
  ></ToggleButton> )
    
  ];
  return (
    <ToggleButtonGroup
      name={props.name}
      color="primary"
      value={props.value}
      exclusive
      onChange={(event, val) => dispatch({ type: props.name, payload: val })}
    >
      {children}
      </ToggleButtonGroup>
  );
};
