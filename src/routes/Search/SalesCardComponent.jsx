import React, {useState, useCallback, useEffect} from "react";


//props is actually a default parameter
export const SalesCardComponent = ({clickHandler, user, updateDataHandler}) => {
 
    const {id, name, trading, volumes, revenue} = user;
  
  // const renderUserData = userData.map((user) => {
  //   const id = user.id;
  //   const name = user.name
  //   const trading = user.trading
  //   const volumes = user.volumes
  //   const revenue = user.revenue

    return (
      <div className="recently-added" key={user.id}>
        <h4>Recently Added</h4>
        <div className="recents">
          <p id="id">{id}</p>
          <p>{name}</p>
          <p>{trading}</p>
          <p>{volumes}</p>
          <p>{revenue}</p>
          <div>
            <ul>
            <li><button onClick={()=> clickHandler(id)}>Delete</button></li>
            <button onClick={()=> updateDataHandler(id)}>Update</button>
            </ul>
          </div>

        </div>
      </div>
    );

  
  // return <div>{renderUserData}</div>
     
}