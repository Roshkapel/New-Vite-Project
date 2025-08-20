import React, {useState, useCallback, useEffect, useContext} from "react";
import * as d3 from "d3";
import { useData } from "./SalesAnalysis/useData.jsx";
import { AxisBottom } from "../src/routes/Marks/AxisBottom.jsx";
import Select from 'react-select';
import { YAxis } from "./routes/Marks/Y-Axis.jsx";
import { Marks } from "./routes/Marks/index.jsx";
import { CsvData } from "./SalesAnalysis/CsvData.jsx";
import { v4 as uuidv4 } from 'uuid';
import { ChartButtons } from "./SalesAnalysis/useData.jsx";
import NavBar from "./routes/NavBar.jsx";
import api from "./api/users.js";
import CustomProgressBar from "./routes/Search/ProgressBar.jsx";


// import { SalesData } from "../SalesAnalysis/SalesData.js";
// console.log(d3);

const width = 960;
const height = 500;
const margin = {top: 10, right: 0, bottom: 60, left: 350};
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left -  margin.right;

const xAxisLabelOffset = 30; //SET A NEW VARIABLE TO MANIPULATE X-AXIS
const yAxisLabelOffset = 320;


const fadeOpacity = 0.2;

//WE ARE GOING TO CREATE A FUNCTION SO WE CAN ACCESS THESE ATTRIBUTES PROGRAMMATICALLY
const attributes = [
  {value: 'Trading As', label:'Trading As'},
  {value: 'Volumes 2022', label:'Volumes 2022'},
  {value: 'Revenue 2023', label:'Revenue 2023'},
  {value: 'Volumes 2023', label:'Volumes 2023'},
  {value: 'Revenue 2022', label:'Revenue 2022'}
]

const xAttributes = [
  {value: 'Revenue 2023', label:'Revenue 2023'},
  {value: 'Revenue 2022', label:'Revenue 2022'}
]

const yAttributes = [
  {value: 'Trading As', label:'Trading As'},
]


////THIS FUNCTION WILL TAKE AS INPUT A VALUE AND RETURN A LABEL
const getLabel = value => {
  for(let i = 0; i < attributes.length; i++) {
   if(attributes[i].value === value){
    return attributes[i].label;
   }
  }
};



const App = ({addDataHandler, users, removeDataHandler, addFunction, subFunction}) => { ;

  //  //using LOCAL_STORAGE_KEY as key
  //  const LOCAL_STORAGE_KEY = "users";

  // // const userData = SalesData();
  // const [users, setUsers] = useState([]);

  // //Retrieve Contacts
  // const retrieveUsers = async () => {
  //   const response = await api.get("/users");
  //   return response.data
  // }

  // const addDataHandler = async (user) => {
  //   console.log('this is user' ,user)
  //   const request = {
  //     id: uuidv4(),
  //     ...users
  //   }

  //   const response = await api.post("/users", request);
  //   console.log(response)
  //   setUsers([...users, response.data]);
  //   // setUsers([...users, {id: uuidv4(), ...user}]);
  //   // setUsers(prevUsers => [...prevUsers, { id: uuidv4(), ...user }]);
  // };

  // const removeDataHandler = (id) => {
  //   const newDataList = users.filter((user) => {
  //     return users.id !== id;
  //   });

  //   setUsers(newDataList);
    
  // };

  //   //using useEfffect to catch the data entered and store it in the local storage
  //   //useEffect essentially helps you your component to respond to changes whether a useState change
  //   //a fetch from the server, or user interacting with the page
  //   //we have set up useEffects for both storing and retrieving

  // useEffect(() => {
  //   // const retrieveSalesData = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   // if(retrieveSalesData) setUsers(retrieveSalesData);
  //   const getAllUsers = async () => {
  //     const allUsers = await retrieveUsers();
  //     if (allUsers) setUsers(allUsers);
  //   };

  //   getAllUsers();
  // }, []);
  
  // //one of the dependencies [getItem] must remain empty else we will have an infimite loop
  // useEffect(() => {
  //   // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(users))
  // }, [users]);
  
  const data = useData();  
  const [results, setResults] = useState([]);

  const [loading, setLoading] = useState(true);

  
  const [hoveredValue, setHoveredValue] = useState(null);
  //Logic for X (MENU)
  const initialXAttribute = 'Revenue 2023';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

    //Logic for Y (MENU)
  const initialYAttribute = 'Trading As';
  const [yAttribute, setYAttribute] = useState(initialYAttribute);
  const yValue = d => d[yAttribute];
  const yAxisLabel = getLabel(yAttribute);  
 
  if(!data) {
    // return <pre>Loading...</pre> 

    return  (<CustomProgressBar />)
  }
  

  const yScale = d3.scaleBand()
  .domain(data.map(d => d['Trading As']))   
  .range([0, innerHeight]);
  
     
  const xScale = d3.scaleLinear()
    .domain([0, d3.max(data, xValue)])
    .range([0, innerWidth]);

  return (

<>  
    
    <div className="App">
    <div className="navBar">
      <NavBar 
        users={users}
        setResults={setResults}
        addDataHandler={addDataHandler}
        removeDataHandler={removeDataHandler}
        addFunction={addFunction}
        subFunction={subFunction}
      />
    </div>
    <CsvData />
    <div className="newDropdown">          
      <div className="X-Axis">
        <span className="dropdown-label">X-Axis</span>
            <Select
              options={xAttributes} 
              value ={xAttributes.find(option => option.value === xAttribute)} 
              onChange = {(selectedOption) => setXAttribute(selectedOption.value)} 
          
            />
      </div>

        <div className="Y-Axis">
          <span className="dropdown-label">Y-Axis</span>
            <Select
              options={yAttributes} 
              value ={yAttributes.find(option => option.value === yAttribute)} 
              onChange = {(selectedOption) => setYAttribute(selectedOption.value)}
            />
        </div>
  </div>
      {/* <ChartButtons 
      addFunction={addFunction}
         /> */}
      <div className="four">
        <div className="move">
        <svg width={width} height={height}>

            <g transform={`translate(${margin.left}, ${margin.top})`}>
            <AxisBottom xScale={xScale} innerHeight={innerHeight} />
           
                <text className = "axis-Label"
                  textAnchor="middle"
                  transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2 }) rotate(-90)`}
                  > 
                  {yAxisLabel}
                </text> 
           
              
                <YAxis yScale={yScale}/>

                <text className = "axis-Label" 
                  x={innerWidth / 2}
                  y={innerHeight + xAxisLabelOffset + 20} 
                  textAnchor="middle"> 
                {xAxisLabel}
                </text> 
                <g opacity={hoveredValue? fadeOpacity : 1}>
                <Marks 
                  xValue={xValue}
                  xScale={xScale} 
                  yScale={yScale} 
                  yValue={yValue}
                  data={data} />  
              </g>
            </g>
          </svg>
      </div>
      </div>
    </div>
    {/* <Route path="*" element={<NoMatch/>} /> */}
  
  </>
   );
};

export default App;   
