export const AxisBottom = ({xScale, innerHeight}) => 

  xScale.ticks().map(tickValue => ( 
    <g key={tickValue} transform={`translate(${xScale(tickValue)}, 0)`}>
     <line 
        x1={0}  //zero is default so we can actually remove all these initializations if we want to
        y1={0}
        x2={0} 
        y2={innerHeight}
        stroke="black"
     />
     <text style={{textAnchor: 'middle' }} dy=".71em" y={innerHeight + 3}>{tickValue}</text>
   </g> 
   ));