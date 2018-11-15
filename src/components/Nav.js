import React from 'react';
import { Link } from 'react-router-dom'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class NavBar extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
		 const {auth} = this.props
  let displayStr = '';
	(this.props.auth && this.props.auth.length)?  displayStr = 'Logout' : displayStr = 'Login';

		
    return (
      <div>
        <Navbar color="info" light expand="md">
          <Link to="/dashboard" style={{ 	margin: "0 6px 1px 0",padding: ".5rem 0" }}  className="text-white nav-link" >Home</Link>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
					 { 
					   (auth && auth.length) &&
							(
								<Nav navbar>
									<NavItem>
										<Link to="/add"	className="text-white nav-link"><span role="img" aria-label="add">Add question</span></Link>
									</NavItem>
									
									<NavItem>
										<Link to="/profile"	className="text-white nav-link">Your Questions</Link>
									</NavItem>
									<NavItem>
										<Link to="/leaderboard"	className="text-white nav-link">Leaderboard</Link>
									</NavItem>
									
									
									<UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                 {
												(this.props.user && this.props.user.hasOwnProperty('name')) && (
													<span>
														<small>{this.props.user.name}</small>
														<img 
															style={{ margin:'0 10px',width:"10%"}} 
															src={ this.props.user.avatarURL }
															alt="profile"
														/>
													</span>
												)
											}		
                </DropdownToggle>
                <DropdownMenu right>
                 
                  <DropdownItem>
                    	<Link to="/profile"><small>My Profile</small></Link>
												
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem>
                   	<Link to="/logout"><small>{displayStr}</small></Link>
									</DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
									
									</Nav>
							)
					 }	
							
          </Collapse>
        </Navbar>
      </div>
    );
  }
}