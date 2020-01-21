import React from 'react'
import {Link} from "react-router-dom"
import studentIMG from "../../img/pencil-boy-sm.png"
 function Feauture() {
    return (
        <section className="section scrollspy #4db6ac teal lighten-2">
        <div className="container">
          <div className="row">
            <div className="col s12 m4">
              <img src={studentIMG} className="feauture-img " height="400px" alt="A student"/>
            </div>
            <div className="col s12 m6">
              <h3 className=" white-text "><span className="#004d40 teal darken-4">Become<br />Future-Proof</span></h3>
              <p className="feauture-desc white-text"><span>Get the skills of tomorrow.<br /> Learn to learn efficiently. <br />Take control of your career for good.</span></p>
              <Link to="/register" className="btn waves-effect waves-light #004d40 teal darken-4 btn-large">Get Started
                <i className="material-icons right">send</i>
              </Link>
            </div>
          </div>
        </div>
      </section>

    )
}
export default Feauture