import React, {useState,  useEffect, useContext, createContext} from "react";
import * as d3 from "d3";
import { BtnContext } from "../routes/Search/MainContent";
import App from "../App";
import ChangeButton from "../routes/ScatterPlot/ChangeButton";

const csvUrl = "https://gist.githubusercontent.com/Roshkapel/492a369a4b89e34767d3898cd324729a/raw/6575fb93a4f17b12497ea081b67695afbb4d47ad/UN%2520Population.csv";


//create context
// export const BtnContext = createContext();

export const useData = () => {
  //tell this component to use value from context
  const btn = useContext(BtnContext);
  console.log(btn, 'this btn')
 

  const [data, setData] = useState(null); 


  useEffect(() => {
    const row = d =>{
      d.Trading = d['Trading As'];
      d.Revenue2022 = +d['Revenue 2022']; //Parsing Strings into numbers
      d.Volumes_2022 = +d['Volumes 2022'];
      d.Revenue = +d['Revenue 2023'];
      d.Volumes = +d['Volumes 2023'];
      d.Margin = +d['Margin 2023'];
      return d
     };   

    d3.csv(csvUrl, row).then(data => {
      setData(data.slice(100, btn || 105));
    });
  }, [btn]); //setting the btn value inside the dependency array to update when it changes

  return data;
};
      
// let num =5;
// let rep =100;

export const ChartButtons = ({addFunction, subFunction}) => {
  // Step 4: Use state to update btn and provide it through context
  // const [btn, setBtn] = useState(105);

  // function addFunction() {
  //   console.log('clicked')
  //   num+=5;
  //   const newData = rep + num;
  //    setBtn(newData)
  // }
    
  const add = ">>>";
  const sub = "<<<";
  const switchView = "Change View"
    
  return (
    
       <div className="chart-btn" >
        <button className="add-five-btn" type="button" onClick={addFunction}>{add}</button>
           <ChangeButton />
        <button className="sub-five-btn" type="button" onClick={subFunction}>{sub}</button>
      </div>
  
  )


}