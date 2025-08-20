import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


const ChangeButton = () => {
  // State to manage the selected option
  const [selectedOption, setSelectedOption] = useState('');

  const navigate = useNavigate();

  // Function to handle the change in the selected option
  const handleSelectChange = (event) => {
    let selectedOption  = "/" + event.target.value
    setSelectedOption(selectedOption);
    navigate(selectedOption);
  };

  return (
    <div className='legend-btn-position' >
      <select value={selectedOption} onChange={handleSelectChange} className='legend-btn'>
        <option value="">Change View</option>
        <option value="scatterplot">Scatter Plot</option>
        <option value="charts">Bar Chart</option>
        {/* <option value="option3">Option 3</option> */}
      </select>
    </div>
  );
};

export default ChangeButton;