import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import Nav from './Nav'
import Listresults from './Listresults'
import { handleAnswer } from '../actions/shared'


import {

  CardImg,

} from 'reactstrap';


//import InvalidQuestion from './InvalidQuestion'

class QuestionDetails extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: this.props.answer
    }
    this.toggle = this.toggle.bind(this)
  }

  toggle (id) {
    const { dispatch, auth, question } = this.props
    if (!this.state.answer) {
      if (id === 1) {
        dispatch(handleAnswer(auth, question.id, 'optionOne'))
        this.setState({ answer: 'optionOne' })
      } else {
        dispatch(handleAnswer(auth, question.id, 'optionTwo'))
        this.setState({ answer: 'optionTwo' })
      }
    }
  }

  render () {
    const { question, auth, user, users } = this.props;
		
		if(auth === null)
			return <Redirect to={{pathname: '/auth', state: {pathname: this.props.location.pathname}}}/>;
      
    if(!question)
    return <Redirect to='/invalidQuestion'/>;
    	
		const avatar = user.avatarURL === '' ? 'https://placeholdit.imgix.net/~text?txtsize=20&txt=User&w=128&h=130"' : users[question.author].avatarURL
 
    return (
      <div >
        <Nav auth={auth} user={user}/>
				
        { 
				question && (
					<div className="card app-margin">
						<div className="card-header"><b>{ users[question.author].name} Askes:</b></div>
						<div className="card-body">
							<div className="container">
								<div className="row">
									<div className="col-sm">
										<CardImg style={{width:"50%"}}
												top
												src={avatar}
												alt="Card image cap"
												/>
									</div>
									<div className="col-sm">
										<Listresults 
										  {...this.props}/>
									</div>
								</div>
							</div>
						</div>
					</div>)
				}
				
      </div>
    )
  }
}

function mapStoreToComponent ({ auth, questions, users }, { match }) {
  let question = questions[match.params.question_id],
      answer, qOnePerc, qTwoPerc, total,user;

  if (auth !== null) {
		user = users[auth];
		
    const answers = users[auth].answers
    if (question===undefined){
    return;
    }
    if (answers.hasOwnProperty(question.id)) {
      answer = answers[question.id]
    }

    total = question.optionOne.votes.length + question.optionTwo.votes.length
    qOnePerc = (question.optionOne.votes.length / total) * 100
    qTwoPerc = (question.optionTwo.votes.length / total) * 100
  }

  return {
    auth,
    question,
    answer,
    qOnePerc,
    qTwoPerc,
		user,
		users
  }
}

export default withRouter(connect(mapStoreToComponent)(QuestionDetails))