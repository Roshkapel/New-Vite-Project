
export const Marks = ({xScale, yScale, data, xValue, yValue, tooltipFormat, circleRadius, colorScale, colorValue} ) => (

  data.map(d => (
    <circle className="shadin"
    
    key={data.id} 
    
    cx={xScale(xValue(d))} 
    cy={yScale(yValue(d))}
    fill={colorScale(colorValue(d))}
    r={circleRadius}
    
    >
      <title key={xValue(d)}>
        {tooltipFormat(xValue(d))}
      </title>
    </circle>
      
    ))
)

