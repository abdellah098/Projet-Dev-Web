import React, { Component } from 'react'
import axios from 'axios'
import config from '../../config'
import utils from '../../utils'

 class QuizTest extends Component {
     constructor(props){
         super(props)
         this.state= {
            questions:[
              {Answers:[]}
            ],
            currentQuestion:1,
            finalQuestion:false,
            result:"",
            percentage:""
            }
            this.counter=""
            this.seconds=0
            this.minutes=0
            this.answers=[]
            this.answers.push([])
            this.state.questions[0].Answers.forEach(a=>this.answers[0].push(false))
            this.showResult = false
            this.start= true
    
     }

     componentDidMount = ()=>{
       let params = new URLSearchParams()
       console.log(this.props.id)
       params.set('cours_id',Number(this.props.id))
      axios({
        method:"post",
        url: `${config.apiURL}/quiz/questions`,
        data:params,
        headers: config.headers
      }).then(response=>{
        console.log(response)
        this.setState({questions:response.data.Questions})
      })
      .catch(e=>{console.log(e.response)})
     }
     handleStart = ()=>{
      this.start = false
      this.forceUpdate()
        this.counter  = setInterval(()=>{
          this.minutes = (this.seconds+1) % 60 ===0   ? this.minutes+1 : this.minutes
          this.seconds = this.seconds % 59 ===0 && this.seconds !== 0? 0 : this.seconds+1
          try{
            document.querySelector('.counter').innerHTML = `${this.minutes < 10 ? '0'+this.minutes : this.minutes}:${this.seconds < 10 ? '0'+this.seconds : this.seconds}`
          }catch(e){clearInterval(this.counter)}
        },1000)
      }
        
     
     handleSubmitQuiz = ()=>{
         clearInterval(this.counter)
         console.log(this.answers)
         const final = {cours_id:Number(this.props.id), token:utils.isAuth(), questions:[]}
         this.answers.forEach((answersArray,index)=>{
            let q={question_id:this.state.questions[index].id,answers:[]}
            answersArray.forEach((a,i)=>{
              if(a===true)
                q.answers.push(this.state.questions[index].Answers[i].id) 
            })
            final.questions.push(q)
         })

        let params = new URLSearchParams()
        params.set('token',final.token)
        params.set('cours_id',final.cours_id)
        params.set('questions',JSON.stringify(final.questions))
        axios({
          method:"post",
          url:`${config.apiURL}/cours/valider_quiz`,
          data : params,
          headers : config.headers
        }).then(response=>{
          this.setState({result:response.data.score, percentage: Math.ceil((Number(response.data.score) / this.answers.length)*100)})
        })
          .catch(e=>console.log(e.response))
         this.showResult = true
         this.forceUpdate()

     }
     handleQuestionFlow = (step)=>{
         let current = this.state.currentQuestion + step
         if(current>=1 && current <=this.state.questions.length){
          if(!this.answers[current-1]) {
            this.answers.push([])
            this.state.questions[current-1].Answers.forEach(a=>this.answers[current-1].push(false))
          }
           this.setState({currentQuestion:current, finalQuestion:current ===this.state.questions.length})
          }
     }
     handleSelect = (index,e)=>{
         e.target.className = Array.from(e.target.classList).includes('active') ? "collection-item" : "collection-item active"
         this.answers[this.state.currentQuestion-1][Number(index)] = this.answers[this.state.currentQuestion-1][Number(index)] ? !this.answers[this.state.currentQuestion-1][Number(index)] : true
     }

    render() {
        let answers = this.state.questions[this.state.currentQuestion-1].Answers.map((answer,index)=>{
          let active = this.answers[this.state.currentQuestion-1][index] ? 'active' : ''
            return (
                <a onClick={this.handleSelect.bind(this,index)}  key={answer.id} href="#!" className={`collection-item ${active}`}>{answer.value}</a>
            )
        })
        return (
<div className="card-panel section">
        <div className="row" style={{marginBottom:"0px"}}>
        {
          this.start ? <button className="btn btn-large center" onClick = {this.handleStart}>Start Quiz</button>:
        
          !this.showResult ?
          <React.Fragment>
        <small className="right">Note: Click on the answer to select it</small>

    <p ><span className="teal white-text" style={{padding:"5px",borderRadius:"5px"}} > {`Question ${this.state.currentQuestion} of ${this.state.questions.length}.`}</span> </p>
    <p>{this.state.questions[this.state.currentQuestion-1].value}</p>
   
    <div className="collection quiz">
        {answers}
      </div>
      <div className="row" style={{margin:"0px"}}>
      <div className="col s12 m4 ">
      <span >Time elapsed: <strong className="counter"></strong></span>
      </div>

      <div className="col s12 m2 offset-m4">      
      <button className="btn" style={{marginTop:"10px", width:"100%"}} onClick={this.handleQuestionFlow.bind(this,-1)}>Previous</button>
</div>
      <div className="col s12 m2">
      {
        !this.state.finalQuestion ?
      <button className="btn " style={{marginTop:"10px", width:"100%"}} onClick={this.handleQuestionFlow.bind(this,1)}>Next</button> :
      <button className="btn " style={{marginTop:"10px", width:"100%"}} onClick={this.handleSubmitQuiz}>Submit Quiz</button> 
      
      }
      </div>
      </div>
      </React.Fragment>
      :
      <React.Fragment>
      <h3 className="center teal-text">Result</h3>
      <p className="center">{`${this.state.result} of ${this.answers.length}`}</p>
      <p className="center"><bold>{this.state.percentage}</bold>%</p>
      <p className={`center ${this.state.percentage >= 80 ? "green-text" : "red-text"}`}>{ this.state.percentage>= 80 ? "Congratulations! You've successfully passed the test!" : "Sorry! You need to score 80% at least to pass the test!"}</p>
      <p className="center red-text"><bold>Time spent</bold></p>
        <p className="center">{`${this.minutes < 10 ? '0'+this.minutes : this.minutes}:${this.seconds < 10 ? '0'+this.seconds : this.seconds}`}</p>
      </React.Fragment>    
        
        }
      </div>
</div>
        )
    }
}

export default QuizTest
