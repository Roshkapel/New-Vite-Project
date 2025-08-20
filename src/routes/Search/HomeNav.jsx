import React, {useState, useCallback, useEffect} from "react";;
import {Link } from "react-router-dom";

// import "./Search";
const csvData = "https://gist.githubusercontent.com/Roshkapel/624576680ebfb97f01660d9af7a99179/raw/5f954587b95c2373c9c64e8b954125ca68a06549/SalesData.csv";



export const HomeNav = ({setResults, addDataHandler, removeDataHandler, users}) => {

  return (
   
  <>
      <div className="navBar">
        <ul className="nav-list">
         <li><Link to='/register'>Members</Link></li>
          <li><Link to='/'>Community</Link></li>
          <li><Link to='/'>News</Link></li>
          <li><Link to='/login'>Profile</Link></li>
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

