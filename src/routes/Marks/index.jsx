

export const Marks = ({xScale, yScale, data} ) => (

  data.map(d => (
    <rect key={d.Revenue} // Using as a unique identifier
    
     x={0} 
     y={yScale(d['Trading As'])}
     width={xScale(d.Revenue)}
     height={yScale.bandwidth()}
    />
    ))
    );