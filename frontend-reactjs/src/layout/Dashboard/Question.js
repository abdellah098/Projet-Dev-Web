import React from 'react'
import Error from "../../pages/auth/Error"
function Question(props) {
    const answers = props.question.answers.map((answer,index) => {
        return (
            <li key={answer.id}>
            <div className="row margin-bottom-0">
            <div className="col s2 m2" >
              <button  className="btn red margin-left-50" 
                style={{marginTop:"45%"}} 
                onClick={props.addNewAnswerField.bind(this,'remove',answer.id)}>
                    <i className="material-icons">clear</i>
              </button>
              </div>
              <div className="col s8 m8">
              <div className="input-field">
              <input type="text" placeholder="Answer"  
               defaultValue={answer.value} 
               onChange={props.handleAnswerChange}
               id={answer.id}
               style={{"borderBottom": props.errors && props.errors.answersErrors && props.errors.answersErrors[index] ? "1px solid red" : "1px solid #9e9e9e" }}
               />
              <label >Answer</label>
              {props.errors && props.errors.answersErrors && props.errors.answersErrors[index] && <Error>{props.errors.answersErrors[index]}</Error>}

          </div>    
              </div>
              <div className="col s2 m2">
                    <label>
        <input type="checkbox" value="correct" className="filled-in" onClick={props.handleCorrectAnswer.bind(this,answer.id)} />
        <span></span>
      </label>

            </div>
            </div>
        </li>
        )
    })
    return (
        <React.Fragment>
        <div className="row">
        <div className="col s10 m10">
        <div className="input-field">
        <input type="text" placeholder="Question"  defaultValue={props.question.q} onChange={props.handlerQuestionChange} id={props.question.id} style={{"borderBottom": props.errors && (props.errors.answersLengthError || props.errors.noCorrectAnswerError) ? "1px solid red" : "1px solid #9e9e9e" }}/>
        {props.errors && props.errors.answersLengthError && <Error>{props.errors.answersLengthError}</Error>}
        {props.errors && props.errors.noCorrectAnswerError && <Error>{props.errors.noCorrectAnswerError}</Error>}
        <label htmlFor={props.question.id}>Question</label>
      </div>

        </div>
        <div className="col s2 m2">
        <button  className="btn red margin-left-50" 
                style={{marginTop:"45%"}}
                onClick = {props.removeQuestionField} 
                >
                <i className="material-icons">clear</i>
              </button>
        </div>
        </div>
      <div className="row">
        <div className="col s12 m8 offset-m1">
          <ul>
            {answers}
            <li>{props.question.maxError && <Error>You can add only 4 answers!</Error>}
            <button  onClick={props.addNewAnswerField.bind(this,'add')} className=" btn right" style={{marginTop: '-18px'}}><i className="material-icons">add</i></button>
            </li>
          </ul>
        </div>
      </div>
      </React.Fragment>
)
}

export default Question
