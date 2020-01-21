import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "../index.css"
import utils from '../utils'
 class Navbar extends Component {
  logout = ()=>{
    utils.logout()
    this.forceUpdate()
  }

    render() {
        return (
            <nav className="teal">
            <div className="section-margin">
            <div className="nav-wrapper">
              <Link to="/" className="brand-logo flow-text">Education Platform</Link>
              <Link to="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></Link>
              <ul className="right hide-on-med-and-down">
                <li><a href="#feautures">Feautures</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#contact">Contact Us</a></li>
                {!utils.isAuth() ?
                 <React.Fragment>
                <li><Link className=" waves-effect waves-light #004d40 teal darken-4  btn-small white-text" to="/login">Login</Link></li>
                <li><Link className="auth-btn waves-effect waves-light #004d40 teal darken-4 btn-small white-text" to="/register">Register</Link></li>
                 </React.Fragment> 
                  :
                 <React.Fragment>
                <li><Link className=" waves-effect waves-light #004d40 teal darken-4  btn-small white-text" onClick={(e)=>window.location.href='/dashboard'}>Dashboard</Link></li>
                <li><Link onClick={this.logout} className="auth-btn waves-effect waves-light #004d40 teal darken-4 btn-small white-text" to="/login">Logout</Link></li>
                 </React.Fragment> 

                }
              </ul>
            </div>
        </div>

      <ul className="sidenav" id="mobile-demo">
        <li><Link to="#feautures">Feautures</Link></li>
        <li><Link to="#about">About Us</Link></li>
        <li><Link to="#contact">Contact Us</Link></li>
        <li><Link className=" waves-effect waves-light btn-flat " to="/login">Login</Link></li>
        <li><Link className=" waves-effect waves-light btn-flat " to="/register">Register</Link></li>
      </ul>
          </nav>
            )
    }
}

export default Navbar