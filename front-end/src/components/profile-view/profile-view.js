import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import autoBind from '../../utils/autobind';
import * as profileActions from '../../actions/profile';
import * as dateParser from '../../utils/date-parser';

import './profile-view.scss';

class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false,
      language: undefined,
    };
    autoBind.call(this, ProfileView);
  }

  componentDidMount() {
    return this.props.fetchProfile();
  }

  handleEdit(e) {
    if (this.state.editing) {
      return this.setState({
        editing: false,
        language: undefined,
      });
    }
    return this.setState({
      editing: true,
      language: e.target.id,
    });
  }

  handleRemoveLanguage() {
    const { profile } = this.props;
    this.props.updateProfile(profile, { language: this.state.language });
    return this.setState({
      editing: false,
      language: undefined,
    });
  }

  render() {
    const { profile } = this.props;
    let profileJSX;
    
    if (profile) {
      const activeFor = dateParser.computeAge(profile.createdAt, 'account');

      // IRRELEVANT CODE - fixed on back end, here for development purposes
      // (bug creates multiple language entries for same language on table)
      // const uniqueLangs = new Set();
      // const langsFiltered = profile.languages.filter((lang) => {
      //   if (uniqueLangs.has(lang.language)) {
      //     return false;
      //   }
      //   uniqueLangs.add(lang.language);
      //   return true;
      // });
      // // ---------------------
      // langsFiltered.sort((a, b) => {
      //   return b.wordsAdded - a.wordsAdded;
      // });

      profileJSX = 
        <div>
          <div id="prof-intro">
            <h1>Welcome { profile.name }!</h1>
            <p>Account age: { activeFor }</p>
          </div>
          {
            profile.languages.length > 0 ?
              <div id="lang-list">
                <h3>Your languages</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Language</th>
                      <th>Began Studying on...</th>
                      <th>...for</th>
                      <th>Words Added</th>
                      <th>Score</th>
                      <th>Level Attained</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                  {
                    profile.languages.map((lang) => {
                      const formatDate = dateParser.formatLanguageAddedTime(lang.added);
                      const langAge = dateParser.computeAge(lang.added, 'lang');
                      return (
                        <tr key={ lang.language }>
                          <td>
                            { lang.language.charAt(0).toUpperCase() + lang.language.slice(1) }
                          </td>
                          <td>{ formatDate }</td>
                          <td>{ langAge }</td>
                          <td>{ lang.wordsAdded ? lang.wordsAdded : 0 }</td>
                          <td>
                          { 
                            lang.score[1] > 0 ? 
                              `${lang.score[0]}/${lang.score[1]}` : 0 
                          }
                          </td>
                          <td>{ lang.skillLevel ? lang.skillLevel : 'None' }</td>
                          <td>
                            <button 
                              id={ lang.language } 
                              onClick={ this.handleEdit }>X</button>
                          </td>
                        </tr>
                      );
                    })
                  }
                  </tbody>
                </table>
              </div>
              : null
          }
          {
            this.state.editing ? 
              <div id="modal">
                <div id="remove-modal">
                  <h4>Are you sure you want to remove this language from your list?</h4>
                  <p>Your progress will be lost, but all flashcards will still be accessible to everyone.</p>
                  <button onClick={ this.handleRemoveLanguage }>Remove</button>
                  <button onClick={ this.handleEdit }>Back</button>
                </div>
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
  updateProfile: (profile, lang) => dispatch(profileActions.updateProfileReq(profile, lang)),
});

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileView);
