import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import Box from '@material-ui/core/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

import img from "../../public/assets/noFilesAttached.jpeg";
import { useStyles } from "./pdfStyle";

const Pdf = (props) => {
  const classes = useStyles();

  useEffect(() => {
    if (props.zFile) {
      setFile(props.zFile);
    }
  }, [props.zFile]);

  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  const [file, setFile] = useState(null);

  return (
    <Box className={classes.mainContainer}>
      {file ? (
        <Document file={file} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.from(new Array(numPages), (el, index) => (
            <Page key={`page_${index + 1}`} pageNumber={index + 1} />
          ))}
        </Document>
      ) : (
        <Box className={classes.minContainer}>
          <Avatar className={classes.img} alt="no_files_attached" src={img}  />
          
        
          <Typography variant="body3"  component="p">
          No Files attached
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Pdf;
