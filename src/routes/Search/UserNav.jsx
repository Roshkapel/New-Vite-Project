import React, {useState, useCallback, useEffect} from "react";;
import images from './images.jpeg';

// import "./Search";
const csvData = "https://gist.githubusercontent.com/Roshkapel/624576680ebfb97f01660d9af7a99179/raw/5f954587b95c2373c9c64e8b954125ca68a06549/SalesData.csv";



export const UserNav = ({setResults, addDataHandler, removeDataHandler, users}) => {

  return (
   
  <>
      <div className="navBar">
        <p className="nav-list2">User Profile</p>
      </div>
      <div
          style={{
            backgroundImage: `url(${images})`,
            marginLeft: `700px`,
            position: `absolute`,
            marginTop: `-20px`,
            alignItems: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: `40px`,
            height: `40px`
          }}>
            
      </div>      
  </>
      
  )
}

