import React from 'react';
import { ucFirst } from '../utils/api'


function Listresults(props){ 
  return (
   
    <ul className="list-group">
      <li className="list-group-item list-group-item-info flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h6 className="mb-1">{ucFirst(props.question.optionOne.text)}</h6>
					<small className="text-muted">
						{
							(props.question.optionOne.votes.length) ?
								(( props.question.optionOne.votes).includes(props.auth) )	&& ('My Vote')
								: ''
						}
					</small>
				</div>
				<div className="progress" style={{ height: '1.2rem' }}>
				<div
					className="progress-bar bg-success"
					role="progressbar"
					style={{ width: props.qOnePerc + '%' }}
					aria-valuenow="25"
					aria-valuemin="0"
					aria-valuemax="100"
				/></div>
				{ 
					  
					(props.question.optionOne.votes.length) ? (<span>{props.question.optionOne.votes.length} votes ( {parseInt(props.qOnePerc,10)}%)</span>): (<span> 0 votes</span>) 
				}
      </li>

      <li className="list-group-item list-group-item-default flex-column align-items-start">
        <div className="d-flex w-100 justify-content-between">
          <h6 className="mb-1">{ucFirst(props.question.optionTwo.text)}</h6>
					{
						(props.question.optionTwo.votes.length) ?
							(( props.question.optionTwo.votes).includes(props.auth) )	&& ('My Vote')
							: ''
					}
				</div>
        
        <div className="progress" style={{ height: '1.2rem' }}>
          <div
            className="progress-bar bg-success"
            role="progressbar"
            style={{ width: props.qTwoPerc+'%' }}
            aria-valuenow="25"
            aria-valuemin="0"
            aria-valuemax="100"
          />
        </div>
				<p className="mb-1">
					{ 
					  
					(props.question.optionTwo.votes.length) ? (<span>{props.question.optionTwo.votes.length} votes ( {parseInt(props.qTwoPerc,10)}%)</span>): (<span> 0 votes</span>) 
					}
				</p>
      </li>
    </ul>
   
  );
}
export default Listresults;