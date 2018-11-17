import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswer } from '../actions/shared'
import { Link } from 'react-router-dom'

import { ucFirst } from '../utils/api'
import {Row,Col } from 'reactstrap'



class Question extends Component {
  constructor (props) {
    super(props)
    this.state = {
      answer: this.props.answer
    }
    this.changeOption = this.changeOption.bind(this)
  }

  changeOption (opt) {
    const { dispatch, auth, question } = this.props
    if (!this.state.answer) {
      if (opt === 1) {
        dispatch(handleAnswer(auth, question.id, 'optionOne'))
        this.setState({ answer: 'optionOne' })
      } else if (opt === 2) {
        dispatch(handleAnswer(auth, question.id, 'optionTwo'))
        this.setState({ answer: 'optionTwo' })
      }
    }
  }

  render () {
    const { question,answered } = this.props
  
    return (
		  <Row>
			 {
			  	(answered && answered === '1')?
			  	(
			  		<Col className="col-8 m-2">
			  			<div className="form-check form-check-inline">
			  				<div class="form-check">
			  					<input type="radio" class="form-check-input" id={question.id } onClick={() => this.changeOption(1)} />
			  					<label class="form-check-label" htmlFor={question.id }>{ucFirst(question.optionOne.text)}</label>
			  				</div>
			  				<div class="form-check">
			  					<input type="radio" class="form-check-input" id={question.id } onClick={() => this.changeOption(2)} />
			  					<label class="form-check-label" htmlFor={question.id }>{ucFirst(question.optionTwo.text)}</label>
			  				</div>
			  				<hr />
			  			</div>
			  		</Col>
			  	)
			  	:
			  	( 	
			  		<Col className="col-8 m-2">
			  			<div className="form-check">
			  				<label className="form-check-label">{ucFirst(question.optionOne.text)}</label>
                <label className="form-check-label">{ucFirst(question.optionTwo.text)}</label>
			  			</div>
			  		</Col>
			  	)
			  }
				
				<Col className="col-3">
					<Link className="btn btn-info" to={`/questions/${question.id}`}>View Polls</Link>
				</Col>
			</Row>
    )
  }
}

function mapStoreToComponent ({ auth }) {
 
  return {
    auth
  }
}

export default connect(mapStoreToComponent)(Question)
