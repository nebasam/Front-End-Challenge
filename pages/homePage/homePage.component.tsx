import React from "react";
import Display from "../../components/Display/pdf.component";
import RightPane from "../../components/RightPane/rightPane.component";
import { useStyles } from "./homePageStyle";

function Home() {
  const classes = useStyles();

  const [file, setFile] = React.useState();

  const setFileData = (data) => {
    setFile(data); // LOGS DATA FROM CHILD 
  };

  return (
    <div className={classes.mainContainer}>
      <Display zFile={file} />
      <RightPane func={setFileData} />
    </div>
  );
}

export default Home;
