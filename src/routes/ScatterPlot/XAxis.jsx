
export const AxisBottom = ({xScale, innerHeight, tickFormat, tickOffset = 3}) => 

// The <line> element is used to dispaly the line strokes in your chart, and we do this by mapping them to the tickValues
  xScale.ticks().map(tickValue => ( 
    <g className= "tick" key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
     <line key={tickValue/.00000013}
        x1={0}  //zero is default so we can actually remove all these initializations if we want to
        y1={0}
        x2={0} 
        y2={innerHeight}
     />
     <text key={tickValue/ 3.34567} style={{textAnchor: 'middle' }}
      dy=".71em"
      y={innerHeight + tickOffset}> 
      {tickFormat(tickValue)}
      </text>
   </g> 
   ));

   //Labels were too close so we introduced a new prop called tickOffset to fix the issue

//SO WE ARE MOVING OUR STYLED FEATURES TO A CSS FILE - [VALUES SUCH AS STROKE= etc.] ALSO 
// NOTE THAT TO DO THIS WE WILL HAVE TO GIVE EACH COMPONENT A CLASS NAME SEE ABOVE
//TO USE CLASS, USE THE PROPERTY className =