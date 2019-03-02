import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as languageActions from '../../actions/language';

import LanguageMenu from '../language-menu/language-menu';
// import * as routes from '../../utils/routes';

import './landing.scss';

const defaultState = {
  languageSelection: '',
  translationDirection: '',
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

  handleChange(e) {
    if (e.currentTarget.id === 'langs' && e.target.id === 'langs') {
      this.setState({
        languageSelection: '',
        translationDirection: '',
      });
    } else if (e.currentTarget.id === 'langs') {
      this.setState({
        languageSelection: e.target.id,
      });
    } else if (e.currentTarget.id === 'translation-direction' && e.target.id !== 'translation-direction') {
      this.setState({
        translationDirection: e.target.id,
      });
    } else {
      this.setState({
        translationDirection: '',
      });
    }
  }

  handleChoice() {
    if (this.state.languageSelection) {
      return this.props.setLanguage(this.state.languageSelection);
    }
    return this.props.setLanguage('');
  }

  handleToggle() {
    return this.setState({
      toggleMenu: !this.state.toggleMenu,
    });
  }

  handleTranslationDirection() {

  }

  handleCreateLanguage(lang) {
    this.props.createLanguage(lang)
      .then(() => {
        console.log('language created');
      });
  }

  render() {
    const { languageSelection, toggleMenu } = this.state;
    const { languages } = this.props.language;

    let currentLangs;
    let formattedLangSelection;
    if (languages) currentLangs = languages.map(lang => lang.languageName);
    if (languageSelection) {
      formattedLangSelection = `${languageSelection.charAt(0).toUpperCase()}${languageSelection.slice(1)}`;
    }

    return (
      <section>
        <div id="intro">
          <h4>
            Choose a language and your desired direction of translation to practice your vocabulary skills with these flashcards.
          </h4>
          <h4>Or, try and learn a new language!</h4>
        </div>
        <div id="lang-choices">
          <section>
            {
              languages ?
                <section id="langs" onClick={ this.handleChange }>
                  {
                    languages.map((choice) => {
                      return (
                        <div id={choice.languageName}
                        className={ languageSelection === choice.languageName ? `selected-${languageSelection}` : null } key={choice.languageId}>
                          { 
                            choice.languageName.charAt(0).toUpperCase() + choice.languageName.slice(1) 
                          }
                        </div>
                      );
                    })
                  }
                </section>
                : 
                <h2>Server not responding.</h2>
            }
          </section>
          { formattedLangSelection ? 
              <div id="translation-direction" onClick={ this.handleChange }>
                <button id="native-english">
                  { formattedLangSelection } - English
                </button>
                <button id="english-native">
                  English - { formattedLangSelection }
                </button>
              </div>
            : null
          }
          <div id="directives">
            <button onClick={ this.handleToggle }>
              { toggleMenu ?
                  <span>Hide</span>
                : <span>More...</span>
              }
            </button>
            { toggleMenu ? 
              <LanguageMenu 
                currentLangs={ currentLangs } 
                onComplete={ this.handleCreateLanguage }
              />
              : null
            }
            { languages ? 
              <button onClick={ this.handleChoice }>Show Cards</button> 
              : null
            }
          </div>
        </div>
      </section>
    );
  }
}

Landing.propTypes = {
  language: PropTypes.object,
  createLanguage: PropTypes.func,
  setLanguage: PropTypes.func,
  languagesFetch: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

const mapDispatchToProps = dispatch => ({
  languagesFetch: () => dispatch(languageActions.languagesFetchRequest()),
  setLanguage: lang => dispatch(languageActions.languageSelect(lang)),
  createLanguage: lang => dispatch(languageActions.languageCreateRequest(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
