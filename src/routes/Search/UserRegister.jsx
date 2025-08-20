import React from 'react';
import { useRef, useState, useEffect } from 'react';
// import axios from '../../api/users';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
// import images from './images.jpeg';
import logo from './logo.png'
// import NavBar from '../NavBar';
import { HomeNav } from './HomeNav';
import { faCheck, faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import api from '../../api/users';
import { v4 as uuidv4 } from 'uuid';
import { UserLogin } from './UserLogin';


const width = 100;
const height = 100;

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

export const UserRegister = () => {

    const userRef = useRef();
    const errRef = useRef();

    const [userReg, setUserReg] = useState('');
    const [userReps, setReps] = useState([]);
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);
    // const [registeredUsers, setRegisteredUsers] = useState([]);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e) => {
      e.preventDefault();
      //additional security to ensure rgex is enforced
      const v1 = USER_REGEX.test(userReg);
      const v2 = PWD_REGEX.test(pwd);
      const REGISTER_URL = 'http://localhost:3006/register';
      if(!v1 || !v2) {
        setErrMsg("Invalid Entry");
        return;
      }

      // setSuccess(true);

      
    try {
      const request = {
        id: uuidv4(),
        username: userReg,
        password: pwd
      };

      // Send data to the API
      const response = await api.post("/users", request,
      JSON.stringify({user: userReg, passWord: pwd}),
          {
            headers: { 'Content-Type': 'application/json'},
            withCredentials: true
          });

      // setRegisteredUsers([...registeredUsers, { username: userReg, password: pwd }]);
      console.log(response.data);
    
      // addReps(userReps);

      // try {
      //   const response = await api.post(REGISTER_URL, 
      //     JSON.stringify({user: userReg, passWord: pwd}),
      //     {
      //       headers: { 'Content-Type': 'application/json'},
      //       withCredentials: true
      //     }
      // );
      console.log(response.data)
      // console.log(JSON.stringify(response))
      // setUserReg('');
      // setPwd('');
      // setMatchPwd('');
        } catch (err) {
          if (!err?.response) {
            setErrMsg('No Server Response');
          } else if (err.response?.status === 409){
            setErrMsg('Username Taken');
          } else {
            setErrMsg('Registration Failed');
          }
          errRef.current.focus();
      }
          setUserReg('');
          setPwd('');
          setMatchPwd('');
          setSuccess(true);

    }

    // useEffect(() => {
    //   userRef.current.focus();
    // },[]);

    useEffect(() => {
      const result = USER_REGEX.test(userReg);
      console.log(result);
      console.log(userReg);
      setValidName(result)
    }, [userReg]);

    useEffect(() => {
      const result = PWD_REGEX.test(pwd);
      console.log(result);
      console.log(pwd);
      setValidPwd(result);
      const match = pwd === matchPwd;
      setValidMatch(match);
    }, [pwd, matchPwd]);

    useEffect(() => {
      setErrMsg('');
    }, [userReg, pwd, matchPwd])

    //Retrieve Contacts
  // const retrieveReps = async () => {
  //   const response = await api.get("/users");
  //   return response.data;
  // };

  // const addReps = async (user) => {
  //   console.log('this is user' ,user)
  //   const request = {
  //     id: uuidv4(),
  //     ...user
  //   }

  //   const response = await api.post("/reps", request);
  //   console.log(response)
  //   setReps([...user, response.data]);

  // };



  // useEffect(() => {

  //   const getAllReps = async () => {
  //     const allReps = await retrieveReps();
  //     if (allReps) setReps(allReps);
  //   };

  //   getAllReps();
  // }, []);
  
  // useEffect(() => {
 
  // }, [userReps]);


  // useEffect(() => {
  //   const getAllUsers = async () => {
  //     const response = await api.get("/users");
  //     setRegisteredUsers(response.data);
  //   };

  //   getAllUsers();
  // }, []);




  return (
    
    <>
        {success ? (
        <div>
            <UserLogin 
              registeredUsers={registeredUsers}
            />
        </div>
       ) : (

        <div>
       <HomeNav />
      <div> <span className="add-data-heading"><h2> Register</h2></span>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive">{errMsg}</p>
      </div>
      <div className='user-login'>
          <div style={{
            marginTop: `0px`,
            marginBottom: `0px`,
            marginLeft: `200px`,
            alignItems: 'center',
            backgroundImage: `url(${logo})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: `90px`,
            height: `90px`
          }}>
          </div>

            <form onSubmit = {handleSubmit}>
            <div className='register'>
              <div className="user-field">
              <label htmlFor="username">Username:
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !userReg ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
                <input className='user-input'
                  type="text" 
                  id="username"
                  ref={userRef}
                  autoComplete='off'
                  onChange={(e) => setUserReg(e.target.value)}
                  required
                  aria-invalid={validName ? "false" : "true"}
                  aria-describedby="uidnote"
                  onFocus={() => setUserFocus(true)}
                  onBlur={() => setUserFocus(false)}
                  placeholder="enter name" 
                  /> 

                  <p id="uidnote" className={userFocus && userReg && !validName ? "instructions" : "hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    4 - 24 characters.<br />
                    Must begin with a letter.<br />
                    Letters, numbers, underscores, hyphens allowed.
                  </p>
              </div>

              <div className="user-field">
              <label htmlFor>Password:
              <span className={validPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validPwd || !pwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
                <input className='user-input' 
                  type="password" 
                  id="password"
                  ref={userRef}
                  onChange={(e) => setPwd(e.target.value)}
                  required
                  aria-invalid={validPwd ? "false" : "true"}
                  aria-describedby="pwdnote"
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)}
                  placeholder="enter password" 
                  /> 

                  <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    8 - 24 characters.<br />
                    Must include uppercase, lowercase, letters, .<br />
                    numbers & a character.
                  </p>
              </div>

              
              <div className="user-field">
              <label htmlFor='confirm_pwd'>Confirm Password:
              <span className={validMatch && matchPwd ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
                <input className='user-input'
                  type="password"
                  id="confirm_pwd"
                  ref={userRef}
                  onChange={(e) => setMatchPwd(e.target.value)}
                  required
                  aria-invalid={validMatch ? "false" : "true"}
                  aria-describedby="confirmnote"
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)} 
                  placeholder="enter name" 
                  /> 
                  <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "hide"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field .<br />
                  </p>
              </div>
              <div className='user-field'>
              <button 
                disabled={!validName || !validPwd || !validMatch ? true : false}
              className="sign-in-btn" type="submit">Register</button>
              </div>
            </div>
            <div className='register-sign-in'>Login</div>
                {/* <div className='register-sign-in'><Link to='/login'>Login</Link></div> */}
            </form>
      </div>
       </div>
       )};
    </>
  )
}