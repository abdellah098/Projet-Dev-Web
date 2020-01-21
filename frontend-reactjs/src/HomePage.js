import React from 'react'
import Navbar from "./layout/Navbar"
import Footer from "./layout/Footer"
import Home from "./pages/Home"
import Login from "./pages/auth/Login"
import Register from "./pages/auth/Register"
import AuthRoute from './components/AuthRoute'
// eslint-disable-next-line no-unused-vars
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"

 function HomePage() {
    return (
        <Router>
        <div className="App  Site">
        <header>
        <Navbar />
        </header>
        <main className="Site-content">
        <Switch>
          <Route  exact path="/"   component={Home} />
          <AuthRoute  path="/login"    component={Login} />
          <AuthRoute  path="/register" component={Register} />
        </Switch>
        </main>
        <Footer />
        </div>
        </Router>
        )
}

export default HomePage