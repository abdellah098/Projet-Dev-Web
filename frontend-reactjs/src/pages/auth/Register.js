import React, { Component } from 'react'
import config from "../../config"
import axios from "axios"
import queryString from 'query-string'
import Error from "./Error"
import Success from './Success'
 class Register extends Component {

  
  constructor(props) {
    
    super(props);
    
    this.state ={
      success:false,
      'name':"",
      'lastName':"",
      'email':"",
      'bdate':"1997/07/12",
      'password1':"",
      'password2':"",
      'statut':"student",
    }
    this.errors = {
      'nameError':"",
      'lastNameError':"",
      'emailError':"",
      'bdateError':"",
      'passwordError1':"",
      'passwordError2':"",
      "generalError":""
    }
    this.error = false;
    this.loading = false;
    this.success = false
  }

  handleChange = (e) => {
    const { id, value } = e.target;
    this.setState({ [id]: value });
  }

  handleDatePickerChange = ()=>{
    let date = document.getElementById('bdate').value
    this.setState({"bdate":date})
  }

  handleRadioChange(value){
    this.setState({statut:value})
  }

   handleSubmit =  (e) => {
    
    e.preventDefault();
     this.handleDatePickerChange()
   const {name,lastName, email, bdate, password1, password2, statut} = this.state;
    this.errors.nameError = !name ? "Name is required" : ""
    this.errors.lastNameError = !lastName ? " Last name is required" : ""
    this.errors.emailError = !email ? " Email is required" : ""
    this.errors.bdateError = !bdate ? " Birth date is required" : ""
    this.errors.passwordError1 = !password1 ? " Password is required" : ""
    this.errors.passwordError2 = !password2 ? " Password confirmation is required" : ""
    this.errors.passwordError2 = password2 && password1 && (password2 !== password1) ? "Your password and confirmation password do not match" : this.errors.passwordError2
    this.error = this.errors.nameError || this.errors.lastNameError || this.errors.emailError || this.errors.bdateError ||  this.errors.passwordError1 || this.errors.passwordError2 ? true : false
if(!this.error){
    let body = {
      name,
      prenom:lastName,
      email,
      date_naissance:bdate,
      password:password1,
      statut:statut,
      biographie:"some biographie",
      mini_bio:"some mini biographie",
      photo_profil:"profile picture url"
    }
    console.log(body)
    axios({
    method: 'post', 
    url: `${config.apiURL}/register`,
    data: queryString.stringify(body),
    headers: config.headers
  }).then(res=>{
    this.setState({success:true})
  })
  .catch(e=>{
      try{
      let errors = JSON.parse(e.response.data)
      console.log(errors)
      if(errors.email){
        this.errors.emailError = errors.email[0]
        this.setState({success:false})
      }

      }catch(e){
        this.errors.generalError = "An error has occured! Please try again!"
        this.setState({success:false})

      }
        

  })


}
}
  
    render() {
      if(this.state.success)
        return <Success vers='/login' p={this.props.history}/>
        return (
          
            <div className="row section  ">
            <div className="col 12 m9 offset-m3">
              <div id="register" className="col s12 m8">
                <div className="card-panel">
                  <h5 className="center">Registration Form</h5>
                  <form onSubmit={this.handleSubmit}>
                  <div className="center">{this.errors.generalError && <Error elementID="lastName">{this.errors.generalError}</Error>}</div>

                    <div className="row">
                      <div className="input-field col s12 m6">
                        <input type="text" placeholder="Name" id="name" style={{"borderBottom": this.errors.nameError ? "1px solid red" : "1px solid #9e9e9e" }} onChange={this.handleChange} defaultValue={this.state.name} />
                        <label htmlFor="name">Name</label>
                        {this.errors.nameError && <Error elementID="name">{this.errors.nameError}</Error>}
                        
                      </div>
                      <div className="input-field col s12 m6">
                        <input type="text" placeholder="Last Name" id="lastName" style={{"borderBottom": this.errors.lastNameError ? "1px solid red" : "1px solid #9e9e9e" }} onChange={this.handleChange} defaultValue={this.state.lastName} />
                        <label htmlFor="lastName">Last Name</label>
                        {this.errors.lastNameError && <Error elementID="lastName">{this.errors.lastNameError}</Error>}
                      </div>
                    </div>
                    <div className="row">
                      <div className="input-field col s12 m6">
                        <input type="email" placeholder="Email" id="email" style={{"borderBottom": this.errors.emailError ? "1px solid red" : "1px solid #9e9e9e" }} onChange={this.handleChange} defaultValue={this.state.email} />
                        <label htmlFor="email">Email</label>
                        {this.errors.emailError && <Error elementID="email">{this.errors.emailError}</Error>}
                      </div>

                      <div className="input-field col s12 m6">
                        <input type="text" name="bdate" id="bdate" 
                          style={{"borderBottom": this.errors.bdateError ? "1px solid red" : "1px solid #9e9e9e" }}
                          className="datepicker"
                          onSelect={this.handleDatePickerChange} 
                            defaultValue={this.state.bdate}
                          />

                        <label htmlFor="bdate">Birth Year</label>
                        {this.errors.bdateError && <Error elementID="bdate">{this.errors.bdateError}</Error>}
                      </div>
                    </div>

                    <div className="row">
                      <div className="input-field col s12 m6">
                        <input type="password" placeholder="password" style={{"borderBottom": this.errors.passwordError1 ? "1px solid red" : "1px solid #9e9e9e" }} onChange={this.handleChange} defaultValue={this.state.password1} id="password1" />
                        <label htmlFor="password1">Password</label>
                        {this.errors.passwordError1 && <Error elementID="password1">{this.errors.passwordError1}</Error>}
                      </div>
                      <div className="input-field col s12 m6">
                        <input type="password" placeholder="password" style={{"borderBottom": this.errors.passwordError2 ? "1px solid red" : "1px solid #9e9e9e" }} onChange={this.handleChange} defaultValue={this.state.password2} id="password2" />
                        <label htmlFor="password2">Confirm Password</label>
                        {this.errors.passwordError2 && <Error elementID="password2">{this.errors.passwordError2}</Error>}  
                      </div>
                    </div>
                    <div className="row">
                      <label className="col s12 m3 offset-m3">
                        <input name="type" type="radio" className="with-gap"  onChange={this.handleRadioChange.bind(this,"student")} defaultChecked />
                        <span>Student</span>
                      </label>
                      <label className="col s12 m5 offset-m1">
                        <input name="type" type="radio" className="with-gap"  onChange={this.handleRadioChange.bind(this,"teacher")}/>
                        <span>Instructor</span>
                      </label>
                    </div>
                    <input name="register"   type="submit" defaultValue="Register" className="btn  fullwidth #004d40 teal darken-4 white-text" />
                  </form>
                </div>
              </div>
            </div>
          </div>
    
        )
    }
}

export default Register