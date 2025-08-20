import React, {useState,  useEffect} from "react";
import * as d3 from "d3";

//WE HAVE SUCCESSFULLY REFACTORED THE useEffect module into a separate module

// const csvUrl = "https://gist.githubusercontent.com/Roshkapel/492a369a4b89e34767d3898cd324729a/raw//UN%2520Population.csv"
// const csvUrl= "https://gist.githubusercontent.com/curran/a08a1080b88344b0c8a7/raw/0e7a9b0a5d22642a06d3d5b9bcbad9890c8ee534/iris.csv";

const csvUrl = "https://gist.githubusercontent.com/Roshkapel/624576680ebfb97f01660d9af7a99179/raw/5f954587b95c2373c9c64e8b954125ca68a06549/SalesData.csv";


export const useData = () => {
  const [data, setData] = useState(null); 
 
  useEffect(() => {
    const row = d =>{ 
      d.Revenue2022 = d['Revenue 2022']; //Parsing Strings into numbers
      d.Volumes_2022 = +d['Volumes 2022'];
      d.Revenue = +['Revenue 2023'];
      d.Volumes_2023 = +['Volumes 2023'];
      d.Margin = +d['Margin 2023'];
      return d;
     };   

    d3.csv(csvUrl, row).then(setData);
  }, []);

  return data;
};
