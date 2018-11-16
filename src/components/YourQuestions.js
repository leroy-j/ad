import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, CardHeader, CardBody } from 'reactstrap';
import Navbar from './Nav'
import { Redirect, withRouter,Link} from 'react-router-dom'
import { ucFirst } from '../utils/api'

class YourQuestions extends Component{  
  constructor(props){
    super(props)
    this.props = props
    this.state = {
      tab: 2
    };
		
    this.handleClick = this.handleClick.bind(this);
  }
  
	
  handleClick(tab){ 
    this.setState({
      tab: tab
    });
  }
	
  render(){ 
    const { user, auth, questions } = this.props
    if (auth === null) {
      return <Redirect to={{pathname: '/auth', state: {pathname: this.props.location.pathname}}}/>;
    }
    return (
      <div>
        <Navbar auth={auth} user={user}/>
	       <Card>
           <CardHeader><b>Your Questions</b></CardHeader>
           <CardBody>
            <div className="container user-profile">
	            <div className="row">
	 	           <div className="col-md-4">
		             <div className="profile-img">
		               <img src={ user.avatarURL ? user.avatarURL:"https://placeholdit.imgix.net/~text?txtsize=20&txt=User&w=128&h=130"  } alt="" />
		             </div>
		           </div>
		<div className="col-md-6">
		  <div className="profile-head">
		    <h5>
		      {user.name}
		    </h5>
		    <h6>
		      Game Contributer
		    </h6>    
		    <br />		
		    <ul className="nav nav-tabs" id="myTab" role="tablist">
		      <li className="nav-item pl-3 pr-3">
			<a className={ (this.state.tab === 1)? "nav-link active show" : "nav-link"} id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="false" onClick={() => this.handleClick(1)} >About</a>
		      </li>
		      <li className="nav-item pl-3 pr-3">
			<a className={ (this.state.tab === 2)?"nav-link active show":"nav-link"} id="contribution-tab" data-toggle="tab" href="#contribution" role="tab" aria-controls="contribution" aria-selected="true" onClick={() => this.handleClick(2)}>Your Contribution</a>
		      </li>
		    </ul>
		</div>
	      </div>		
	    </div>
	  <div className="row">
            <div className="col-md-4"></div>
	    <div className="col-md-8">
	      <div className="tab-content contribution-tab" id="myTabContent">
	        <div className={ (this.state.tab === 1)? "tab-pane fade show active" : "tab-pane"  } id="home" role="tabpanel" aria-labelledby="home-tab">
	         <div className="row">
	           <div className="col-md-6">
		     <label>User Id</label>
		   </div>
		  <div className="col-md-6">
		    <p>{user.id}</p>
		  </div>
	        </div>
	      <div className="row">
	        <div className="col-md-6">
	          <label>Name</label>
                </div>
	        <div className="col-md-6">
		  <p>{user.name}</p>
	        </div>
	      </div>						
	    </div>
	  <div className={ (this.state.tab === 2)? "tab-pane fade show active": "tab-pane"  } id="contribution" role="tabpanel" aria-labelledby="contribution-tab">
	  { 
	   questions.length? questions.map(question => (	
	    <div key={question.id} className="row" style={{borderTop:'1px solid #ccc',margin:"10px 0",padding:"15px 0"}}>
	       <div className="col-md-6">
		 <label>{ucFirst(question.optionOne.text) }</label>
		 <br />
		 <label>{ucFirst(question.optionTwo.text) }</label>
		</div>
		<div className="col-md-6">
		  <p><Link className="btn btn-info" to={`/questions/${question.id}`}>View Polls</Link></p>
		</div>
	      </div>
		)):
																
		(<div>
                   <h6><br />Add your own questions and make this game more interesting</h6><br /> 
  	 	   <Link to="/add"> Add Your questions</Link>
		 </div>
		)			
 	    }
	    </div>
          </div>
        </div>
      </div>
     </div>
    </CardBody>
  </Card>
 </div>)
 }

}

function mapStoreToComponent ({ auth, users, questions }) {
  let yourQuestions = []
  let user = users[auth]

  Object.keys(questions).map(k => questions[k]).filter(question => {
    if (user.questions.includes(question.id)) {
      yourQuestions.push(question)
    }
		return true;
  })

  return {
    auth,
    user,
    questions: yourQuestions
  }
}

export default withRouter(connect(mapStoreToComponent)(YourQuestions))
