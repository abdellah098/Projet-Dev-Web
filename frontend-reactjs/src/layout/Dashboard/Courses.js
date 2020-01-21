import React, { Component } from 'react'
import M from "materialize-css";
import CoursesList from './CoursesList' 
import Pagination from './Pagination'
import axios from 'axios'
import config from '../../config'
import queryString from 'query-string'
import utils from '../../utils';
 class Courses extends Component {
   constructor(props){
     super(props)
     this.state = {
       keyword:"",
       page:1,
       perPage:2,
       pages:0,
       courses:"",
       subscribedCourses:[]
     }
   }

  componentDidMount(){
    M.AutoInit()
    axios({
      method: 'post', 
      url: `${config.apiURL}/cours/cours_suivis/id`,
      data: queryString.stringify({token:utils.isAuth()}),
      headers: config.headers
    }).then(response=>{
      this.setState({subscribedCourses:response.data.Courses_id})
    })
      .catch(e=>console.log(e.response))
    this.search(this.state.page)
  }

  search(page, e){
    if(e)
      e.preventDefault()
    let body = {
      keyword:this.state.keyword,
      page:page,
      per_page:Number(this.state.perPage)
    }
    axios({
      method: 'post', 
      url: `${config.apiURL}/lescours`,
      data: queryString.stringify(body),
      headers: config.headers
    }).then(response=>{
      console.log(response)
      this.setState({
        courses:response.data.cours,
        pages:Math.ceil(response.data.nombre_cours/Number(this.state.perPage)),
        page: page
      })
    })
    .catch(e=>console.log(e))

  }
  handlePageClick = (p)=>{
    if(p>=1 && p<=this.state.pages){
      this.search(p)
    }

  }

  handleChange = (e)=> {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }
  
  
    render() {
        return (
      <React.Fragment>

    <div className="card-panel" style={{padding: "12px"}}>
      <form>
      <div className="row" style={{marginBottom: "0px"}}>
      <div className=" input-field col s12 m3">
          <select name="perPage" onChange={this.handleChange}>
              <option value="2">2 Courses</option>
              <option value="4">4 Courses</option>
              <option value="8">8 Courses</option>
              <option value="25">25 Courses</option>
          </select>
          <label>Number of courses per page</label>
      </div>
      <div className="input-field col s12 m7 placeholder">
          <input  id="search" type="search" placeholder="Search for course..." name="keyword" value={this.state.keyword} onChange={this.handleChange} required />
          <label className="label-icon" htmlFor="search"></label>
          <i className="material-icons">close</i>
        </div>
      <div className="input-field col s5 m1 ">
        <button className="btn" style={{width: "220%",marginTop: "10px"}} onClick={this.search.bind(this,this.state.page)}>Search</button>
      </div>
        </div>
      </form>
    </div>
    {
      this.state.courses && 
    <CoursesList page={true} courses={this.state.courses} subscribedCourses={this.state.subscribedCourses}/>
    }
    {
     this.state.pages > 0 && 
    <Pagination pages={this.state.pages} page={this.state.page} handlePageClick = {this.handlePageClick.bind(this)}/>      
    }
      </React.Fragment>    
        )
    }
}

export default Courses
