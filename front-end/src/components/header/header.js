import React from 'react';
import { Link } from 'react-router-dom';

import * as routes from '../../utils/routes';
import './header.scss';

class Header extends React.Component {
  render() {
    return (
      <header className="header">
        <h1><Link to={routes.ROOT_ROUTE}>Language Learner</Link></h1>
        <p><Link to={routes.ROOT_ROUTE}>Learn a New Language Today!</Link></p>
        <nav>
          <ul>
            <li><Link to={routes.ROOT_ROUTE}>Home</Link></li>
            {/* <li><Link to={routes.CARDS_ROUTE}>Cards</Link></li> */}
            <li><a href="#">Profile</a></li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
