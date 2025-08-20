import React, {useState, useCallback, useEffect} from "react";
import axios from "axios";
import Papa from "papaparse"

export const UserTableData = () => {

  const[data, setData] = useState([]);
  const[columnArray, setColumn] = useState([]);
  const[values, setValues] = useState([]);
  const [input, setInput] = useState("");

  const [jsonData, setJsonData] = useState(null);
  const acceptInput = ".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel";

  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc:0});
  const [msg, setMsg] = useState(null)

  
  function handleUpload(){
    if(!file){
      setMsg('no file selected');
      return;
    }

    const fd = new FormData();
    fd.append('file', file);
  
    setMsg("Uploading...");
    setProgress(prevState => {
      return {...prevState, started: true}
    })
    axios.post('http://httpbin.org/post', fd, {
      onUploadProgress: (progressEvent) => { setProgress(prevState => {
        return {...prevState, pc: progressEvent.progress * 100}
      }) },
      headers: {
        "Custom-Header": "value",
      }
    })
    .then(res => {
      setMsg('Uploaded successfully')
      console.log(res.data);
    })
    .catch(err => {
      setMsg("Upload failed")
      console.log(err);
    });

  }
  
  const handleFile = (event) => {
    const csvFile = event.target.files[0];
 
      // eslint-disable-next-line no-undef
      Papa.parse(csvFile, {
      header: true,
      skipEmptyLines: true,
      // dynamicTyping: true,
      complete: function(result){
        const columnArray = [];                 
        const valuesArray = [];

        result.data.map((d) => {
          columnArray.push(Object.keys(d));
          valuesArray.push(Object.values(d));
          setFile({header: d.keys , value: d.values});
          
        });

        setData(result.data);
        setColumn(columnArray[0]);
        setValues(valuesArray);
        
      }   
  
  })


}

  return (
          
      <>
        
        <div className="user-profile-table">
        <div className = "csvInput">
          <input 
            type="file"
            name='file'
            accept = {acceptInput}
            onChange={handleFile}>
            </input>
            <div className="upload"><button onClick={handleUpload}>Upload</button></div>
        </div>
        <div className="loading">
            { progress.started && <progress max="100" value={progress.pc}></progress>}
            { msg && <span>{msg}</span>}
            </div>
          <table style={{borderCollapse: "collapse", border: "1px solid black", margin: "5px auto"}}>
            <thead>
              <tr>
                {columnArray.map((col, i)=> (
                  <th key={i}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {values.map((v, i) => (
                <tr key={i}>
                  {v.map((value, i) => (
                    <td key={i}>{value}</td>
                  ))}
                    <td></td>
                </tr>
              ))}
            </tbody>
          </table>
          
        </div>
      </>
  )
}

