import React from 'react';

import './footer.scss';

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <p><span>&copy;</span> { new Date().getFullYear() } - Kris</p>
      </footer>
    );
  }
}

export default Footer;
