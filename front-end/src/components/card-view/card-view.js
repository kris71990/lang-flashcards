import React from 'react';
// import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';

class CardView extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, CardView);
  }

  render() {
    return (
      <h1>blah</h1>
    );
  }
}

export default CardView;
