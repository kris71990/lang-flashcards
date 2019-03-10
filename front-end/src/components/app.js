import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Header from './header/header';
import Landing from './landing/landing';
import CardView from './card-view/card-view';
import WordForm from './word-form/word-form';
import Footer from './footer/footer';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <div className="wrapper">
            <Route exact path="/" component={ Landing }/>
            <Route exact path="/cards" component={ CardView }/>
            <Route exact path="/cards/add" component={ WordForm }/>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
