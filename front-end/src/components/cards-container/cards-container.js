import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as profileActions from '../../actions/profile';

import CardView from '../card-view/card-view';
import WordForm from '../word-form/word-form';

class CardContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    if (this.props.token) return this.props.fetchProfile();
    return null;
  }

  render() {
    const { profile, updateProfile } = this.props;
    return (
      <div className="card-container">
        <Route exact path={this.props.match.url} component={ CardView }/>
        <Route 
          path={`${this.props.match.url}/add`} 
          render={
            props => <WordForm {...props} profile={profile} updateProfile={updateProfile}/>
          }
        />
      </div>
    );
  }
}

CardContainer.propTypes = {
  match: PropTypes.object,
  profile: PropTypes.object,
  token: PropTypes.string,
  fetchProfile: PropTypes.func,
  updateProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    token: state.auth,
  };
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  updateProfile: (profile, lang, words) => dispatch(profileActions.updateProfileReq(profile, lang, words)),
});


export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
