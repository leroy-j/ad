import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addQuestionAction } from '../actions/shared'
import { Redirect } from 'react-router-dom'
import { Card, Button, CardHeader, CardBody, CardTitle } from 'reactstrap';
import Nav from './Nav'

//import CreateMeta from './CreateMeta'
 


class AddQuestion extends Component {
  constructor (props) {
    super(props)
    this.state = {
      redirect: false
    }
    this.submitHandler = this.submitHandler.bind(this)
  }

  submitHandler (e) {
    e.preventDefault()

    let optOne = e.target.optionOne.value
    let optTwo = e.target.optionTwo.value
    if(e.target[0].value !== '' && e.target[1].value !== ''){
      this.props.dispatch(addQuestionAction(this.props.auth, optOne, optTwo))
      this.setState({ redirect: true })
    }
    else
      alert("Please enter both the options");
    
  }

  render (){  
    if (this.props.auth === null) {
      return <Redirect to='/' />
    }
    if (this.state.redirect) {
      return <Redirect to='/dashboard' />
    }
     return(
      <div>
			<Nav auth={this.props.auth} user={this.props.user}/>
        <Card>
          <CardHeader><b>Create New Question</b></CardHeader>
          <CardBody>
            <CardTitle><small>Enter text for option A and option B</small></CardTitle>
              <form onSubmit={this.submitHandler} name="add-questions">
      		  <div className="container">
  			    <div className="row align-items-start mb-2">
    		      <div className="col">
							 
      			    <input 
                      className="form-control form-control-lg" 
                      placeholder="Option A" type="text" 
                      name="optionOne"
                      required
                     />
                  </div>
                </div>
      			
  		        <div className="row align-items-center">
                  <div className="col">
                    <input 
                      className="form-control form-control-lg" 
                      placeholder="Option B" 
                      type="text" 
                      name="optionTwo"
                      required
                     />
                  </div>
              </div>
              <div className="col">&nbsp;</div>
              <div className="row align-items-center">
                <div className="col">
                  <Button type="submit" className="btn btn-info btn-block" onClick={this.addQuestion}>
								    Submit
								  </Button>
                </div>
              </div>
           </div>
          </form>
        </CardBody>
      </Card>
    </div>
    )
  }
}

function mapStoreToComponent ({ auth,users }) {  
  let user;
  if (auth !== null) {
    user = users[auth]
  }
	
  return{
    auth,
		user
  }
}

export default connect(mapStoreToComponent)(AddQuestion)