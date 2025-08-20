import React, {useState, useCallback, useEffect} from "react";
import * as d3 from "d3";
import Select from 'react-select';
import { useData } from './useData'
import { AxisBottom } from './XAxis';
import { YAxis } from './YAxis';
import { Marks } from './Marks';
import { ColorLegend } from "./ColorLegend";
import { CsvData } from "../../SalesAnalysis/CsvData";
import NavBar from "../NavBar";
import CustomProgressBar from "../Search/ProgressBar";
import api from '../../api/users';
// import {Message} from "../Components/Message";

const width = 960;
const height = 500;
const margin = {top: 10, right: 0, bottom: 60, left: 250};
// const innerHeight = height - margin.top - margin.bottom;
// const innerWidth = width - margin.left -  margin.right;

const xAxisLabelOffset = 30; //SET A NEW VARIABLE TO MANIPULATE X-AXIS
const yAxisLabelOffset = 100;


const fadeOpacity = 0.2;

//WE ARE GOING TO CREATE A FUNCTION SO WE CAN ACCESS THESE ATTRIBUTES PROGRAMMATICALLY
const attributes = [
  {value: 'Revenue 2022', label:'Revenue 2022'},
  {value: 'Volume 2022', label:'Volumes 2022'},
  {value: 'Revenue 2023', label:'Revenue 2023'},
  {value: 'Volumes 2023', label:'Volumes 2023'},
  {value: 'Margin 2023', label:'Margin 2023'}
]
////THIS FUNCTION WILL TAKE AS INPUT A VALUE AND RETURN A LABEL
const getLabel = value => {
  for(let i = 0; i < attributes.length; i++) {
   if(attributes[i].value === value){
    return attributes[i].label;
   }
  }
};


//NB IN A SCATTER PLOT X AND Y ARE BOTH LINEAR SCALES -- WE MUST DECIDE WHAT X AND Y ARE GOING TO BE


//THE VARIABLE BELOW HOLDS A FUNCTION THAT FORMATS TICKVALUES, BECAUSE WE DONT ALL TICKVALUES TO BE AFFECTED WE ARE GOING TO
//SPLIT OUT THE FORMATTING TO AFFECT THE SI UNITS AS INTENDED - SEE BELOW



const ScatterPlot = ({addDataHandler, users, removeDataHandler}) => { 
  const data = useData();
  const [hoveredValue, setHoveredValue] = useState(null);
  
  //Logic for X (MENU)
  const initialXAttribute = 'Volumes 2023';
  const [xAttribute, setXAttribute] = useState(initialXAttribute);
  const xValue = d => d[xAttribute];
  const xAxisLabel = getLabel(xAttribute);

    //Logic for Y (MENU)
    const initialYAttribute = 'Revenue 2023';
    const [yAttribute, setYAttribute] = useState(initialYAttribute);
    const yValue = d => d[yAttribute];
    const yAxisLabel = getLabel(yAttribute);
  
    if(!data) {
      // return <pre>Loading...</pre> 
  
      return  (<CustomProgressBar />)
    }


  // console.log(data.columns); //ALWAYS USE YOUR CONSOLE LOG TO SEE WHAT KIND OF DATA YOU HAVE TO USE AS ATTRIBUTES FOR YOUR OPTIONS

  const innerHeight = height - margin.top - margin.bottom;
  const innerWidth = width - margin.left -  margin.right;
  


  // const yValue = d => d.sepal_width;
  // const yAxisLabel = 'Sepal Width';

  const SiFormat = d3.format('.2s');
  const xAxisTickFormat = tickValue => SiFormat(tickValue).replace('G', 'B');

  console.log(data.columns);
  
  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, xValue)) 
    //WHILE BARCHARTS NEED TO HAVE 0 BASELINE IT DOESNT REALLY MAKE SENSE FOR SCATTER-PLOTS [TYPICALLY GO FROM MIN TO MAX]
    //THIS CODE >> .domain([d3.min(data, xValue), d3.max(data, xValue)])  << IS MORE EFFECIENTLY WRITTEN AS SEEN ABOVE  
    .range([0, innerWidth])
    .nice();

    //REMEMBER TO USE SCALELINEAR FOR SCATTERPLOTS AND SCALEBANDS FOR BARCHARTS
    //ERROR OF A PLOT BEING OVER A TICK VALUE CAN BE SOLVED BY MAKING SURE THE MARKS GO BEHIND THE TICKVALUE
    //TO EFFECTIVELY DO THIS JUST PUT THE MARKS FIRST SO IT GOES BEHIND [THINGS AFTER GOES ON TOP] OR BETTER CALL .nice() function
  const yScale = d3.scaleLinear()
  .domain(d3.extent(data, yValue))   
  .range([0, innerHeight]);


  const colorValue = d => d['Trading As'];
  const colorLegendLabel = 'Legend';
  const circleRadius = 7;

  const filteredData = data.filter(d => hoveredValue === colorValue(d));  //[data.filter] is a Built in Filter Method 


  const colorScale = d3.scaleOrdinal()
  .domain(data.map(colorValue))
  .range(['#E6842A', '#137B80', '#8E6C8A']); //REFER TO GOOGLE OR DATA COLORS [sunlight foundation] TO FIND COLORS TO USE
  console.log(colorScale.domain(), 'here');
   
     
  return (
    <>
      <div className="App">
        <div className="navBar">
        
          <NavBar 
            users={users}
            // setResults={setResults}
            addDataHandler={addDataHandler}
            removeDataHandler={removeDataHandler}
           
          />
         
        </div>
      <CsvData />
      <div className="newDropdown">          
        <div className="X-Axis">
        <span className="dropdown-label">X-Axis</span>
              <Select
                options={attributes} 
                value ={attributes.find(option => option.value === xAttribute)} //IF THIS GIVES YOU ANY ERROR CHANGE TO selectedValue={xAttribute}
                onChange = {({value}) => setXAttribute(value)} //This is with using destructuring (less code)
              //onChange = {option => setXAttribute(option.value)} This is a longer way but easier to understand
              />
        </div>
        <div className="color-legend">
          <g transform={`translate(${innerWidth + 60}, 60)`}>
            <text className="axis-label"
            textAnchor="middle"
            x={35}
            y={-25}
            >
              <div style={{marginBottom: 10}}>
                {colorLegendLabel}
              </div>
            </text>
          
            <ColorLegend
              tickSpacing={22}
              tickTextOffset={12}
              tickSize={circleRadius}
              colorScale={colorScale}
              
              onHover={setHoveredValue}
              hoveredValue={hoveredValue}
              fadeOpacity={fadeOpacity}
              />
          </g>
        </div>
          <div className="Y-Axis">
            <span className="dropdown-label">Y-Axis</span>
              <Select
                options={attributes} 
                value ={attributes.find(option => option.value === yAttribute)} //IF THIS GIVES YOU ANY ERROR CHANGE TO selectedValue={xAttribute}
                onChange = {({value}) => setYAttribute(value)}
              />
          </div>
      </div>
 
    
        <div className="four">
          <div className="move">
              <svg width={width} height={height}>
                      <g transform={`translate(${margin.left}, ${margin.top})`}>

                          <AxisBottom key={xValue.xAxisTickFormat}
                            xScale={xScale} 
                            innerHeight={innerHeight}
                            tickFormat={xAxisTickFormat}
                            tickOffset={5}
                              />
                              
                          <text className = "axis-Label"
                            textAnchor="middle"
                            transform={`translate(${-yAxisLabelOffset}, ${innerHeight / 2}) rotate(-90)`}
                            > 
                            {yAxisLabel}
                          </text> 

                          <YAxis key={xValue(yScale)}
                            yScale={yScale} 
                            innerWidth={innerWidth}
                            tickOffset={5}
                            />
                          
                          <text className = "axis-Label" 
                            x={innerWidth / 2}
                            y={innerHeight + xAxisLabelOffset + 20} 
                            textAnchor="middle"> 
                            {xAxisLabel}
                          </text> 

                          here

                          <g opacity={hoveredValue? fadeOpacity : 1}> 
                          <Marks 
                            data={data}
                            xScale={xScale}
                            xValue={xValue}

                            yScale={yScale}
                            yValue={yValue}

                            colorScale={colorScale}
                            colorValue={colorValue}

                            tooltipFormat={xAxisTickFormat}
                            circleRadius={circleRadius}
                          /> 
                        </g>

                        <Marks 
                            data={filteredData}
                            xScale={xScale}
                            xValue={xValue}

                            yScale={yScale}
                            yValue={yValue}

                            colorScale={colorScale}
                            colorValue={colorValue}

                            tooltipFormat={xAxisTickFormat}
                            circleRadius={circleRadius}
                        /> 
                      </g>
                </svg>
                </div>
              </div>
            
            </div>
      </>
   );

  
};

export default ScatterPlot;  

//REFER TO D3 FORMATTING TO FORMAT YOUR NUMBERS

// THE data.map(d =. <rect) <-- this is producing your marks as seen now probably on a file by itself
// READ SVG TEXT FOR MORE ON TEXT OPTIONS AND FEATURES