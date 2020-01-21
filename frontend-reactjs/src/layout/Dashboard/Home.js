import React, { Component } from 'react'
import Statics from "./Statics"
import CoursesList from "./CoursesList"
import utils from '../../utils'
class Home extends Component {
    constructor(props){
        super(props)
        this.state={
            total:0,
            successCourses:0,
            currentCourses:0
        }

    }

    updateStatistics =  (t,s,c)=>{
        this.setState({total:t,successCourses:s,currentCourses:c})
    }
    render() {
        return (
            <div className="row">
                <Statics />
                {
                utils.isStudent() ?
                <>
                <CoursesList incompleteCourses={true} />
                <CoursesList completeCourses={true}/>
                </>
                :
                <CoursesList />

                }
            </div>
            )
    }
}

export default Home
