import React, { Component } from 'react'

import Navbar from './Nav'
import { Redirect, withRouter} from 'react-router-dom'
import { connect } from 'react-redux'
import Question from './Question'
import { Link } from 'react-router-dom'

import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
	CardHeader,
  CardBody,
	CardFooter,
  Row,
  Col
} from 'reactstrap';

import classnames from 'classnames'


class Dashboard extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answeredQ: false,
			activeTab:'1'
    }
    this.toggle = this.toggle.bind(this)
		this.toggleTab = this.toggleTab.bind(this)
  }

  toggle () {
    if (this.state.answeredQ) {
      this.setState({ answeredQ: false })
    } else {
      this.setState({ answeredQ: true })
    }
    this.forceUpdate()
  }
	
	
	 toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
	

  render () { 
    const { answered, 
						unanswered, 
						auth, 
						user,
    				users,
						questions} = this.props
    if (auth === null) {
    return <Redirect to='/auth' />;
    }
		
		const players = Object.keys(users);
		const questionsAsked = Object.keys(questions);
		
    return (
      <div>
			
			  <Navbar auth={auth} user={user}/>
      <Card>
				<CardHeader><b>Welcome to Would You Rather</b></CardHeader>
				<CardBody>
				  <div className="row">
					<div className="col m-3">
						<Card >
							<CardHeader id="dashboard-players"  className="dashboard-header">Questions Asked <small className="right"> {questionsAsked!==undefined && questionsAsked.length  }    </small><br /><br /></CardHeader>
							<CardFooter>
						  <Link to="/leaderboard" style={{textDecoration: 'none'}}><small>Details </small><small className="right"> >></small></Link>
						</CardFooter>
						</Card>
				  </div>
					<div className="col m-3">
						<Card >
						<CardHeader id="dashboard-questions" className="dashboard-header">Players  <small className="right"> {players!==undefined && players.length  }    </small> <br /><br /></CardHeader>
						<CardFooter>
						  <Link to="/leaderboard" style={{textDecoration: 'none'}}><small>Details</small><small className="right"> >></small></Link>
						</CardFooter>
					</Card>
					 </div>
					<div className="col m-3">
						<Card >
						<CardHeader id="dashboard-answers"  className="dashboard-header">Game Results<br /><br /></CardHeader>
						<CardFooter>
						  <Link to="/leaderboard" style={{textDecoration: 'none'}} ><small>Details</small><small className="right"> >></small></Link>
						</CardFooter>
					</Card>
				 </div>
				
				</div>
				<Nav tabs>
          <NavItem style={{width:"49.5%"}}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggleTab('1'); }}
            >
              Unanswered questions
            </NavLink>
          </NavItem>
          <NavItem style={{width:"49.5%"}}>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggleTab('2'); }}
            >
              Your responses
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab} style={{margin:"10px"}}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <div>
									{unanswered && unanswered.map(question => (
										<Question question={question} key={question.id} />
									))}
								</div>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
             <div>
            
            { answered && answered.map(question => (
              <Question question={question} answered={true} key={question.id} />
            ))}
          </div>
            </Row>
          </TabPane>
        </TabContent>
				  </CardBody>
				</Card>
			 
      </div>
    )
  }
}

function mapStoreToComponent(store,propsFromwithRouter) { //mapStoreToComponent{ questions, users, auth })

  let user
  let answered = []
  let unanswered = []
  if (store.auth !== null) {
    user = store.users[store.auth]
  }
	
	
	if(user === undefined ) 
		return {
				answered: [],
				unanswered: [],
				auth:null,
				user:undefined
			}
			
	
	
  Object.keys(store.questions)
	.map((k) => store.questions[k])
	.filter((question) => { 
    if (user.answers.hasOwnProperty(question.id)) {
      answered.push(question)
    } else {
      unanswered.push(question)
    }
		return true
  })
	
	//New store props
  return {
    answered: answered.sort((a, b) => b.timestamp - a.timestamp),
    unanswered: unanswered.sort((a, b) => b.timestamp - a.timestamp),
    questions:store.questions,
		auth:store.auth,
		users: store.users,
    user
  }
}

//The Redux store available to connect() and is then passed to mapStoreToComponent
export default withRouter(connect(mapStoreToComponent)(Dashboard))