import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as authActions from '../../actions/auth';
import * as profileActions from '../../actions/profile';
import * as languageActions from '../../actions/language';
import * as wordActions from '../../actions/words';

import AuthForm from '../auth-form/auth-form';
import LanguageMenu from '../language-menu/language-menu';
import LanguageChoicePanel from '../language-panel/language-panel';
import TranslationChoice from '../translation-choice/translation-choice';
import * as routes from '../../utils/routes';

import './landing.scss';

const defaultState = {
  toggleMenu: false,
  authError: false,
};

export class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, Landing);
  }

  componentDidMount() {
    if (this.props.token) this.props.fetchProfile();
    return this.props.languagesFetch();
  }

  handleLogin(user) {
    return this.props.login(user)
      .then(() => {
        this.props.fetchProfile();
        this.props.history.push(routes.ROOT_ROUTE);
      })
      .catch(console.error); // eslint-disable-line
  }

  handleSignup(user) {
    return this.props.signup(user)
      .then(() => {
        this.props.createProfile({ name: user.username });
        this.props.history.push(routes.ROOT_ROUTE);
      })
      .catch(console.error); // eslint-disable-line
  }

  handleChoice() {
    const { 
      languageSelection, 
      languageSelectionCode, 
      translationDirection,
      languageSelectionTransliteration,
      languageSelectionLocal,
      spokenIn,
      family,
      totalSpeakers,
    } = this.props.language;

    if (languageSelection && translationDirection) {
      return this.props.wordsFetch({ 
        languageSelection, translationDirection, languageSelectionCode, languageSelectionLocal, languageSelectionTransliteration, spokenIn, family, totalSpeakers,
      })
        .then(() => {
          this.props.history.push(routes.CARDS_ROUTE);
        });
    }

    return this.props.setLanguage();
  }

  handleToggle() {
    return this.setState({
      toggleMenu: !this.state.toggleMenu,
      authError: false,
    });
  }

  handleCreateLanguage(lang) {
    if (!this.props.token) {
      this.setState({
        authError: true,
        toggleMenu: false,
      });
      return null;
    }

    const { profile } = this.props;
    return this.props.createLanguage(lang)
      .then(() => {
        this.setState({
          authError: false,
          toggleMenu: false,
        });
        console.log('language created'); // eslint-disable-line
      })
      .then(() => {
        return this.props.updateProfile(profile, lang.selectedLanguage, null);
      });
  }

  render() {
    const { toggleMenu, authError } = this.state;
    const { location } = this.props;
    const { 
      languages, languageSelection, translationDirection, 
    } = this.props.language;

    let currentLangs;
    let formattedLangSelection;
    if (languages) currentLangs = languages.map(lang => lang.languageName);
    if (languageSelection) {
      formattedLangSelection = `${languageSelection.charAt(0).toUpperCase()}${languageSelection.slice(1)}`;
    }

    const defaultJSX = 
      <div>
        <div id="intro">
          <h3>Choose a language 
            <span>OR</span> 
            <span id="add-toggle" onClick={ this.handleToggle }>
              { toggleMenu ? 'Hide language menu' : 'Add a new language' }
            </span>
          </h3>
          { authError ? 
            <Link to={ routes.LOGIN_ROUTE }>
              Log in or sign up to add a language
            </Link>
            : undefined
          }
        </div>
        <div id="add-menu">
          { toggleMenu ? 
            <div>
              <LanguageMenu 
                currentLangs={ currentLangs } 
                onComplete={ this.handleCreateLanguage }
              />
            </div>
            : null
          }
        </div>
        <div id="lang-choices">
          { 
            languages ? 
              <LanguageChoicePanel 
                languages={ languages } 
                setLanguage={ this.props.setLanguage }/> 
              : <h2>Server not responding.</h2>
          }
          {
            formattedLangSelection ?
              <TranslationChoice
                formattedLangSelection={ formattedLangSelection }
                setTransDir={ this.props.setTransDir }
              />
              : null
          }
          <div id="show-cards">
            { languageSelection && translationDirection ? 
              <button onClick={ this.handleChoice }>Show Cards</button> 
              : null
            }
          </div>
        </div>
      </div>;
    
    const loginJSX = 
      <div className="auth-container">
        <h2>Login</h2>
        <p>No account? Signup <Link to="/signup">here</Link>!</p>
        <AuthForm onComplete={ this.handleLogin } type="login"/>
      </div>;
    
    const signupJSX = 
      <div className="auth-container">
        <h2>Signup</h2>
        <p>Already have an account? Login <Link to="/login">here</Link>!</p>
        <AuthForm onComplete={ this.handleSignup } type="signup"/>
      </div>;

    return (
      <section>
        { location.pathname === routes.ROOT_ROUTE ? defaultJSX : undefined }
        { location.pathname === routes.LOGIN_ROUTE ? loginJSX : undefined }
        { location.pathname === routes.SIGNUP_ROUTE ? signupJSX : undefined }
      </section>
    );
  }
}

Landing.propTypes = {
  language: PropTypes.object,
  createLanguage: PropTypes.func,
  setLanguage: PropTypes.func,
  setTransDir: PropTypes.func,
  languagesFetch: PropTypes.func,
  wordsFetch: PropTypes.func,
  location: PropTypes.object,
  history: PropTypes.object,
  signup: PropTypes.func,
  login: PropTypes.func,
  token: PropTypes.string,
  profile: PropTypes.object,
  fetchProfile: PropTypes.func,
  createProfile: PropTypes.func,
  updateProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
    token: state.auth,
    profile: state.profile,
  };
};

const mapDispatchToProps = dispatch => ({
  languagesFetch: () => dispatch(languageActions.languagesFetchRequest()),
  setLanguage: lang => dispatch(languageActions.languageSelect(lang)),
  setTransDir: dir => dispatch(languageActions.languageTransDirSet(dir)),
  createLanguage: lang => dispatch(languageActions.languageCreateRequest(lang)),
  wordsFetch: lang => dispatch(wordActions.wordsFetchRequest(lang)),
  signup: user => dispatch(authActions.signupRequest(user)),
  login: user => dispatch(authActions.loginRequest(user)),
  createProfile: username => dispatch(profileActions.createProfileReq(username)),
  fetchProfile: () => dispatch(profileActions.fetchProfileReq()),
  updateProfile: (profile, lang, words) => dispatch(profileActions.updateProfileReq(profile, lang, words)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
