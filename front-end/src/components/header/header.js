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
        <li><Link to={routes.LOGIN_ROUTE}>Login / Signup</Link></li>
      </ul>;

    const JSXLoggedIn =
      <ul>
        <li><Link to={routes.ROOT_ROUTE}>Home</Link></li>
        <li><Link to={routes.PROFILE_ROUTE}>Profile</Link></li>
        <li><Link to={routes.ROOT_ROUTE} onClick={ this.props.logout }>Logout</Link></li>
      </ul>;

    return (
      <header className="header">
        <h1><Link to={routes.ROOT_ROUTE}>Language Learner</Link></h1>
        <p><Link to={routes.ROOT_ROUTE}>Learn a New Language Today!</Link></p>
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
