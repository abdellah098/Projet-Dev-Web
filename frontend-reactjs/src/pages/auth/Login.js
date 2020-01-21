/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import Error from "./Error"
import config from "../../config"
import axios from 'axios'
import queryString from 'query-string'
import util from '../../utils'
import {Redirect} from 'react-router-dom'
import Dashboard from '../../layout/Dashboard/Dashboard'
 class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        email: '',
        password: '',
        success:""
    };

    this.error = false;
    this.loading = false;
    this.success = false

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
}



errors ={
  emailError:"",
  passwordError:"",
  generalError:""
}


handleChange(e) {
  const { name, value } = e.target;
  this.setState({ [name]: value });
}


handleSubmit(e) {
  e.preventDefault();
  this.errors ={
    emailError:"",
    passwordError:"",
    generalError:""
  }

  const { email, password } = this.state;
  this.errors.emailError = !email ? "Please enter your email!": this.errors.emailError
  this.errors.passwordError = !password ? "Please enter your password" : this.errors.passwordError
  this.error = !email || !password ? true : false


 if(!this.error){
  //this.setState({ loading: true });
  let body = {
    email:email,
    password:password
  }
  axios({
    method: 'post', 
    url: `${config.apiURL}/login`,
    data: queryString.stringify(body),
    headers: config.headers
  }).then(
          user => {
              localStorage.setItem('token', JSON.stringify(user.data.token));
              window.location.href = '/dashboard'
         
        }
      )
      .catch(error => {
          this.errors.generalError = "Email or Password is wrong!"
          this.setState({success:false})
      })
}
}


    render() {
        return (
            <div className="row section  ">
            <div className="col 12 m9 offset-m3">
              <div id="login" className="col s12 m8">
                <div className="card-panel">
                <h5 className="center">Login Form</h5>
                <form onSubmit={this.handleSubmit}>
                <div className="center">{this.errors.generalError && <Error>{this.errors.generalError}</Error>}</div>
                  <div className="input-field">
                    <input type="email" name="email" value={this.state.email} onChange={this.handleChange} style={{"borderBottom": this.errors.emailError ? "1px solid red" : "1px solid #9e9e9e" }} placeholder="Email" id="email_login" />
                    <label htmlFor="email">Email</label>
                    {this.errors.emailError && <Error>{this.errors.emailError}</Error>}
                  </div>
                  <div className="input-field">
                    <input type="password" name ="password" value={this.state.password} onChange={this.handleChange} placeholder="password" style={{"borderBottom": this.errors.passwordError ? "1px solid red" : "1px solid #9e9e9e" }} id="password_login" />
                    <label htmlFor="password1">Password</label>
                    {this.errors.passwordError && <Error>{this.errors.passwordError}</Error>}
                  </div>
                  <div className="input-field">
                    <label>
                        <input type="checkbox" className="filled-in" />
                        <span>Remeber me</span>
                    </label>
                  </div>
                  <br />
                  <br />
                  <br />
                  <input name="login" type="submit" defaultValue="Login" className="btn  fullwidth #004d40 teal darken-4 white-text" />
                  </form>
                </div>  
              </div>
            </div>
          </div>    
        )
    }
}
export default Login