import "@react-pdf-viewer/core/lib/styles/index.css";
import React, { useEffect, useState } from "react";
import img from "../../public/assets/noFilesAttached.jpeg";

const Pdf = (props) => {
  useEffect(() => {
    if (props.zFile) {
      alert("effected");
      setFile(props.zFile);
    }
  }, [props.zFile]);

  const [file, setFile] = useState(null);

  return (
    <div
      style={{
        margin: "1rem",
        flex: 4,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* <h1>Hello PDF PAge</h1> */}
      {file ? (
        // "<h1>WOW FILE.</h1>"
        // console.log("Here also?")
        <h1>The file displayed</h1>
      ) : (
        <div
          style={{
            // backgroundColor: "grey",
            // borderRadius: "50%",
            padding: "0.5rem",
            margin: "1rem",

            // flex: 1,
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <img
            // flex="1"
            src={img}
            alt="no_files_attached"
            width="50%"
            height="50%"
            style={{ alignItem: "center", justifyContent: "center" }}
          />
          <p>No Files attached</p>
        </div>
      )}
      {/* <div
        style={{
          // backgroundColor: "grey",
          // borderRadius: "50%",
          padding: "0.5rem",
          margin: "1rem",

          // flex: 1,
          // alignItems: "center",
          // justifyContent: "center",
        }}
      >
        
        <img
          // flex="1"
          src={img}
          alt="no_files_attached"
          width="50%"
          height="50%"
          style={{ alignItem: "center", justifyContent: "center" }}
        />
        <p>No Files attached</p>
      </div> */}
    </div>
  );
};

export default Pdf;
