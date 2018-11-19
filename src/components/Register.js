import React, { Component } from 'react'
import { Redirect, withRouter,Link} from 'react-router-dom'
import { connect } from 'react-redux'
import { handleUserRegistration } from '../actions/shared'
import axios from 'axios'
import Nav from './Nav' 

import { Button, Form, Card,CardBody,CardTitle,CardHeader } from 'reactstrap';

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      login: false,
      redirect: false,
      usernameAlreadyTaken: false
    }
    this.handleRegistration = this.handleRegistration.bind(this)
  }

  handleRegistration (e) {
    e.preventDefault()
    const username = e.target[0].value
    const name = e.target[1].value
		const gender = e.target[2].value
    const { users, dispatch } = this.props
    users.forEach(user => {
      if (user === username) {
        this.setState({ usernameAlreadyTaken: true })
      }
    })
		
		
		axios.get('https://randomuser.me/api/?gender='+gender+'&incl=picture&exc=gender,login,location,cell,dob,email,name')
			.then(function (response){
				let image = response.data.results[0].picture.large || "";
				dispatch(handleUserRegistration(username, name,image))
			})
			.catch(function (error) {
				dispatch(handleUserRegistration(username, name,''))
			});
  }

  render () {  
    const { 
		//userNotFound, 
		usernameAlreadyTaken } = this.state
    const { auth } = this.props
    const from = this.props.location.state || { pathname: '/dashboard' };
    if (auth != null) {
      return <Redirect to={from} />
    }
		
    return (  
      <div>
			  <Nav auth={this.props}/>
        <div className="centered">
					<Card>
						<CardHeader><b>Register</b></CardHeader>
						<CardBody>
							<CardTitle><small>Enter username and name to register</small></CardTitle>
								<div>
									{ usernameAlreadyTaken && (
										<div style={{ color: "red", marginLeft: "20px" }}>Sorry, Username already taken.</div>
									)}
									<Form onSubmit={this.handleRegistration}>
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
											
											<div className="row align-items-start mb-2">
												<div className="col">
													<input 
														className="form-control form-control-lg" 
														type="text" 
														name="Username"
														placeholder="Enter Full name"
														required
													/>
												</div>
											</div>
											<div class="align-items-start mb-2">
     									  <select class="custom-select mr-3" name="gender"  style={{width: "30%"}}>
        								  <option selected>Gender</option>
        								  <option value="1">Male</option>
           								<option value="2">Female</option>
                       </select>
                     </div>
											
											<div className="row align-items-center">
												<div className="col">
													<Button type="submit" className="btn btn-info btn-block">
													Submit
												</Button>
											</div>
											</div>
										</div>
										<Link className="btn btn-link" to="/auth"><small>Login</small></Link>
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

export default withRouter(connect(mapStoreToComponent)(Register))
