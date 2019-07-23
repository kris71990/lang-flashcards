import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as authActions from '../../actions/auth';
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
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, Landing);
  }

  componentDidMount() {
    this.props.languagesFetch();
  }

  handleLogin(user) {
    return this.props.login(user)
      .then(() => {
        this.props.history.push(routes.ROOT_ROUTE);
      })
      .catch(console.error);
  }

  handleSignup(user) {
    console.log(user);
    return this.props.signup(user)
      .then(() => {
        this.props.history.push(routes.ROOT_ROUTE);
      })
      .catch(console.error);
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
    });
  }

  handleCreateLanguage(lang) {
    this.props.createLanguage(lang)
      .then(() => {
        console.log('language created'); // eslint-disable-line
      });
  }

  render() {
    const { toggleMenu } = this.state;
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
          <h2>Choose a language 
            <span>OR</span> 
            <span id="add-toggle" onClick={ this.handleToggle }>Add a new language</span>
            { toggleMenu ?
              <span id="hide" onClick={ this.handleToggle }>Hide Menu</span>
              : null
            }
          </h2>
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
      <div>
        <h2>Login</h2>
        <p>No account?</p>
        <Link to="/signup">Signup</Link>
        <AuthForm onComplete={ this.handleLogin } type="login"/>
      </div>;
    
    const signupJSX = 
      <div>
        <h2>Signup</h2>
        <p>Already have an account?</p>
        <Link to="/login">Login</Link>
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
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
    token: state.auth,
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
