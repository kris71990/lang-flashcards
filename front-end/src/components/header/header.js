import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import * as routes from '../../utils/routes';
import * as authActions from '../../actions/auth';
import './header.scss';

class Header extends React.Component {
  render() {
    const JSXLoggedOut = 
      <ul>
        <li><Link to={routes.ROOT_ROUTE}>Home</Link></li>
        <span> | </span>
        <li><Link to={routes.LOGIN_ROUTE}>Login / Signup</Link></li>
      </ul>;

    const JSXLoggedIn =
      <ul>
        <li><Link to={routes.ROOT_ROUTE}>Home</Link></li>
        <span> | </span>
        <li><Link to={routes.PROFILE_ROUTE}>Profile</Link></li>
        <span> | </span>
        <li><Link to={routes.ROOT_ROUTE} onClick={ this.props.logout }>Logout</Link></li>
      </ul>;

    return (
      <header className="header">
        <h1><Link to={routes.ROOT_ROUTE}><span>Flashcard Repo</span></Link></h1>
        <p><Link to={routes.ROOT_ROUTE}>Learn a new language</Link></p>
        <p><Link to={routes.ROOT_ROUTE}>Develop your knowledge</Link></p>
        <nav>
          { this.props.loggedIn ? JSXLoggedIn : JSXLoggedOut }
        </nav>
      </header>
    );
  }
}

Header.propTypes = {
  loggedIn: PropTypes.bool,
  logout: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedIn: !!state.auth,
});

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(authActions.logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
