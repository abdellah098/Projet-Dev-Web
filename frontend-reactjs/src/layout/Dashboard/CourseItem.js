import React from 'react'
import {Link} from 'react-router-dom'
import utils from '../../utils'
 function CourseItem(props) {
    return (
        <li className="collection-item">
        <div className="row">
          <div className="col s12 m3">
            <img src={props.thumbnail} style={{maxWidth: '100%'}} alt=""/>
          </div>
          <div className= "col s12 m7">
            <h6><Link to={`/dashboard/cours/${props.id}`}>{props.title}</Link></h6>
            <p className="fontSize13">{props.description}</p>
          </div>
          {!(props.completeCourses || props.incompleteCourses) ?
            !props.page
            
             ?

          <div className="col s12 m2 ">
          <button className="btn margin-top-56" onClick={()=>{window.location.href='/dashboard/courses/'+props.id+'/update'}} style={{width:"100%"}} >Update</button>
          </div> 
          
          :

          <div className="col s12 m2 ">
          <p className=" margin-top-56" style={{width:"100%", color:"green"}} >{props.subscribedCourses.includes(props.id) ? "Already Enrolled":""}</p>
          </div>

          : 
          <div className="col s12 m2 ">
          <p style={{width:"100%", color:props.completeCourses ? "green" : "red"}} > {props.completeCourses ? "You have completed this course" : "You haven't Completed This course"}</p>
          </div>

          }
        </div>
      </li>
    )
}

export default CourseItem