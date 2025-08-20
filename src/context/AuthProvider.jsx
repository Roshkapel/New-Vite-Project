import {createContext, useState} from 'react';

const AuthContext = createContext({});

//the children represents the componentsnnested inside the AuthProvider Context
export const AuthProvider = ({children}) => {
   const [auth, setAuth] = useState({})


    //we are going to use this provider to provide context to the whole app
    //it needs to surround the app[app is in Main content as of rn so lets surrounf main content inindex.js]
   return (
    <AuthContext.Provider value={{auth, setAuth}}>
      {children}
    </AuthContext.Provider>
   )
}

export default AuthContext;