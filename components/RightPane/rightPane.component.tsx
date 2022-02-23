import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import React, { useState } from "react";
//JSON file to be written into
import data from "../../data/data.json";
import { useStyles } from "./rightPane";

const Input = styled("input")({
  display: "none",
});

const RightPane = (props) => {
  const classes = useStyles();

  // const classes = useStyles();
  const [field1, setField1] = React.useState("");
  const [field2, setField2] = React.useState("");
  const [field3, setField3] = React.useState("");
  const [file, setFile] = React.useState(null);

  let [loading, setLoading] = useState(false); //un-used load spinner

  const handleChange = (event, newAlignment) => {
    setField1(newAlignment);
  };
  const handleChange2 = (event, newAlignment) => {
    setField2(newAlignment);
  };
  const handleChange3 = (event, newAlignment) => {
    setField3(newAlignment);
  };

  const handleField1 = (e) => {
    console.log(e)
    setField1(e.target.value);
  };
  const handleField2 = (e) => {
    console.log(e)
    setField2(e.target.value);
  };
  const handleField3 = (e) => {
    console.log(e)
    setField3(e.target.value);
  };

  const handleSubmit = (e) => {
    let newData = {
      filePath: e.target.upload.value,
      mark: e.target.mark.value,
      review: e.target.review.value,
      clarity: e.target.clarity.value,
      conclusion: e.target.conclusion.value,
      comment: e.target.comment.value,
    };
    e.preventDefault();
    data.push({ newData });
    alert("Data Added Succesfully!");
    window.location.reload(false);
  };

  const fileType = ["application/pdf"];
  const handleFileChange = (e: any) => {
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setFile(e.target?.result);
          props.func(e.target?.result);
        };
      } else {
        setFile(null);
      }
    } else {
      console.log("select your file");
    }
  };

  return (
    <div
      style={{
        margin: "0.4rem",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <form onSubmit={handleSubmit}>
        {/* <h1>Right Pane Component</h1> */}
        <h5 className={classes.h5}>Files</h5>
        <a href="" className={classes.link}>
          See history
        </a>
        <input
          type="file"
          name="upload"
          id="file-select"
          onChange={handleFileChange}
        />
        {/* <label htmlFor="contained-button-file">
        <p className={classes.p}>No files attached</p>
        <Input accept="*" id="contained-button-file" multiple type="file" />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label> */}
        <hr width="100%" />
        <h5 className={classes.h5}>Mark</h5>
        <TextField
          name="mark"
          size="small"
          id="outlined-basic"
          sx={{ m: 1, width: "18ch", height: "5ch" }}
          variant="outlined"
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            endAdornment: <InputAdornment position="end">/100</InputAdornment>,
          }}
        />
        <hr width="100%" />
        <h5 className={classes.h5}>Rubric</h5>
        <a href="" className={classes.link}>
          Review and send
        </a>
        <TextField
          name="review"
          size="small"
          id="outlined-basic"
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          value={field1}
          onChange={handleField1}
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            "aria-label": "weight",
            endAdornment: <InputAdornment position="end">/4</InputAdornment>,
          }}
        />{" "}
        <ToggleButtonGroup
          color="primary"
          value={field1}
          exclusive
          onChange={handleChange}
        >
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="4"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="3"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="2"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="1"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
        </ToggleButtonGroup>
        <hr width="100%" />
        <a className={classes.link}>Clarity and Clearness</a>
        <TextField
          name="clarity"
          size="small"
          id="outlined-basic"
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          value={field2}
          onChange={handleField2}
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            
            endAdornment: <InputAdornment position="end">/4</InputAdornment>,
          }}
        />
        <ToggleButtonGroup
          color="primary"
          value={field2}
          exclusive
          onChange={handleChange2}
        >
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="4"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="3"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="2"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="1"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
        </ToggleButtonGroup>
        <hr width="100%" />
        <a className={classes.link}>Conclusion</a>
        <TextField
          name="conclusion"
          size="small"
          id="outlined-basic"
          sx={{ m: 1, width: "25ch" }}
          variant="outlined"
          value={field3}
          onChange={handleField3}
          InputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            "aria-label": "weight",
            endAdornment: <InputAdornment position="end">/3</InputAdornment>,
          }}
        />
        <ToggleButtonGroup
          color="primary"
          value={field3}
          exclusive
          onChange={handleChange3}
        >
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="3"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="2"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
          <ToggleButton
            classes={{
              selected: classes.toggleButton,
            }}
            value="1"
            size="small"
            style={{ margin: 4, padding: "0.7rem 2rem" }}
          ></ToggleButton>
        </ToggleButtonGroup>
        <hr width="100%" />
        <a className={classes.link}>Private Comments</a>
        <TextField
          name="comment"
          size="small"
          id="outlined-multiline-flexible"
          // label="Multiline"
          multiline
          rows={2}
          placeholder="Add Private Comment"
          // value={value}
          // onChange={handleChange}
        />
        <Button
          variant="contained"
          style={{ width: 1, marginTop: "6px" }}
          type="submit"
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default RightPane;
