import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Header from './header/header';
import Footer from './footer/footer';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header/>
          <Footer/>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
