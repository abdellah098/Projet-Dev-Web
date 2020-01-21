/* eslint-disable no-useless-escape */
import jwtDecode from 'jwt-decode'
//((new Date().getTime()/1000) - token.exp) < 3600
const isAuth = ()=>{
    let tokenEncoded = localStorage.getItem('token')
    try {
    
    if(tokenEncoded){
        //let token = jwtDecode(tokenEncoded)
        return tokenEncoded.replace(/\"/g,"")
    }
    else 
        return null
    }catch(e){
        console.log(e)
    }
}

const user = () => {
    try{
    return {id:jwtDecode(localStorage.getItem('token')).id, statut: jwtDecode(localStorage.getItem('token')).statut}
    }catch(e){
        console.log(e)
        return null
    } 
}
const logout = () => {
    localStorage.removeItem("token")
    return !isAuth
}

const isTeacher = ()=> user().statut === "teacher"
const isStudent = ()=> user().statut === "student"




export default {isAuth, user, logout, isTeacher, isStudent}