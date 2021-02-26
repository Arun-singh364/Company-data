import React, { Component } from 'react'
import {Link,Redirect} from "react-router-dom"
import UserImg from "../Image/user.jpg";
import "../components/Login.css";

 class Login extends Component {
    state={
        username:"",
        password:"",
        redirect:false
    }

    handleChange=(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }

    handleSubmit=()=>{
        this.setState({
            redirect: true
          })     
    }
    renderRedirect = () => {
        if (this.state.redirect) {
          return <Redirect to='/showdata' />
        }
      }

    render() {
        return (
            <div className="row text-center">
            {this.renderRedirect()}
           { sessionStorage.setItem('userName',this.state.username)}
            <div className="col-md-4 col-md-offset-3 form">
            
                <form onSubmit={()=>this.handleSubmit()}>
               <b><i> <h1 class ="heading">USER LOGIN</h1></i></b>
                <img class="userImg" src={UserImg} alt="Logo" />
                    <input type="text" style={{borderRadius:"10px"}} required name="username" value={this.state.username} onChange={(e)=>this.handleChange(e)} placeholder="User Name" className="form-control"/>
                    <input type="password" style={{borderRadius:"10px"}} required name="password" value={this.state.password}  onChange={(e)=>this.handleChange(e)} placeholder="Password" className="form-control"/>
                   <button id="loginbtn" style={{borderRadius:"10px"}} required className="btn-primary">Login</button>
                    
                </form>
            </div>
                
            </div>
        )
    }
}

export default Login
