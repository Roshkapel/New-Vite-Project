import React from "react";


export const Dropdown = ({options, id, onSelectedValueChange, selectedValue}) => (
  <select key={options.id} id= {id} onChange={event => onSelectedValueChange(event.target.value)}>
    <option key={options.label} value="">--Please choose an option--</option>
    {options.map(({value, label}) => ( //passed label and value as props their respective values are defined in their components
      <option value={value} selected={value === selectedValue}>{label}</option>
    ))}
  </select>
);

//THE selected <option> method accpets a slected attribute, the selected attribute is a boolean which indicates that the option is initially selected if the <option> element is the descendant of a <select> element whose multiple attribute is not set, only one single ,option> of this <select> element may have the selected attribute. 

//REFER TO REACT DROPDOWN AND REACT SELECT ALTHOUGH REACT SELECT SEEMS WAY BETTER