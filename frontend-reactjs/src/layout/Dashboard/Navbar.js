/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import {Link} from "react-router-dom"
import { withRouter } from 'react-router-dom';
//onClick={()=>{utils.logout();history. }}
//import profilePic from "../../img/rhinehart_2552984b.jpg"
import background from "../../img/Background_Photo_Place_Holder_Design-300x190.jpg"
import utils from '../../utils'
 function Navbar(props) {
    const logout = ()=>{
      utils.logout()
      window.location.href ='/'
    }

    
    return (
   
        <React.Fragment>
                    <div className="navbar-fixed">
          <nav className="navbar bg-color-black">
            <div className="nav-wrapper">{/*<Link href="#!" class="brand-logo white-text">Home</Link>*/}
              <ul id="nav-mobile" className="right ">
                <li><Link to="#!" data-target="dropdown1" className="dropdown-trigger waves-effect"><span onClick={logout}>Logout</span></Link><div id="dropdown1" className="dropdown-content notifications" /></li>
              </ul><Link to="#!" data-target="sidenav-left" className="sidenav-trigger left"><i className="material-icons white-text">menu</i></Link>
            </div>
          </nav>
        </div>
        <ul id="sidenav-left" className="sidenav sidenav-fixed bg-color-black" style={{transform: 'translateX(0px)'}}>
          <li><Link to="/dashboard" className="logo-container">Education Platform</Link></li>
          <li>
            <div className="user-view">
              <div className="background">
                <img src={background} />
              </div>
              <div className="row">
              <div className="col s12 m3">
              <Link to="#user"><img className="circle profile-picture" src="https://i.dailymail.co.uk/i/pix/2017/04/20/13/3F6B966D00000578-4428630-image-m-80_1492690622006.jpg" /></Link>

              </div>
              <div className="col s12 m9">
              <Link to="#name"><span className="white-text name">{props.userInfo ? props.userInfo.nom+" "+props.userInfo.prenom : ""}</span></Link>
              <Link to="#email"><span className="white-text email">{props.userInfo ? props.userInfo.email : ""}</span></Link>
              </div>
            </div>
            </div>
            </li>
          <li className="no-padding">
            <ul className="collapsible collapsible-accordion">
              <li><Link to="/dashboard" className="waves-effect active">DASHBOARD<i className="material-icons">web</i></Link></li>
              <li><Link to="/dashboard/courses" className="waves-effect active">COURSES<i className="material-icons">book</i></Link></li>
              <li><Link to="/dashboard/account" className="waves-effect active">ACCOUNT<i className="material-icons">account_box</i></Link></li>
            </ul>
          </li>
        </ul>
      {

        utils.isTeacher() &&
        <div className="fixed-action-btn">
                <Link to="/dashboard/courses/add" className="btn-floating btn-large red">
                    <i className="large material-icons">add</i>
                </Link>
            </div>
      }

        </React.Fragment>
    )
}

export default withRouter(Navbar)