// import "@react-pdf-viewer/core/lib/styles/index.css";
import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import img from "../../public/assets/noFilesAttached.jpeg";

const Pdf = (props) => {
  useEffect(() => {
    if (props.zFile) {
      alert("effected");
      setFile(props.zFile);
    }
  }, [props.zFile]);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  // function changePage(offset) {
  //   setPageNumber((prevPageNumber) => prevPageNumber + offset);
  // }

  // function changePageBack() {
  //   changePage(-1);
  // }

  // function changePageNext() {
  //   changePage(+1);
  // }

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
      {file ? (
        <>
          {/* <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.12.313/build/pdf.worker.min.js">
            <Viewer fileUrl={file} plugins={[defaultLayoutPluginInstance]} />
          </Worker> */}
          {/* <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            <Page height="600" pageNumber={pageNumber} />
          </Document>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          {pageNumber > 1 && <button onClick={changePageBack} >Previous Page</button>}
          {pageNumber < numPages  && <button onClick={changePageNext} >Next Page</button>} */}
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </>
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
