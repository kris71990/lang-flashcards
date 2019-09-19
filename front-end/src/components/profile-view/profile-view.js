import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import autoBind from '../../utils/autobind';
import * as profileActions from '../../actions/profile';

import './profile-view.scss';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    autoBind.call(this, ProfileView);
  }

  componentDidMount() {
    return this.props.fetchProfile();
  }

  render() {
    const { profile } = this.props;
    let profileJSX;
    
    if (profile) {
      let activeFor;
      const now = new Date();
      const createdAt = new Date(profile.createdAt).getTime();
      const daysSinceCreation = (now - createdAt) / (1000 * 60 * 60 * 24);
      const days = Math.floor(daysSinceCreation);

      switch (true) {
        case daysSinceCreation < 1:
          if (daysSinceCreation * 24 < 1) {
            activeFor = 'less than one hour';
            break;
          } else {
            activeFor = 'less than one day';
          }
          break;
        case daysSinceCreation < 365:
          activeFor = `${days} days`;
          break;
        default: 
          const years = Math.round((days / 365) * 100) / 100;
          activeFor = `${days} (~ ${years} years)`;
      }

      profileJSX = 
        <div>
          <h1>Welcome { profile.name }!</h1>
          <p>Account age: { activeFor }</p>
        </div>;
    }

    return (
      <div id="profile-container">
        { profileJSX ? profileJSX : <p>Profile Not Found</p> }
      </div>
    );
  }
}

ProfileView.propTypes = {
  fetchProfile: PropTypes.func,
  updateProfile: PropTypes.func,
  profile: PropTypes.object,
};

const mapDispatchToProps = dispatch => ({
  fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  updateProfile: profile => dispatch(profileActions.updateProfileReq(profile)),
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
