import React, {createContext, useContext, useState, useEffect} from "react";
import {UserRegister}  from './UserRegister';
import api from '../../api/users';
import { v4 as uuidv4 } from 'uuid';

export const addDataContext = createContext();

const RegisterComponent = () => {

  const [usersRep, setUsersRep] = useState([]);

  //using LOCAL_STORAGE_KEY as key
  const LOCAL_STORAGE_KEY = "users";

  // const userData = SalesData();
 

  //Retrieve Contacts
  const retrieveUsers = async () => {
    const response = await api.get("/users");
    return response.data;
  };

  const addDataHandler = async (user) => {
    console.log('this is user', user)
    const request = {
      id: uuidv4(),
      ...user
    }

    const response = await api.post("/users", request);
    console.log(response, 'response')
    setUsersRep([...usersRep, response.data]);

  };


  const updateDataHandler = async (user) => {
    const response = await api.put(`/users/${user.id}`, user);
    const {id, name, trading} = response.data;
    setUsersRep(user.map(user => {
      return user.id === id ? {...response.data} : user;
    }));
  };

  const removeDataHandler = async (id) => {
    await api.delete(`/users/${id}`);
    const newDataList = users.filter((user) => {
      return user.id !== id;
    });

    setUsersRep(newDataList);
    
  };

  useEffect(() => {

    const getAllUsers = async () => {
      const allUsers = await retrieveUsers();
      if (allUsers) setUsersRep(allUsers);
    };

    getAllUsers();
  }, []);
  
  useEffect(() => {
 
  }, [usersRep]);


  return (
    <addDataContext.Provider value={addDataHandler}>
      <UserRegister />
    </addDataContext.Provider>
  )
}

export default RegisterComponent;