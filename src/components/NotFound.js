import React from 'react';
import { Link,withRouter } from 'react-router-dom'
import { connect } from 'react-redux'


//Handler for urls entered by user that does not match a component
class NotFound extends React.Component {

  render(){   console.log(this.props)
    return (
      <div className="page404" style={{margin:"2% 5%",textAlign:"center"}}>
			
				<h1 style={{position: 'relative'}}>404</h1>
				<hr />
				<footer className="page-footer font-small blue-grey lighten-5">
					<div>
						<div className="container">
							<div className="row py-4 d-flex align-items-center">
								
								<div className="col-md-6 col-lg-7 text-center text-md-right">
									<a className="fb-ic">
										<i className="fa fa-facebook white-text mr-4"> </i>
									</a>
									
									<a className="tw-ic">
										<i className="fa fa-twitter white-text mr-4"> </i>
									</a>
									
									<a className="gplus-ic">
										<i className="fa fa-google-plus white-text mr-4"> </i>
									</a>
									
									<a className="li-ic">
										<i className="fa fa-linkedin white-text mr-4"> </i>
									</a>
								
									<a className="ins-ic">
										<i className="fa fa-instagram white-text"> </i>
									</a>
			
								</div>
							</div>
						</div>
					</div>
			
				
					<div className="container text-center text-md-left mt-5">
			
						<div className="row mt-3 dark-grey-text">
							<div className="col-md-8 col-lg-2 col-xl-2 mb-4">
								<h6 className="text-uppercase font-weight-bold">Useful links</h6>
								<Link className="link-options" to="/">Home</Link> &nbsp;&nbsp;
								<Link className="link-options" to="/Leaderboard">Leader Board</Link> &nbsp;&nbsp;
								<Link className="link-options" to="/question">Post a question</Link> &nbsp;&nbsp;
								<Link className="link-options" to="/auth">Sign In</Link>
							</div>
						</div>
					</div>
					
					<div className="footer-copyright text-center text-black-50 py-3 bg-info">© 2018 Copyright:
						<Link className="dark-grey-text text-white" to="/">&nbsp;&nbsp;WouldYou</Link>
					</div>
				</footer>
     </div>
		)
  }
}


function mapStoretoProps(store){

	return {
	  auth:store.auth
	}
}

export default withRouter(connect(mapStoretoProps)(NotFound))