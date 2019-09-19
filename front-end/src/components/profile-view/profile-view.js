import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import autoBind from '../../utils/autobind';
import * as profileActions from '../../actions/profile';
import computeAccountAge from '../../utils/account-age';

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
      const activeFor = computeAccountAge(profile.createdAt);

      profileJSX = 
        <div>
          <h1>Welcome { profile.name }!</h1>
          <p>Account age: { activeFor }</p>
          {
            profile.languages.length > 0 ?
              <div id="lang-list">
                <h3>Your languages</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Language</th>
                      <th>Words Added</th>
                      <th>Score</th>
                      <th>Level Attained</th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    profile.languages.map((lang) => {
                      return (
                        <tr key={ lang.language }>
                          <td>
                            { lang.language.charAt(0).toUpperCase() + lang.language.slice(1) }
                          </td>
                          <td>{ lang.wordsAdded ? lang.wordsAdded : 0 }</td>
                          <td>{ lang.score.length > 0 ? lang.score : 0 }</td>
                          <td>{ lang.skillLevel ? lang.skillLevel : 'None' }</td>
                        </tr>
                      );
                    })
                  }
                  </tbody>
                </table>
              </div>
              : null
          }
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
