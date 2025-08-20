import React, {useState, useCallback, useEffect} from "react";;
import {Link } from "react-router-dom";

// import "./Search";
const csvData = "https://gist.githubusercontent.com/Roshkapel/624576680ebfb97f01660d9af7a99179/raw/5f954587b95c2373c9c64e8b954125ca68a06549/SalesData.csv";



export const ProfileNav = ({setResults, addDataHandler, removeDataHandler, users, userLog}) => {

  return (
   
  <>
      <div className="navBar">
        <ul className="nav-list">
         <li><Link to='/login'>Login</Link></li>
          <li><Link to='/forecast'>Forecasts</Link></li>
          <li><Link to='/sales'>Add/Data</Link></li>
          <li><Link to='/charts'>Charts</Link></li>
          <p ><Link to='/' id="closeF">Exit</Link></p>
          {/* <li>Community</li>
          <li>News</li>
          <li>Shared</li> */}
        </ul>
      </div>
      {/* <div className="close">
          <p>Close</p>
        </div> */}
  </>
      
  )
}

