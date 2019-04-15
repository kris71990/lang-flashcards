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
      languageSelectionTransliteration,
      languageSelectionLocal,
    } = this.props.language;

    if (languageSelection && translationDirection) {
      return this.props.wordsFetch({ 
        languageSelection, translationDirection, languageSelectionCode, languageSelectionLocal, languageSelectionTransliteration,
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
        console.log('language created');
      });
  }

  render() {
    const { toggleMenu } = this.state;
    const { 
      languages, languageSelection, translationDirection, 
    } = this.props.language;

    let currentLangs;
    let formattedLangSelection;
    if (languages) currentLangs = languages.map(lang => lang.languageName);
    if (languageSelection) {
      formattedLangSelection = `${languageSelection.charAt(0).toUpperCase()}${languageSelection.slice(1)}`;
    }

    return (
      <section>
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
