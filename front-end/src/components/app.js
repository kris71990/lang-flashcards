import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Header from './header/header';
import Landing from './landing/landing';
import CardsContainer from './cards-container/cards-container';
import ProfileView from './profile-view/profile-view';
import Footer from './footer/footer';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <div className="wrapper">
            <Route exact path="/" component={ Landing }/>
            <Route path="/login" component={ Landing }/>
            <Route path="/signup" component={ Landing }/>
            <Route path="/profile" component={ ProfileView }/>
            <Route path="/cards" component={ CardsContainer }/>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  loggedIn: PropTypes.bool,
};

const mapStateToProps = state => ({
  loggedIn: !!state.auth,
});

export default connect(mapStateToProps, null)(App);
