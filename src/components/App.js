import React, { Component } from 'react'
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'

import Home from './Home'
import Auth from './Auth'
import Register from './Register'
import Dashboard from './Dashboard'
import QuestionDetails from './QuestionDetails'
import Logout from './Logout'
import AddQuestion from './AddQuestion'
import YourQuestions from './YourQuestions'
import Leaderboard from './Leaderboard'
import InvalidQuestion from './InvalidQuestion'
import NotFound from './NotFound'

class App extends Component {
	
	constructor(props){
		
		super(props)
		this.props = props
	}
	
  componentDidMount () { 
    this.props.dispatch(handleInitialData())
	}
  render(){  
	
	
	
	
    return (
      <div className="App">
			  <Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/auth' component={Auth} />
					<Route exact path='/register' component={Register} />
					<Route exact path='/dashboard' component={Dashboard} />
					<Route exact path='/questions/:question_id' component={QuestionDetails} />
					<Route exact path='/add' component={AddQuestion} />
					<Route exact path='/profile' component={YourQuestions} />
					<Route exact path='/leaderboard' component={Leaderboard} />
					<Route exact path='/logout' component={Logout} />
					<Route exact path='/invalidQuestion' component={InvalidQuestion} />
					
				</Switch>
      </div>
    )
  }
}

//Passing connect(null) ensures the App() component will not re-render each time the state changes
export default withRouter(connect(null)(App))
