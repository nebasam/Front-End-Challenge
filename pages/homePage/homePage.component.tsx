import React from "react";
import Display from "../../components/Display/pdf.component";
import RightPane from "../../components/RightPane/rightPane.component";

function Home() {
  const [file, setFile] = React.useState();
  const setFileData = (data) => {
    console.log("Wow Came here!");
    console.log("The data: ", data);
    setFile(data); // LOGS DATA FROM CHILD (My name is Dean Winchester... &)
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        // justifyContent: "space-between",
      }}
    >
      {/* <h1>Home Page!</h1> */}
      <Display zFile={file} />
      <RightPane func={setFileData} />
    </div>
  );
}

export default Home;
