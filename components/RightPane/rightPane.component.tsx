import Box from "@material-ui/core/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

//JSON file to be written into
import data from "../../data/data.json";
import { useStyles } from "./rightPane";
import Text from "./TextField";
import { Toogle } from "./ToogleButtonGroup";


interface RigtPanelProp {
  func: Function;
}

const RightPane = (props: RigtPanelProp) => {
  const dispatch = useDispatch();

  const field1 = useSelector((state) => state.field1);
  const field2 = useSelector((state) => state.field2);
  const field3 = useSelector((state) => state.field3);
  const mark = useSelector((state) => state.mark);
  const comment = useSelector((state) => state.comment);

  const classes = useStyles();

  const handleSubmit = (e: React.changeEvent) => {
    const newData = {
      mark,
      review: field1,
      clarity: field2,
      conclusion: field3,
      comment,
    };
    e.preventDefault();
    data.push({ newData });
    alert("Data Added Succesfully!");
    // console.log(data);
    window.location.reload(false);
  };

  const fileType = ["application/pdf"];
  const handleFileChange = (e: any) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileType.includes(selectedFile.type)) {
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          props.func(e.target?.result);
        };
      }
    }
  };

  return (
    <Box className={classes.mainCont}>
      <form onSubmit={handleSubmit}>
        <Typography variant="body3" component="h5">
          Files
        </Typography>

        <Link href="" className={classes.link}>
          See History
        </Link>
        <TextField
          size="small"
          type="file"
          name="upload"
          id="file-select"
          onChange={handleFileChange}
        />

        <Divider sx={{ marginY: "15px" }} />

        <Typography variant="body3" component="h5">
          Mark
        </Typography>
        <Text disabled={true} value={mark} sign="/100" />
        <Divider sx={{ marginY: "15px" }} />

        <Typography variant="body3" component="h5">
          Rubric
        </Typography>

        <Link href="" className={classes.link}>
          Review and send
        </Link>

        <Text name="send" value={field1} sign="/4" />
        <Toogle name="send" value={field1} numberOfChildren={4} />

        <Divider sx={{ marginY: "15px" }} />

        <Link href="" className={classes.link}>
          Clarity and Clearness
        </Link>

        <Text name="clarity" value={field2} sign="/4" />
        <Toogle name="clarity" value={field2} numberOfChildren={4} />

        <Divider sx={{ marginY: "15px" }} />

        <Link href="" className={classes.link}>
          Conclusion
        </Link>
        <Text name="conclusion" value={field3} sign="/3" />
        <Toogle name="conclusion" value={field3} numberOfChildren={3} />

        <Divider sx={{ marginY: "15px" }} />

        <Link href="" className={classes.link}>
          Private Comments
        </Link>

        <TextField
          name="comment"
          size="small"
          multiline
          rows={2}
          placeholder="Add Private Comment"
          onChange={(e: React.changeEvent) => dispatch({ type: 'COMMENT', payload: e.target.value })}
        />

        <Button variant="contained" className={classes.submit} type="submit">
          Post
        </Button>
      </form>
    </Box>
  );
};
export default RightPane;
