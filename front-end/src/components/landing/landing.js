import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as languageActions from '../../actions/language';
import * as wordActions from '../../actions/words';

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

  handleChoice() {
    const { 
      languageSelection, 
      languageSelectionCode, 
      translationDirection,
    } = this.props.language;

    if (languageSelection && translationDirection) {
      return this.props.wordsFetch({ languageSelection, translationDirection, languageSelectionCode })
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
        console.log('language created');
      });
  }

  render() {
    const { toggleMenu } = this.state;
    const { languages, languageSelection } = this.props.language;

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
  setTransDir: PropTypes.func,
  languagesFetch: PropTypes.func,
  wordsFetch: PropTypes.func,
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
  setTransDir: dir => dispatch(languageActions.languageTransDirSet(dir)),
  createLanguage: lang => dispatch(languageActions.languageCreateRequest(lang)),
  wordsFetch: lang => dispatch(wordActions.wordsFetchRequest(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
