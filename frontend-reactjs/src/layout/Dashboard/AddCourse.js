import React, { Component } from 'react'
import axios from "axios"
import config from "../../config"
import queryString from 'query-string'
import Error from "../../pages/auth/Error"
import Question from "./Question"
import utils from "../../utils"
import M from "materialize-css";

 class AddCourse extends Component {

    constructor(props){
      super(props)
      this.state = {
          quizEnabled : false,
          title:"",
          description:"",
          file:"",
          image:"",
          image_name:"",
          image_extension:"",
          doc_name:"",
          doc_extension:"",
          isUpdate:window.location.href.includes('update') ,
          questions : [ 
          ]
      }

      
      this.isSuccess = false

    }
    

    componentDidMount =()=>{
      if(this.state.isUpdate){
        const { match: { params } } = this.props;
        
        axios.post(`${config.apiURL}/cours/cours_a_jour`,{"cours_id":Number(params.coursId)},config.headers)
          .then(response  => {
            this.setState({title:response.data.titre,description:response.data.description, doc_name:response.data.document, image_name:response.data.image_cours})
          }).catch(e=>console.log(e.response));
          }
    }
    removeQuestionField =(id)=>{
      let indexQuestion = this.state.questions.findIndex(q => q.id === id)
      const questions = this.state.questions
      if (indexQuestion > -1) {
        questions.splice(indexQuestion, 1);
      }
      this.setState({questions:questions})
    }
    addNewQuestionField = ()=>{
      const questions = this.state.questions
      questions.push(                 {     
          id:Date.now()/Math.random(),
          q : "",
          maxError:false,
          msgError:"",
          answers:[{id:Date.now()/Math.random(),value:"", isCorrect:false}]
      }
)
      this.setState({questions:questions})
      console.log(this.state.questions)
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
       question.answers.push({id:Date.now()/Math.random(), value:"", isCorrect:false})
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

   handleCorrectAnswer = (qID, aID)=>{
    let indexQuestion = this.state.questions.findIndex(q => q.id.toString() === qID.toString())
    const question = this.state.questions[indexQuestion]
    let indexAnswer = question.answers.findIndex(a => a.id.toString() === aID.toString())
    question.answers[indexAnswer].isCorrect = !question.answers[indexAnswer].isCorrect;
    const questions = this.state.questions
    questions[indexQuestion] = question
    this.setState({questions:questions})
   }









    errors = {
      titleError:"",
      descriptionError:"",
      fileError:"",
      imageError:"",
      questionsLengthError:"",
      questions:[]
      
    }

    onChangeHandler=event=>{
      console.log(event)
      let files = event.target.files || event.dataTransfer.files;
      if (!files.length)
            return;
            let reader = new FileReader();
            let name = event.target.name
            let filename = this.fileNameAndExt(event.target.value)[0]
            let ext = this.fileNameAndExt(event.target.value)[1]
            reader.onload = (e) => {
              this.setState({
                [name]: e.target.result.split(',').pop(),
                [name === 'image' ? 'image_name' : 'doc_name']: filename,
                [name === 'image' ? 'image_extension' : 'doc_extension'] : ext
                
              })
            };
            reader.readAsDataURL(files[0]);
      
    }
     fileNameAndExt(str){
      var file = str.split('\\').pop();
      return [file.substr(0,file.lastIndexOf('.')),file.substr(file.lastIndexOf('.')+1,file.length)]
    }
    
     handleChange = (e)=> {
      const { name, value } = e.target;
      this.setState({ [name]: value });
    }

    updateCourse = (e)=>{
      const { match: { params } } = this.props;
      console.log(params)
      let data = {}
      if(this.state.title)
        data['titre']=this.state.title
      if(this.state.description)
        data['description']=this.state.description
      if(this.state.image)
        data['image_cours']=this.state.image
      if(this.state.file)
        data['document']=this.state.file
      
      data['cours_id']=params.coursId
      axios({
        method: 'post', 
        url: `${config.apiURL}/couRS/course_a_jour`,
        data: queryString.stringify(data),
        headers: config.headers
      }).then(response => {
        console.log(response)
        M.toast({html:'The course has been Updated!', classes:'materialert success'})
        setTimeout(()=>{
          window.location.href='/dashboard'
        },3000) 

      })
      .catch(e => console.log(e.response))

    }
    
    addCourse = (e)=>{
      console.log(utils.isAuth())
      const { title, description, file, image, questions, image_extension, image_name, doc_extension, doc_name } = this.state;
      this.errors = {
        titleError:"",
        descriptionError:"",
        fileError:"",
        questionsLengthError:"",
        questionsErrors:false
      }
      this.errors.questions = this.state.questions.map((q)=>{
        let errors= {
          noCorrectAnswerError : q.answers.findIndex(a => a.isCorrect === true) !== -1 ? "" : "Please choose the correct answer!",
          answersLengthError : q.answers.length < 2 ? "Please add at least 2 answers" : "",
          answersErrors: q.answers.map(a =>{
            return !a.value ? "Answer field cannot be empty!" : ""
          })
        }

        this.errors.questionsErrors = errors.noCorrectAnswerError || errors.answersLengthError  || q.answers.findIndex(a => !a.value === true)  !== -1 ? true : false
        return errors
        
      })
      console.log("this.errors.questions: ",this.errors.questions)

      this.errors.titleError = !title ? "Please enter the title of the course!": this.errors.titleError
      this.errors.fileError = !file ? "Please upload the course!": this.errors.fileError
      this.errors.descriptionError = !description ? "Please enter the description of the course" : this.errors.descriptionError
      this.errors.imageError = !image ? "Please add a picture for the course" : this.errors.imageError
      this.errors.questionsLengthError = questions.length <1 ? "Please add at least 3 questions" : this.errors.questionsLengthError
      console.log(this.errors.questionsErrors)
      let error = !file || !description || !title || this.errors.questionsErrors  ? true : false

      if(!error){
     
        let courseData = {
          titre:title,
          description,
          document:file,
          image_cours:image,
          image_extension,
          image_name,
          doc_extension,
          doc_name,
          token: utils.isAuth()
        }

          

        config.headers.authorization = "Bearer " +utils.isAuth()
        axios({
          method: 'post', 
          url: `${config.apiURL}/cours`,
          data: queryString.stringify(courseData),
          headers: config.headers
        }).then(response => {
          console.log(response)
           
          const questions = this.state.questions.map(quest=>{
            return {
              value:quest.q,
              answers:quest.answers.map(answ=>{
                return {
                  value:answ.value,
                  is_correct:answ.isCorrect
                }
              })
            }
          })
          const params = new URLSearchParams()
          params.append('cours_id',Number(response.data.cours_id.id))
          params.append('token',utils.isAuth())
          params.append('questions',JSON.stringify(questions))                   
          axios({
            method: 'post', 
            url: `${config.apiURL}/questions`,
           params,
            headers: config.headers
          }).then(response=>{
              this.isSuccess=true
              M.toast({html:'Your course has been added!', classes:'materialert success'})
              setTimeout(() => {
                this.isSuccess=false
              }, 5000);
  
  
              this.setState({
                title:" ",
                description:"",
                image:"",
                image_name:"",
                image_extension:"",
                questions : [ 
                ]
            })
          })
            .catch(e=>console.log(e.response))


        })
          .catch(error => {
              console.log(error.response)
              console.log("failed")
            })
      }else
        this.forceUpdate()
    
    }
    render() {

      const questions = this.state.questions.map((question ,index) => {
        return (
            <React.Fragment>
           <Question question={question} key={question.id} 
           addNewAnswerField={this.addNewAnswerField.bind(this, question.id)}
           handleAnswerChange = {this.handleAnswerChange.bind(this,question.id)}
           handlerQuestionChange = {this.handlerQuestionChange.bind(this,question.id)}
           removeQuestionField = {this.removeQuestionField.bind(this,question.id)}
           handleCorrectAnswer = {this.handleCorrectAnswer.bind(this,question.id)}
           errors = {this.errors.questions[index]}          
           />
            </React.Fragment>
        )
    }
    )

        return (
          
            <div className="card-panel">

            <div className="row">
              <div className="col s12 m10 offset-m1">
              {this.isSuccess && 
              <div className="materialert success">
                <div className="material-icons">check</div>
                The course has been added successfully!
              </div>
              }

              <h5>Basic Course Details:</h5>
              <br />
                  <div className="input-field">
                    <i className="material-icons prefix">title</i>
                    <input type="text" placeholder="Title of Course" value={this.state.title} name="title" id="title" onChange={this.handleChange} style={{"borderBottom": this.errors.titleError ? "1px solid red" : "1px solid #9e9e9e" }}/>
                    <label htmlFor="title">Title</label>
                    {this.errors.titleError && <Error>{this.errors.titleError}</Error>}
                  </div>
                  <br />
                  <div className="input-field">
                    <i className="material-icons prefix">mode_edit</i>
                    <textarea id="description" placeholder="Description of Course" name="description" className="materialize-textarea" value={this.state.description} style={{"borderBottom": this.errors.descriptionError ? "1px solid red" : "1px solid #9e9e9e" }} onChange={this.handleChange} />
                    <label htmlFor="description">Description</label>
                    {this.errors.descriptionError && <Error>{this.errors.descriptionError}</Error>}
                  </div>
                  <br />
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>Course File</span>
                      <input type="file" onChange={this.onChangeHandler} name="file" />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" value={this.state.doc_name+"."+this.state.doc_extension} id="file" type="text" placeholder="Upload course file here"  style={{"borderBottom": this.errors.fileError ? "1px solid red" : "1px solid #9e9e9e" }} />
                    </div>
                    {this.errors.fileError && <Error>{this.errors.fileError}</Error>}
                  </div>
                  <div className="file-field input-field">
                    <div className="btn">
                      <span>ِCourse Image</span>
                      <input type="file" onChange={this.onChangeHandler} name="image"  />
                    </div>
                    <div className="file-path-wrapper">
                      <input className="file-path validate" value={this.state.image_name+"."+this.state.image_extension} id="image" type="text" placeholder="Upload course image here" style={{"borderBottom": this.errors.imageError ? "1px solid red" : "1px solid #9e9e9e" }} />
                    </div>
                    {this.errors.imageError && <Error>{this.errors.imageError}</Error>}
                  </div>
                  <br />
                  <h5>Quiz Questions:</h5>
                  {this.errors.questionsLengthError && <Error>{this.errors.questionsLengthError}</Error>}
                  <br />
                  {questions}
            <br /><br />
            <button onClick={this.addNewQuestionField.bind(this)} className="btn" style={{marginTop: "-18px"}}>Add Question</button>
            
                <br /><br />

                  <br></br>
                  {

                    this.state.isUpdate ?
                  <button name="add" onClick={this.updateCourse}  className="btn  fullwidth #004d40 teal darken-4 white-text"> Update Course</button> 
                  :            
                  <button name="update" onClick={this.addCourse}  className="btn  fullwidth #004d40 teal darken-4 white-text"> Add Course</button>             
                  }
              </div>
            </div>
          </div>
            )
    }
}

export default AddCourse
