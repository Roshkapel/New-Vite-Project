import React from 'react';
import MenuBar from './Search/MenuBar';
import { SearchBar } from './Search';

const NavBar = ({setResults, users, addDataHandler, removeDataHandler, addFunction,subFunction}) => {
  return (
    <div className="navBar">
    <SearchBar 
      setResults={setResults}
      users={users}
      addDataHandler={addDataHandler}
      removeDataHandler={removeDataHandler}
      addFunction={addFunction}
      subFunction={subFunction}
  /> 
  <MenuBar/>
</div>
  )
};

export default NavBar;