import React, { Component } from 'react'
import Feauture2 from "./home/Feauture2"
import About from "./home/About"
import Contact from "./home/Contact"
import Feauture from "./home/Feauture"

export default class Home extends Component {
    render() {
        return (
            <React.Fragment>
                <Feauture />
                <Feauture2 />
                <About />
                <Contact />
            </React.Fragment>
        )
    }
}
