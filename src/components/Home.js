import React from 'react'
import { Link } from 'react-router-dom'
import Nav from './Nav'

import {
	Card,
	CardTitle,
	CardText,
	CardHeader,
	CardBody
	
} from 'reactstrap'

const Home =(props)=>{
  return (
    <div>
			<Nav auth={props}/>
			<Card>
				<CardHeader>&nbsp;</CardHeader>
        <CardBody>
					<CardTitle>Welcome to Would You Rather</CardTitle>
					<CardText>Login or Register below to play the game.</CardText>
					<div className="menu-home">
						<Link className="btn btn-success" to="/auth">Login</Link>&nbsp;
						<Link className="btn btn-info" to="/register">Register</Link>
					</div>
				 </CardBody>	
      </Card>
    </div>  
  )
}

export default Home