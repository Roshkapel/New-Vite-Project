import React from 'react';
import { useState, useEffect } from 'react';
import NavBar from './NavBar';
import SalesAddData from './Search/SalesAddData';
import { SalesReps } from './Search/SalesReps';
import api from "../api/users";
import { v4 as uuidv4 } from 'uuid';

const SalesData = ({setResults, name, trading}) => {
 
  //using LOCAL_STORAGE_KEY as key
  const LOCAL_STORAGE_KEY = "users";

  // const userData = SalesData();
  const [users, setUsers] = useState([]);

  //Retrieve Contacts
  const retrieveUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  };

  const addDataHandler = async (user) => {
    console.log('this is user' ,user)
    const request = {
      id: uuidv4(),
      ...user
    }

    const response = await api.post("/users", request);
    console.log(response)
    setUsers([...users, response.data]);

  };


  const updateDataHandler = async (user) => {
    const response = await api.put(`/users/${user.id}`, user);
    const {id, name, trading} = response.data;
    setUsers(user.map(user => {
      return user.id === id ? {...response.data} : user;
    }));
  };

  const removeDataHandler = async (id) => {
    await api.delete(`/users/${id}`);
    const newDataList = users.filter((user) => {
      return user.id !== id;
    });

    setUsers(newDataList);
    
  };

  useEffect(() => {

    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsers(allUsers);
    };

    getAllUsers();
  }, []);
  
  useEffect(() => {
 
  }, [users]);

  return (
    <>
       <NavBar 
        users={users}
        setResults={setResults}
        addDataHandler={addDataHandler}
        removeDataHandler={removeDataHandler}
        updateDataHandler={updateDataHandler}
       />
      <div>
      <SalesAddData 
        addDataHandler={addDataHandler}
        users={users}
        name={name}
        trading={trading}
        removeDataHandler={removeDataHandler}
        updateDataHandler={updateDataHandler}
       />
      </div>
    </>
  )
  
};

export default SalesData;