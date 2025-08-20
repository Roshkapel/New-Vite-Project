import React, {useState, useCallback, useEffect} from "react";
import { SalesCardComponent } from "./SalesCardComponent";
import { v4 as uuidv4 } from 'uuid';


//props is actually a default parameter
export const SalesReps = ({removeDataHandler, users, addDataHandler, updateDataHandler}) => {

 const deleteDataHandler = (id) => {
    removeDataHandler(id)
  };

  const updateHandler = (id) => {
    updateDataHandler(id)
  };
  const renderUserData = Array.isArray(users) ? users.map((user) => (

      <SalesCardComponent
      key={user.id}
      // userData={userData}
      removeDataHandler = {removeDataHandler}
      addDataHandler={addDataHandler}
      updateDataHandler={updateHandler}
      clickHandler={deleteDataHandler}
      user={user}
      users={users}
      />
   
  )) : <div><h1>No Data</h1></div> ;
 


  return <div>{renderUserData}</div>
    
  
}