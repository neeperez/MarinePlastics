import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// the authentication object is passed through props from App.js
// which is used to check if the user is currently logged in
// and to sign in (links in header depend on status)

class Submenu extends Component {
  render() {
    return (
    <ul className="nav__submenu">
    
        <li className="nav__submenu-item " ><Link to="/map">Map</Link></li>
        <li className="nav__submenu-item "><Link to="/protocol">Protocol</Link></li>

      </ul>
    )
  }
}
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAboutMenu: false
    };
  }

handleHover = () => {
    this.setState({ showAboutMenu: true });
  };
  
  handleLeave = () => {
    this.setState({ showAboutMenu: false });
  };
  
render() {
   return (
     <nav className="uk-navbar uk-navbar-container uk-navbar-transparent uk-margin-bottom-small">
       <div className="uk-navbar-left">
         <ul className="uk-navbar-nav">
           <li className="uk-logo">
             <Link to="/home" >
               <h1 className="uk-text-large uk-margin-remove-bottom">
                 Marine Plastics Monitor
               </h1>
             </Link>
           </li>
           { this.props.auth.isAuthenticated()
             ? <li><Link to='/chooseform'>Survey</Link></li>
             : null
           }
           <li><Link to="/map">Map</Link></li>
           <li><Link to="/protocol">Protocol</Link></li>
         <li
           className="nav__menu-item"
           onMouseLeave={this.handleLeave}
         >
           <a onMouseEnter={this.handleHover}>
             Menu</a>
           { this.state.showAboutMenu && <Submenu /> }
         </li>
         <div className="uk-navbar-right">
           <ul className="uk-navbar-nav">
             { this.props.auth.isAuthenticated() 
               ? <Link className="uk-button" to="/profile">Profile</Link>
               : null
             }
             { this.props.auth.isAuthenticated()
               ? <a onClick={ this.props.auth.logout } className="uk-button uk-button-primary">Log Out</a>
               : <a onClick={ this.props.auth.login } className="uk-button uk-button-primary">Log In</a>
             }
           </ul>
         </div>
         </ul>
       </div>
     </nav>
   )
 }
}

export default Menu