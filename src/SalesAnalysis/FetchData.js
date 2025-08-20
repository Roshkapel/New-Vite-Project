import React, {useState, useCallback, useEffect, useRef} from "react";
import axios from "axios";
import {CSVReader} from "react-papaparse";
import {Box, Button, Heading, Stack} from "@chakra-ui/react"

export const FetchData = () => {
  const buttonRef = useRef(null);

  const handleFileRemove = (data) => {
    console.log(data)
  }
  const handleFileLoad = (data) => {
    console.log(data);
  };

  const onErrorHandler = (err, file, inputElem, reason) => {
    console.log(err);
  };

  const handleOpenCSVReader = (e) => {
    if(buttonRef.current) {
      buttonRef.current.open();

      }
    };

    const handleRemoveFile = (e) => {
      if(buttonRef.current){
        buttonRef.current.removeFile(e);
      }
    }
  

  return (
    <>
      <Heading 
      color="navy" 
      textAlign="center" 
      />
        <CSVReader 
          ref={buttonRef}
          onFileLoad={handleFileLoad}
          onError={onErrorHandler}
          onClick
          noDrag
          onRemoveFile={handleFileRemove}
          >
            {({file}) => ( 
            <Stack margin="10">
              <Box>
                <Button onClick={handleOpenCSVReader}>Upload</Button>
              </Box>
              {file && (
                <>
                  <Box width="20%" border="2px solid #ccc">
                    {file.name}
                  </Box>

                <Box>       
                  <Button onClick={handleRemoveFile}
                    size="xs" 
                    variant="ghost">Remove
                  </Button>
                </Box>
       
                </>
              )}
              

            </Stack>
            )}
          </CSVReader>


    </>

  )
}