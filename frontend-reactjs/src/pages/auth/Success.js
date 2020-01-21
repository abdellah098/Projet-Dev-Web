import React, {Component} from 'react'
import {Link} from "react-router-dom"

 class Success extends Component {
     componentDidMount(){
        setTimeout(
            ()=>{ 
                this.props.p.push(this.props.vers)
             }
            ,5000);

     }
    render() {
        return (
            <div className="row" style={{marginTop:"5%"}}>
            <div className="col s12 m8 offset-m2">
              <div className="card  #4db6ac teal  line-height-2em  fontSizeBigger">
                <div className="card-content">
                  <span className="card-title white-text center">Congratulations</span>
                  <span className="white-text">
                    You're officially a part of Education Platform family.<br />
                    You can now, enjoy all the learning materials and rock you career!<br />
                    Login with you email and password and start learning NOW!<br />
                    You'll be redirected in a few seconds. In case you can't redirect, <Link className="blue-text " to="/">click here</Link>
                  </span>
                </div>
              </div>
            </div>
          </div>
            )
    }
}


export default Success
