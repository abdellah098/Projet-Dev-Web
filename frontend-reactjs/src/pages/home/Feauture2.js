import React from 'react'
import diploma from "../../img/diploma1.svg"
import job from "../../img/job.svg"
import mentorship from "../../img/mentorship.svg"
import DescGrid from "./DescGrid"
 function Feauture2() {
    return (
        <section className="section section-margin" id="feautures">
        <div className="row">
          <div className="col s12 m4">
          <DescGrid 
          img={diploma} 
          headline={"Diploma qualification"} 
          description={"Earn a bachelor’s- or master’s-level diploma to unlock your new career"}/>
          </div>
          <div className="col s12 m4">
          <DescGrid 
          img={mentorship} 
          headline={"Mentorship"} 
          description={"Benefit from weekly, one-on-one sessions with an expert in your field"}/>
          </div>
          <div className="col s12 m4">
          <DescGrid 
          img={job} 
          headline={"Job guarantee"} 
          description={"Receive career coaching to help you find a job within 6 months or your money back"}/>
          </div>
        </div>
      </section>
    )
}

export default Feauture2