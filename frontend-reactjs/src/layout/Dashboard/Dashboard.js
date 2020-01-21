import React, { Component } from 'react'
import {BrowserRouter as Router,Route, Switch} from "react-router-dom"
import Navbar from "./Navbar"
import Home from "./Home"
import AddCourse from "./AddCourse"
import CoursePage from  './CoursePage'
import Courses from './Courses'
import axios from 'axios'
import config from '../../config'
import utils from '../../utils'
import queryString from 'query-string'

class Dashboard extends Component {
    constructor(props){
        super(props)
        this.state = {
            'userInfo':""
        }
    }

    componentDidMount = ()=>{
        console.log("working ....")
        let body = {
           token : utils.isAuth() 
        }
        axios({
            method: 'post', 
            url: `${config.apiURL}/user/informations`,
            data: queryString.stringify(body),
            headers: config.headers
          })
          .then(response =>{
              console.log(response.data)
              this.setState({userInfo:response.data})
          })
          .catch(e=>console.log(e))

        
    }

    render() {
        return (
            <Router>
     <div className="App  Site">
        <header>
        <Navbar userInfo={this.state.userInfo} />
        </header>
        <main >
        <div className="container">

            <Switch>
                <Route exact path="/dashboard" component={Home} />
                <Route path="/dashboard/courses/add" component={AddCourse} />
                <Route path="/dashboard/courses/:coursId/update" component={AddCourse} />
                <Route path="/dashboard/courses" component={Courses} />
                <Route path='/dashboard/cours/:coursId' component={CoursePage} />

            </Switch>
            </div>

        </main>
        </div>
            </Router>
            )
    }
}

export default Dashboard