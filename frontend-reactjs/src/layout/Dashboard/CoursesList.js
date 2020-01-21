import React, { Component } from 'react'
import CourseItem from "./CourseItem"
import axios from 'axios'
import config from '../../config'
import utils from '../../utils'
class CoursesList extends Component {
constructor(props){
 super(props)
 console.log('constructor')
  this.state={courses:this.props.courses ? this.props.courses : [], cours_suivis:{}} 
}
componentDidMount(){
    if(this.props.courses)
      this.setState({courses:this.props.courses})
    else if(utils.isStudent())
      this.studentCourses()
    else
      this.teacherCourses()
}


studentCourses = ()=>{
  let params= new URLSearchParams()
  params.set('token',utils.isAuth())
  let suivis={}

  axios({
    method: 'post', 
    url: `${config.apiURL}/cours/cours_suivis`,
    data:params,
    headers: config.headers
  })
  .then(response=>{
    response.data.Cours_suivis.forEach(element=>{
      suivis[element.cours_id]=element.valide
    })
    console.log(suivis)
      this.setState({courses:response.data.Courses, cours_suivis:suivis})
  })
  .catch(e=>console.log(e.response))

}

teacherCourses = ()=>{
  axios({
    method: 'get', 
    url: `${config.apiURL}/cours/mescours/${utils.user().id}`,
    headers: config.headers
  })
  .then(response=>{
      this.setState({courses:response.data})
  })
  .catch(e=>console.log(e.response))

}

convertToArray = (jsonObject)=>{
  let arr = []
  Object.keys(jsonObject).map(function(key, index) {
    arr.push(jsonObject[key])
  });
  return arr
}
    render() {
      var courses=[],c=[]
      c = !Array.isArray(this.props.courses) && this.props.courses ? this.convertToArray(this.props.courses) : this.props.courses ? this.props.courses : this.state.courses
      if(this.props.incompleteCourses || this.props.completeCourses){
        console.log(this.state.cours_suivis)
        Object.keys(this.state.cours_suivis).forEach(key => {
          
          let cours = this.state.courses.find(c=>{
            return Number(c.id) ==  Number(key)
          })
          console.log(cours)
          let item = <CourseItem thumbnail={`http://localhost:8000/storage/${cours.image_cours}`} 
          key={cours.id}
          title={cours.titre}
          description={cours.description} 
          id={cours.id}
          page={this.props.page}
          subscribedCourses = {this.props.subscribedCourses}
          incompleteCourses= {this.props.incompleteCourses}
          completeCourses = {this.props.completeCourses}  

          />
          if(this.state.cours_suivis[key.toString()] !== 0 && this.props.completeCourses)
            courses.push(item)
          else if(this.state.cours_suivis[key.toString()] === 0 && this.props.incompleteCourses)
            courses.push(item)
        });
      }
      else{
       courses = c.map((course)=>{
        return (
          <CourseItem thumbnail={`http://localhost:8000/storage/${course.image_cours}`} 
          key={course.id}
          title={course.titre}
          description={course.description} 
          id={course.id}
          page={this.props.page}
          subscribedCourses = {this.props.subscribedCourses}
          incompleteCourses= {this.props.incompleteCourses}
          completeCourses = {this.props.completeCourses}  

          />
        )
      })
    }
    
        return (
            <div className="row">
            <div className="col s12">
              <ul className="collection">
                {!this.props.page && <li className="collection-header center"><h4>{utils.isStudent() && this.props.incompleteCourses ? "Your Current Incomplete Courses " : this.props.completeCourses ? "Your Successfully Completed Courses" : "Your Coures List"}</h4></li> }
                  {courses}
              </ul>
            </div> 
          </div>
            )
    }
}

export default CoursesList
