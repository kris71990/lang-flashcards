import React from 'react';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';

import * as supportedLanguages from '../../utils/supported-langs';
import './language-menu.scss';

const defaultState = {
  selectedLanguage: null,
  localName: null,
  transliteration: null,
  spokenIn: null,
  family: null,
  totalSpeakers: null,
};

class LanguageMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, LanguageMenu);
  }

  handleChange(e) {
    const { 
      localName,
      transliteration,
      spokenIn,
      family,
      totalSpeakers,
    } = supportedLanguages.supportedLanguages[e.target.value];

    this.setState({
      selectedLanguage: e.target.value,
      transliteration,
      localName,
      spokenIn,
      family,
      totalSpeakers,
    });
  }

  handleAdd() {
    this.props.onComplete(this.state);
    this.setState(defaultState);
  }

  render() {
    const languageList = Object.keys(supportedLanguages.supportedLanguages);
    const { currentLangs } = this.props;
    const availableLangs = languageList.filter((lang) => {
      if (!currentLangs.includes(lang)) return lang;
      return null;
    });

    return (
      <div id="language-add">
        <select
          className="lang-select"
          value={ this.state.value }
          onChange={ this.handleChange }
        >
          <option value="empty">Select</option>
          {
            availableLangs ?
              availableLangs.map((lang) => {
                return (
                  <option name={lang} value={lang} key={lang}>
                    {
                      `${lang.charAt(0).toUpperCase()}${lang.slice(1)}`
                    }
                  </option>
                );
              })
              : null
          }
        </select>
        <button onClick={ this.handleAdd }>Add</button>
      </div>
    );
  }
}

LanguageMenu.propTypes = {
  currentLangs: PropTypes.array,
  onComplete: PropTypes.func,
};

export default LanguageMenu;
