import React from "react";


import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector } from "react-redux";
//JSON file to be written into
import data from "../../data/data.json";
import { useStyles } from "./rightPane";
import Text from "./TextField";
import { Toogle } from "./ToogleButtonGroup";
import Divider from '@mui/material/Divider';
import Box from '@material-ui/core/Box';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const RightPane = (props) => {
  const field1 = useSelector((state) => state.field1);
  const field2 = useSelector((state) => state.field2);
  const field3 = useSelector((state) => state.field3);

  const classes = useStyles();

  const handleSubmit = (e) => {
    const newData = {
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
      <Typography variant="body3"  component="h5">
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
       
        <Divider sx={{ marginY: "15px"}} />
        
        <Typography variant="body3"  component="h5">
          Mark
        </Typography>
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
        <Divider sx={{ marginY: "15px"}} />
       
        <Typography variant="body3"  component="h5">
        Rubric
        </Typography>
        
        <Link href="" className={classes.link} >
          Review and send
        </Link>
        
        <Text name="send" value={field1} sign="/4" />
        <Toogle name="send" value={field1} numberOfChildren={4}/>
    
        
        <Divider sx={{ marginY: "15px"}}  />
        
        <Link href="" className={classes.link}>
         Clarity and Clearness
        </Link>
        
        <Text name="clarity" value={field2} sign="/4" />
        <Toogle name="clarity" value={field2} numberOfChildren={4} />
        
        
        
        <Divider sx={{ marginY: "15px"}}/>
    
        <Link href="" className={classes.link}>
         Conclusion
        </Link>
        <Text name="conclusion" value={field3} sign="/3" />
        <Toogle name="conclusion" value={field3} numberOfChildren={3} />
       
        
        <Divider sx={{ marginY: "15px"}}/>
        
        <Link  href="" className={classes.link} >
         Private Comments
        </Link>
  
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
    </Box>
  );
};
export default RightPane;
