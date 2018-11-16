import React, { Component } from 'react'
import { Redirect, withRouter,Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserLogin } from '../actions/authedUser'
import { Button, Form, Card,CardBody,CardTitle,CardHeader } from 'reactstrap';

import Nav from './Nav' 

class Auth extends Component{
  constructor (props) {
    super(props)
    this.state = {
      login: false,
      redirect: false,
      userNotFound: false,
      usernameAlreadyTaken: false
    }
    this.handleLogin = this.handleLogin.bind(this)
  }

  handleLogin (e){
    e.preventDefault()
    const username = e.target[0].value
    let found = false
    const { users, dispatch } = this.props
    users.forEach(user => {
      if (user === username) {
        found = true
        dispatch(handleUserLogin(username))
        this.setState({ redirect: true })
      }
    })
    if (!found) {
      this.setState({ userNotFound: true })
    }
  }

  render (){ 
    const { 
		userNotFound } = this.state
    const { auth } = this.props
    const from = this.props.location.state || { pathname: '/dashboard' };
    if (auth != null) {
      return <Redirect to={from} />
    }

  
		
    return(  
      <div>
	<Nav auth={this.props}/>
        <div className="centered" style={{margin:"2% 5%"}}>
	  <Card>
	   <CardHeader><b>Sign In</b></CardHeader>
	   <CardBody>
	     <CardTitle><small>Enter username to login</small></CardTitle>
								<div>
									{ userNotFound && (
										<div style={{ color: "red", marginLeft: "20px" }}>Sorry, Username not found.</div>
									)}
									<Form onSubmit={this.handleLogin}>
										<div className="container">
											<div className="row align-items-start mb-2">
												<div className="col">
													<input 
														className="form-control form-control-lg" 
														type="text" 
														name="Username"
														placeholder="Enter Username"
														required
													/>
												</div>
											</div>
											<div className="row align-items-center">
												<div className="col">
													<Button type="submit" className="btn btn-info btn-block">
													Submit
												</Button>
											</div>
											</div>
										</div>
											<Link className="btn btn-link" to="/register"><small>Create Account</small></Link>
									</Form>
								</div>
						</CardBody>
					</Card>
        </div>
      </div>
    )
  }
}

function mapStoreToComponent ({ users, auth }) {
  const usersProp = Object.keys(users)
  return {
    users: usersProp,
    auth
  }
}

export default withRouter(connect(mapStoreToComponent)(Auth))
