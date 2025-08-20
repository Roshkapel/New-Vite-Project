import React, {createContext, useContext, useState} from "react";
import * as d3 from "d3";
import { useData } from "../../SalesAnalysis/useData";
import App from "../../App";
import { ChartButtons } from "../../SalesAnalysis/useData";


export const BtnContext = createContext();

// console.log(btn)

const MainContent = ({addDataHandler}) => {
  const [btn, setBtn] = useState(105);

  let num =5;
  let rep =100;

  function addFunction() {
    console.log('clicked')
    setBtn(prevBtn => prevBtn + 5);
    if (btn === 130){
      setBtn(105)
    }
  }

  function subFunction() {
    console.log('clicked')
    setBtn(prevBtn => prevBtn - 5);
    if (btn === 105){
      setBtn(130)
    }
  }

  function switchChart() {
    
    console.log('switch');
  }
    
  
  const data = useData();
  console.log('value', num)
  return (
    <BtnContext.Provider value={btn}>
      <App
        addFunction={addFunction}
        subFunction={subFunction}
        addDataHandler={addDataHandler}
      />
    </BtnContext.Provider>
        
  );
};


export default MainContent


// export const ChartButtons = () => {
//   // Step 4: Use state to update btn and provide it through context
  
  

//   return (
//     <BtnContext.Provider value={btn}>
//       <div>
//         <button className="add-five-btn" type="button" onClick={addFunction}>add</button>
//       </div>
//     </BtnContext.Provider>
//   )


// }



























// export const DataContext = React.createContext();

// import React, {useState,  useEffect, data} from "react";
// import * as d3 from "d3";

// const csvUrl = "https://gist.githubusercontent.com/Roshkapel/624576680ebfb97f01660d9af7a99179/raw/5f954587b95c2373c9c64e8b954125ca68a06549/SalesData.csv"

// export const useData = () => {
//   const [data, setData] = useState(null); 
 
//   useEffect(() => {
//     const row = d =>{
//       d.Revenue =  +d['Revenue 2023'];  
//       return d
//      };   

//     d3.csv(csvUrl, row).then(data => {
//       setData(data.slice(100, 130));
//     });
//   }, []);

//   return data;
// };



  

// import React, {useState,  useEffect, data} from "react";
// import * as d3 from "d3";

// const csvUrl = "https://gist.githubusercontent.com/Roshkapel/624576680ebfb97f01660d9af7a99179/raw/5f954587b95c2373c9c64e8b954125ca68a06549/SalesData.csv";





// export const useData = () => {
//   const [data, setData] = useState([]); 
//   const [range, setRange] = useState(5);

//   let num = 0;
//   const rep = 100;

  

//   const changeChart = () => {
//     num += 5
//     const data = num + rep;
//     setRange(data);
    
//   }

//   const chartTen = (csvUrl) => {
//     const data = csvUrl.slice(100,130)
//     return data
//   }

//   const chartFive = (csvUrl) => {
//     const data = csvUrl.slice(100,num)
//     return data
//   }
 
//   useEffect(() => {
//     const row = d =>{
//       d.Revenue =  +d['Revenue 2023'];  
//       return d
//      };   

//     d3.csv(csvUrl, row).then(data => {
//       setData(data.slice(100,130));
//     });
//   }, []);

//   return {data, changeChart};
// };
     