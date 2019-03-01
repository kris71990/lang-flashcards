import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header/header';
import Landing from './landing/landing';
import Footer from './footer/footer';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <div className="wrapper">
            <Landing exact path="/" component={ Landing }/>
          </div>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
