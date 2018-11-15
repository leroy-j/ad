import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter} from 'react-router-dom'
import {
  Card, CardHeader, CardBody, CardText, CardImg} from 'reactstrap';

import Nav from './Nav'

const Leaderboard = (props) => { 
  const { auth, data } = props

  if (auth === null)
    return <Redirect to={{pathname: '/auth', state: {pathname: props.location.pathname}}}/>;
 
 
  return (
    <div style={{width:"2% 5%"}}>
      <Nav auth={props.auth} user={props.user}/>
			 <Card>
        <CardHeader><b>Leader Board</b></CardHeader>
        <CardBody>
			    <ul className="list-group">
			     { data.map((user, key) => (
			  
			  	  <li key={user.id} className="list-group-item list-group-item-default flex-column align-items-start">
			  	  	<div className="row">
			  	  		<div className="col-md-2">
									<CardImg style={{width:"80%"}}
										top
										src={ user.avatar === '' ? 'https://placeholdit.imgix.net/~text?txtsize=20&txt=User&w=128&h=130"' : user.avatar}
										alt="Card image cap"
									/>
								</div>
								<div className="col-md-6">
									<h5 className="mb-4">{user.name}</h5>
									<div className="col">
										<div>
												Answered Questions <span className="p-2">{user.answers}</span>
										</div>
										<hr />
										<div>
											Created Questions <span className="p-4">{user.questions}</span>
										</div>
									</div>
								</div>
								<div className="col-md-2">
									<Card>
										<CardHeader>Score</CardHeader>
										<CardBody>
											<CardText style={{ textAlign: 'center' }}>
												<b>{ parseInt(user.questions,10) + parseInt(user.answers,10)  }</b>
											</CardText>
										</CardBody>
									</Card>
								</div>
						  </div>
			  	  </li>)
			  	  ) 
			  	}
					</ul>
		    </CardBody>	
		  </Card>	
    </div>
  )
}

function mapStoreToComponent ({ auth, users }) {
  let user, data = []

	if (auth !== null) {
    user = users[auth]
  }
  Object.keys(users).forEach(userId => {
    data.push({
      id: userId,
      name: users[userId].name,
      avatar: users[userId].avatarURL,
      questions: users[userId].questions.length,
      answers: Object.keys(users[userId].answers).length
    })
  })

  data.sort(function (a, b) {
    return (b.questions + b.answers) - (a.questions + a.answers)
  })

  return {
    auth,
    data,
		user
  }
}

export default withRouter(connect(mapStoreToComponent)(Leaderboard))