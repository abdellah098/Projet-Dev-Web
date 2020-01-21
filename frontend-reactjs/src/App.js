import React, {Component} from 'react';
import './App.css';
import PrivateRoute from './components/PrivateRoute'
import Dashboard from "./layout/Dashboard/Dashboard"
import HomePage from "./HomePage"
// eslint-disable-next-line no-unused-vars
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom"
import M from "materialize-css";
import 'materialize-css/dist/css/materialize.min.css';

class App extends Component {

  componentDidMount() {
    // Auto initialize all the things!
    M.AutoInit();
    /*let datePicker = document.getElementById('bdate')
    var instance = M.Datepicker.getInstance(datePicker)
    instance.options.format = "yyyy-mm-dd"*/

}

   render (){
     return (
    <Router>
    <div className="App  Site">
    <Switch>
    <PrivateRoute path="/dashboard" component={Dashboard} />
    <Route path="/" component={HomePage} />
    </Switch>
    </div>
    </Router>
    )
  }
}

export default App;
