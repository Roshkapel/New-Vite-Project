import { json } from "d3";
import React, {useState, useCallback, useEffect} from "react";
import { Link } from "react-router-dom";

const MenuBar = ({setResults}) => {
  
  return (
    <div className="Gmenu">
    <ul className="menu">
        <li>
        <a title="Menu" href=""><span className="difnav">Menu</span></a>  
          <ul className="dropdown">
            <li><a href="index.html"><span className="nav"></span></a></li>
            <li><Link to='/login'>Login</Link></li>
            <li><Link to='/forcasts'>Forecasts</Link></li>
            <li><Link to='charts'>View Charts</Link></li>
            <li><Link to='/sales'>Add/Data</Link></li>
            <li><Link to='/'>Exit</Link></li>
          </ul>  
        </li>
    </ul>
  </div>
  )
};

export default MenuBar;

//we are using the useState hook to record and analyse what the user enters
//whenever the user enters a text we want to be able to fetch data from an external API
//for this we will be using fetch in the form of a json API that makes dummy calls
//whenever you have an asynchronous function (like using this json fetch with useState) you have to chain a .then on it to a wait response
//then we have to convert the response intoa format that javascript can understand.
