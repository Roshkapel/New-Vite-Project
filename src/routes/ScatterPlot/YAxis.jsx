export const YAxis = ({yScale, innerWidth, tickOffset = 3}) => (
  yScale.ticks().map(tickValue => ( //use ticks and not .domain when using linear scale
   <g className="tick" transform={`translate(0, ${yScale(tickValue)})`} key={tickValue/.213}>
    <line key={tickValue / .00432}
        x1={0}  //zero is default so we can actually remove all these initializations if we want to
        y1={0}
        x2={innerWidth} 
        y2={0}
     />
     <text key={tickValue/2}
      style={{textAnchor: 'end'}}
      x={-tickOffset}
      dy=".32em"
    >
      {tickValue}
    </text>
   </g>    
   
  ))
);

//WE PUT OUR TEXT ELEMENTS IN A GROUP BECAUSE WE ARE GOING TO USE A CLASSS AND IT WILL BE BEST APPLIED IN THAT WAY