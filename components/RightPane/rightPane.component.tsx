import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

const RightPane = () => {
  // const classes = useStyles();
  const [alignment, setAlignment] = React.useState();
  const [field1, setField1] = useState();

  return (
    <div
      style={{
        margin: "0.4rem",
        flex: 1,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* <h1>Right Pane Component</h1> */}
      <h5>Files</h5>
      <a href="">See history</a>
      <input type="file" name="upload" id="file-select" />
      <hr width="100%" />
      <h5>Mark</h5>
      <TextField
        onChange={(e) => setField1(e.target.value)}
        size="small"
        value={field1}
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
      <h5>Rubric</h5>
      <a href="">review and send</a>
      <TextField
        size="small"
        id="outlined-basic"
        sx={{ m: 1, width: "25ch" }}
        variant="outlined"
        InputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          endAdornment: <InputAdornment position="end">/4</InputAdornment>,
        }}
      />{" "}
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button
          size="small"
          style={{ margin: 4, padding: "0.7rem 2rem" }}
          value="4"
        />
        <Button
          size="small"
          style={{ margin: 4, padding: "0.7rem 2rem" }}
          value="3"
        />
        <Button
          size="small"
          style={{ margin: 4, padding: "0.7rem 2rem" }}
          value="2"
        />
        <Button
          size="small"
          style={{ margin: 4, padding: "0.7rem 2rem" }}
          value="1"
        />
      </ButtonGroup>
      <hr width="100%" />
      <h5>Clarity and Clearness</h5>
      <TextField
        size="small"
        id="outlined-basic"
        sx={{ m: 1, width: "25ch" }}
        variant="outlined"
        InputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          endAdornment: <InputAdornment position="end">/4</InputAdornment>,
        }}
      />
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        <Button size="small" style={{ margin: 4, padding: "0.7rem 2rem" }} />
        <Button size="small" style={{ margin: 4, padding: "0.7rem 2rem" }} />
        <Button size="small" style={{ margin: 4, padding: "0.7rem 2rem" }} />
        <Button size="small" style={{ margin: 4, padding: "0.7rem 2rem" }} />
      </ButtonGroup>
      <hr width="100%" />
      <h5>Conclusion</h5>
      <TextField
        size="small"
        id="outlined-basic"
        sx={{ m: 1, width: "25ch" }}
        variant="outlined"
        InputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
          endAdornment: <InputAdornment position="end">/3</InputAdornment>,
        }}
      />
      <ButtonGroup
        variant="contained"
        aria-label="outlined primary button group"
      >
        {/* <Button size="small" tyle={{ margin: 2 }} /> */}
        <Button size="small" style={{ margin: 4, padding: "0.7rem 2rem" }} />
        <Button size="small" style={{ margin: 4, padding: "0.7rem 2rem" }} />
        <Button size="small" style={{ margin: 4, padding: "0.7rem 2rem" }} />
      </ButtonGroup>
      <hr width="100%" />
      <h5>Private Comments</h5>
      <TextField
        size="small"
        id="outlined-multiline-flexible"
        multiline
        rows={2}
        placeholder="Add Private Comment"

      />
      <Button variant="contained" style={{ width: 1, marginTop: "6px" }}>
        Post
      </Button>
    </div>
  );
};

export default RightPane;
