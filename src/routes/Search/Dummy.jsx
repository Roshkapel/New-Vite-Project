
import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import logo from './logo.png';
import api from '../../api/users';
import { v4 as uuidv4 } from 'uuid';
import { addDataContext } from './RegisterComponent';

class UserRegister extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userReg: '',
      pwd: '',
      matchPwd: '',
      validName: false,
      validPwd: false,
      validMatch: false,
      errMsg: '',
      success: false
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = async (e, addDataHandler) => {
    e.preventDefault();
    const { userReg, pwd, matchPwd } = this.state;


    try {
      const request = {
        id: uuidv4(),
        username: userReg,
        password: pwd
      };

      // Send data to the API
      const response = await api.post("/users", request);
      console.log(response.data);

      // Reset form fields and show success message
      this.setState({
        userReg: '',
        pwd: '',
        matchPwd: '',
        success: true
      });
    } catch (error) {
      console.error("Error registering user:", error);
      // Handle errors appropriately
    }
  };

  render() {
    const { userReg, pwd, matchPwd, validName, validPwd, validMatch, errMsg, success } = this.state;

    return (
      <>
        {success ? (
          <div>
            {/* Render success message or redirect to login page */}
          </div>
        ) : (
          <div>
            {/* Your registration form */}
            <form onSubmit={(e) => this.handleSubmit(e, this.props.addDataHandler)}>
              {/* Form fields */}
              <input type="text" id="userReg" value={userReg} onChange={this.handleChange} placeholder='enter' />
              {/* <input type="password" id="pwd" value={pwd} onChange={this.handleChange} placeholder='enter' />
              <input type="password" id="matchPwd" value={matchPwd} onChange={this.handleChange} placeholder='enter' /> */}
              {/* Error message */}
              {errMsg && <p>{errMsg}</p>}
              {/* Submit button */}
              <button type="submit">Register</button>
            </form>
          </div>
        )}
      </>
    );
  }
}

export default UserRegister;