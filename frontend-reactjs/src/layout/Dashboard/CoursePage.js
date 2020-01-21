import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import axios from 'axios'
import config from '../../config'
import utils from '../../utils'
import QuizTest from '../Dashboard/QuizTest'
import queryString from 'query-string'
 class CoursePage extends Component {
   constructor(props){
     super(props)
     this.state={course:{},teacher:{},takeQuiz:false, isSubscribed:false,id:""}
     
   }

   handleTakeQuiz = (e)=>{
     this.setState({takeQuiz:true})
     e.target.value = this.state.takeQuiz ? " Retake Quiz" : "Take Quiz"
    }

    subscribeToCourse = ()=>{
      const { match: { params } } = this.props;
      const data = new URLSearchParams()
      if(!this.state.isSubscribed){
        data.set('token',utils.isAuth())
        data.set('cours_id', params.coursId)
      }else{
        config.headers.Authorization = "Bearer "+utils.isAuth()
      } 
      axios({
        method: this.state.isSubscribed ? "delete" : "post", 
        url: `${config.apiURL}/${this.state.isSubscribed ? `cours/deinscription/${params.coursId}` : "cours/inscription"}`,
        data: data,
        headers: config.headers
      })
      .then(response=>{
        
          console.log(response)
          let sub = !this.state.isSubscribed
          let take = this.state.takeQuiz ? false : this.state.takeQuiz
          this.setState({isSubscribed:sub, takeQuiz:take, id:params.coursId})
        
      })
      .catch(e=>console.log(e.response))
    }
  componentDidMount() {
    const { match: { params } } = this.props;

    axios({
      method: 'post', 
      url: `${config.apiURL}/cours/cours_suivis/id`,
      data: queryString.stringify({token:utils.isAuth()}),
      headers: config.headers
    }).then(response=>{
      this.setState({isSubscribed :response.data.Courses_id.includes(Number(params.coursId))})
    })
      .catch(e=>console.log(e.response))  

    axios.get(`${config.apiURL}/cours/${params.coursId}`)
      .then(response  => {
        console.log(response.data.course);
        this.setState({teacher:response.data.teacher, course:response.data.course, id:params.coursId})
      }).catch(e=>console.log(e.response));
  }
  
    render() {
      const {titre, description } = this.state.course
      const {nom, prenom, email, mini_bio} = this.state.teacher
      let doc = this.state.course.document || ""
      console.log(this.state.course)
        return (
        <React.Fragment>
      <div className="section">
        <h5>Course Details: </h5>
        <br />
        <div className="card-panel">
          <div className="row">
            <div className="col s12 m2"><h5>Title:</h5></div>
            <div className="col s12 m9 offset-m1"><h5>{titre}</h5></div>
          </div>              
          <div className="row">
            <div className="col s12 m2"><h5>Description:</h5></div>
            <div className="col s12 m9 offset-m1"><p>{description}</p></div>
          </div>
          {utils.isStudent && this.state.isSubscribed &&
          <React.Fragment>

          <div className="row">
            <div className="col s4 m2"><h5>Document:</h5></div>
            <div className="col s8 m9 offset-m1" style={{marginTop: '2%'}}><a href={`http://localhost:8000/storage/${this.state.course.document}`} target="_blank" rel="noopener noreferrer"><i className="small material-icons ">insert_drive_file</i>{doc.replace(doc.substr(doc.lastIndexOf('_'),11),'')}</a> </div>
          </div>
        <br />
          </React.Fragment>              
          
        }
          {
            utils.isStudent() && 
          <div className="row">
          <div className="col s12 m3 offset-m3" > <button className={`btn ${this.state.isSubscribed ? "red" : "teal"}`} onClick={this.subscribeToCourse} style={{width:"90%"}}>{this.state.isSubscribed ? "Unsubscribe" : "Enroll Now" }</button></div>
          {this.state.isSubscribed && <div className="col s12 m3"><button className="btn" style={{width:"90%"}} onClick = {this.handleTakeQuiz.bind(this)}>Take Quiz</button></div>}
           
            
          </div>
          }
        </div>
      </div>
          
          {utils.isStudent() && this.state.takeQuiz && this.state.isSubscribed && <QuizTest id={this.state.id}/>}
            <div className="section">
            <h5>About Instructor:</h5>
            <br />
            <ul className="collection">
              <li className="collection-item avatar">
                <img src="https://i.udemycdn.com/user/200_H/21681922_4513_5.jpg" alt="" className="circle" />
                <span className="title">{`${nom} ${prenom}`}</span>
                <p><Link to={`mailto:${email}`}>{email}</Link></p>
                <p>{mini_bio}</p> 
                <Link to="#!" className="secondary-content"><i className="material-icons">grade</i></Link>
              </li>
            </ul>
          </div>
        </React.Fragment>
            )
    }
  }
  
  export default CoursePage
