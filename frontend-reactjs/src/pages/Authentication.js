import React, { Component } from 'react'
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import Login from "./auth/Login"
import Register from "./auth/Register"

 class Authentication extends Component {
    render() {
        return (
            <Router>
            <React.Fragment>
            <Link to="/authentication/register" >Register</Link>
            <Link to="/authentication/login" >Login</Link>
            <Switch>
                <Route   path="/authentication/register" exact component={Register} />
                <Route   path="/authentication/login" exact component={Login} />
            </Switch>
            </React.Fragment>
            </Router>
            )
    }
}

export default Authentication