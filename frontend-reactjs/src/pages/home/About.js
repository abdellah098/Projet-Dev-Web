import React from 'react'
import "../../index.css"
 function About() {
   
    return (
        <section id="about" className="section  scrollspy #4db6ac teal lighten-2">
        <div className="row" style={{marginLeft:"5%", marginRight:"5%" } }>
          <div className="col s12 m6">
            <h4 className="white-text #004d40 teal darken-4 center about-headline">See what we’re about</h4>
            <p className="white-text text-justify line-height-2em">Become who you want to be with OpenClassrooms. Choose your own career path and earn a
              diploma online with hands-on projects and weekly one-on-one mentorship sessions with 
              a dedicated professional in your field..
              Gain experience on your CV with OpenClassrooms apprenticeship programs and earn a salary while you learn.</p>
          </div>
          <div className="col s12 m5 offset-m1">
            <video width={500} height={300} controls>
              <source src="img/v.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video> 
          </div>
        </div>
      </section>
    )
}

export default About
