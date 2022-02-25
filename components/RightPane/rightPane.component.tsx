import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import { useSelector } from "react-redux";
//JSON file to be written into
import data from "../../data/data.json";
import { useStyles } from "./rightPane";
import Text from "./TextField";
import { Toogle, Toogle1 } from "./ToogleButtonGroup";

const RightPane = (props) => {
  const field1 = useSelector((state) => state.field1);
  const field2 = useSelector((state) => state.field2);
  const field3 = useSelector((state) => state.field3);

  const classes = useStyles();

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
          props.func(e.target?.result);
        };
      }
    }
  };

  return (
    <div className={classes.mainCont}>
      <form onSubmit={handleSubmit}>
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
        <hr width="100%" />
        <h5 className={classes.h5}>Mark</h5>
        <Text
          value={
            (((parseInt(field1) || 0) +
              (parseInt(field2) || 0) +
              (parseInt(field3) || 0)) *
              100) /
            11
          }
          sign="/100"
        />
        <hr width="100%" />
        <h5 className={classes.h5}>Rubric</h5>
        <a href="" className={classes.link}>
          Review and send{" "}
        </a>
        <Text name="send" value={field1} sign="/4" />
        <Toogle name="send" value={field1} numberOfChildren={4}/>
        <hr width="100%" />
        <a className={classes.link}>Clarity and Clearness</a>
        <Text name="clarity" value={field2} sign="/4" />
        <Toogle name="clarity" value={field2} numberOfChildren={4} />
        <hr width="100%" />
        <a className={classes.link}>Conclusion</a>
        <Text name="conclusion" value={field3} sign="/3" />
        <Toogle name="conclusion" value={field3} numberOfChildren={3} />
        <hr width="100%" />
        <a className={classes.link}>Private Comments</a>
        <TextField
          name="comment"
          size="small"
          multiline
          rows={2}
          placeholder="Add Private Comment"
        />
        <Button variant="contained" className={classes.submit} type="submit">
          Post
        </Button>
      </form>
    </div>
  );
};
export default RightPane;
