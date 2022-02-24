import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React from "react";
import { useDispatch } from "react-redux";
import { useStyles } from "./rightPane";

export const Toogle = (props: any) => {
  const dispatch = useDispatch();

  const classes = useStyles();

  return (
    <ToggleButtonGroup
      name={props.name}
      color="primary"
      value={props.value}
      exclusive
      onChange={(event, val) => dispatch({ type: props.name, payload: val })}
    >
      <ToggleButton
        classes={{
          selected: classes.toggleButton,
        }}
        value="4"
        size="small"
        className={classes.toggle}
      ></ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.toggleButton,
        }}
        value="3"
        size="small"
        className={classes.toggle}
      ></ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.toggleButton,
        }}
        value="2"
        size="small"
        className={classes.toggle}
      ></ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.toggleButton,
        }}
        value="1"
        size="small"
        className={classes.toggle}
      ></ToggleButton>
    </ToggleButtonGroup>
  );
};
export const Toogle1 = (props: any) => {
  const dispatch = useDispatch();

  const classes = useStyles();
  return (
    <ToggleButtonGroup
      name={props.name}
      color="primary"
      value={props.value}
      exclusive
      onChange={(event, val) => dispatch({ type: props.name, payload: val })}
    >
      <ToggleButton
        classes={{
          selected: classes.toggleButton,
        }}
        value="3"
        size="small"
        className={classes.toggle}
      ></ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.toggleButton,
        }}
        value="2"
        size="small"
        className={classes.toggle}
      ></ToggleButton>
      <ToggleButton
        classes={{
          selected: classes.toggleButton,
        }}
        value="1"
        size="small"
        className={classes.toggle}
      ></ToggleButton>
    </ToggleButtonGroup>
  );
};
