import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './header/header';
import Landing from './landing/landing';
import CardsContainer from './cards-container/cards-container';
import Footer from './footer/footer';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <div className="wrapper">
            <Route exact path="/" component={ Landing }/>
            <Route path="/cards" component={ CardsContainer }/>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
