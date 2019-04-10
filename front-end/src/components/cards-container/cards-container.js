import React from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import CardView from '../card-view/card-view';
import WordForm from '../word-form/word-form';

class CardContainer extends React.Component {
  render() {
    return (
      <div className="card-container">
        <Route exact path={this.props.match.url} component={ CardView }/>
        <Route path={`${this.props.match.url}/add`} component={ WordForm }/>
      </div>
    );
  }
}

CardContainer.propTypes = {
  match: PropTypes.object,
};

export default CardContainer;
