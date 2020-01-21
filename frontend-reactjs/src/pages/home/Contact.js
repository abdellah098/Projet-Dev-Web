import React, { Component } from 'react'

 class Contact extends Component {
    render() {
        return (
            <section id="contact" className="section scrollspy">
            <div className="row section-margin">
              <div className="col s12 m6 offset-m3">
                <h4 className="white-text center about-headline #004d40 teal darken-4 center">Contact Us</h4>
                <div className="card-panel">
                  <h5>Please fill out this form</h5>
                  <div className="input-field">
                    <input type="text" placeholder="Name" id="name" />
                    <label htmlFor="name">Name</label>
                  </div>
                  <div className="input-field">
                    <input type="email" placeholder="Email" id="email" />
                    <label htmlFor="email">Email</label>
                  </div>
                  <div className="input-field">
                    <input type="text" placeholder="Phone" id="phone" />
                    <label htmlFor="phone">Phone</label>
                  </div>
                  <div className="input-field">
                    <textarea className="materialize-textarea" placeholder="Enter Message" id="message" defaultValue={""} />
                    <label htmlFor="message">Message</label>
                  </div>
                  <input type="submit" defaultValue="Submit" className="btn  fullwidth #004d40 teal darken-4 white-text" />
                </div>
              </div>
            </div>
          </section>
            )
    }
}

export default Contact