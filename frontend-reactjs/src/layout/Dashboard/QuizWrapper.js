import React, { Component } from 'react'
import Question from "./Question"
 class QuizWrapper extends Component {
     constructor(props){
         super(props)
         this.state = {
             questions : [
                 
                ]
         }
     }

     addNewQuestionField = ()=>{
        const questions = this.state.questions
        questions.push(                 {     
            id:Date.now()/Math.random(),
            q : "",
            maxError:false,
            msgError:"",
            answers:[{id:Date.now()/Math.random(),value:""}]
        }
)
        this.setState({questions:questions})

     }
     addNewAnswerField = (id,type,answerId)=>{
         let indexQuestion = this.state.questions.findIndex(q => q.id === id)
         const question = this.state.questions[indexQuestion]
         question.maxError = false;

         if(type==="remove"){
            question.answers = question.answers.filter(a=>{
                return a.id.toString() !== answerId.toString() 
            })
         }
        else if(question.answers.length >= 4){
            question.maxError = true
            question.msgError ="You can add only 4 answers!"
        }
        else{
         question.answers.push({id:Date.now()/Math.random(), value:""})
        }
         const questions = this.state.questions
         questions[indexQuestion] = question
         this.setState({questions:questions})
        
     }

     handleAnswerChange= (id , e) =>{
        let indexQuestion = this.state.questions.findIndex(q => q.id === id)
        const question = this.state.questions[indexQuestion]
        let indexAnswer = question.answers.findIndex(a => a.id.toString() === e.target.id)
        question.answers[indexAnswer].value = e.target.value
        const questions = this.state.questions
        questions[indexQuestion] = question
        this.setState({questions:questions})
     }

     handlerQuestionChange = (id,e)=>{
        let indexQuestion = this.state.questions.findIndex(q => q.id === id)
        const question = this.state.questions[indexQuestion]
        question.q=e.target.value
        const questions = this.state.questions
        questions[indexQuestion] = question
        this.setState({questions:questions})

     }

    render() {
        const questions = this.state.questions.map(question => {
            return (
                <React.Fragment>
               <Question question={question} key={question.id} 
               addNewAnswerField={this.addNewAnswerField.bind(this, question.id)}
               handleAnswerChange = {this.handleAnswerChange.bind(this,question.id)}
               handlerQuestionChange = {this.handlerQuestionChange.bind(this,question.id)}
               />
                </React.Fragment>
            )
        }
        )
   
        return (
            <React.Fragment>
            {questions}
            <br /><br />
            <button onClick={this.addNewQuestionField.bind(this)} className=" btn" style={{marginTop: "-18px"}}>Add Question</button>
                <br /><br />

            </React.Fragment>
        )
    }
}

export default QuizWrapper
