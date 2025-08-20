import React from 'react';
import { useRef, useState, useEffect, useContext } from 'react';
import images from './images.jpeg';
// import NavBar from '../NavBar';
import { HomeNav } from './HomeNav';
import { Link } from 'react-router-dom';
import {UserProfile} from './UserProfile';
import AuthContext from '../../context/AuthProvider';
import api from '../../api/users';
import { v4 as uuidv4 } from 'uuid';



const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const UserLogin = ({topFiveRevenue}) => {
  //both auth and setSAuth were declared as values in the provider, using setAuth here i assume will update auth everywhere 
  const {setAuth} = useContext(AuthContext);
 

  const logRef = useRef();
  const errRef = useRef();

  const [userLog, setUserLog] = useState('');
  const [logPwd, setLogPwd] = useState('');
  const [logID, setLogID] = useState('')
  const [dept, setDept] = useState('');
  const [errMsg, setLogErrMsg] = useState('');
  

  const [logSuccess, setLogSuccess] = useState(false);

  const width = 100;
  const height = 100;

  const runLogin = async (e) => {
    e.preventDefault();

    // const foundUser = registeredUsers.find(user => user.username === userLog && user.password === logPwd);

    // if (!foundUser) {
    //   setLogErrMsg('User not found');
    //   return;
    // }

    try {
      const request = {
        id: uuidv4(),
        username: userLog,
        password: logPwd
      };

    const response = await api.post("/users", request,
    JSON.stringify({user: userLog, passWord: logPwd}),
        {
          headers: { 'Content-Type': 'application/json'},
          withCredentials: true
        });
        console.log(userLog, logPwd);
        const accessToken = response?.data?.accessToken;
        const roles = response?.data?.roles;
        setAuth({userLog, logPwd, roles, accessToken});
        console.log("Before reset:", userLog, logPwd);
        // setUserLog('');
        setLogPwd('');
        console.log("after reset:", userLog, logPwd);
        console.log('work');
        
        console.log(JSON.stringify(response?.data));
  
      } catch (err) {
        if(!err?.response){
          setLogErrMsg('No Server Response');
        } else if (err.response?.status === 400) {
          setLogErrMsg('Missing Username or Password');
        } else if (err.response?.status === 401) {
          setLogErrMsg('UnAuthorized');
        } else {
          setLogErrMsg('Login Failed')
        }
        errRef.current.focus();
    }
        setLogSuccess(true);
        // setUserLog('');
        // console.log("here", userLog, logPwd);
        // setLogPwd('');
  }

    useEffect(() => {
      logRef.current.focus();
    }, [])
  
    useEffect(() => {
      setLogErrMsg('');
    },[userLog, logPwd])
  
  


  return (
    <>
      {logSuccess ? (
        <div>
          <UserProfile
            userLog={userLog}
            dept={dept}
            logID={logID}
            topFiveRevenue={topFiveRevenue}
          />
        </div>
      ): (

        <div>
        <HomeNav />
        <div> <span className="add-data-heading"><h2>User Login</h2></span>
          <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive">{errMsg}</p>
          </div>
          <div className='user-login'>
            <div style={{
                marginLeft: `200px`,
                alignItems: 'center',
                backgroundImage: `url(${images})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: `80px`,
                height: `80px`
              }}>
            </div>

              <form onSubmit={runLogin}>                  
                <div className='login'>
                  <div className="user-field">
                  <label htmlFor='login-name'>Username:</label>
                    <input className='user-input'
                      type="text" 
                      id='login-name'
                      ref={logRef}
                      autoComplete='off'
                      onChange={(e) => setUserLog(e.target.value)}
                      value={userLog}
                      required
                      placeholder="enter name" 
                      /> 
                  </div>

                <div className="user-field">
                <label htmlFor='id-num'>User ID#:</label>
                  <input className='user-input'
                    type="text" 
                    id="id-num"
                    autoComplete='off'
                    onChange={(e) => setLogID(e.target.value)}
                    value={logID}
                    required
                    placeholder="enter ID#" 
                    /> 
                </div>

                <div className="user-field">
                <label htmlFor='password'>Password:</label>
                  <input className='user-input'
                    type="password"
                    id='password'
                    onChange={(e) => setLogPwd(e.target.value)}
                    value={logPwd}
                    required 
                    placeholder="password" 
                    /> 
                </div>

                <div className="user-field">
                <label htmlFor="department">Department:</label>
                  <input className='user-input'
                    type="text" 
                    id="department"
                    onChange={(e) => setDept(e.target.value)}
                    value={dept}
                    placeholder="enter name" 
                    /> 
                </div>
                <div className='user-field'>
                <button className="sign-in-btn" type="submit">Sign in</button>
                {/* <button className='cancel-btn' type="button">Cancel</button> */}
                </div>
              </div>

              </form>
          </div>
           
          
        </div>
      ) }
    </>
  )
}