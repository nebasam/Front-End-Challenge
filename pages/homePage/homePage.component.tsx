import React from "react";
import Display from "../../components/Display/pdf.component";
import RightPane from "../../components/RightPane/rightPane.component";

function Home() {
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
      <Display style={{}} />
      <RightPane style={{}} />
    </div>
  );
}

export default Home;
