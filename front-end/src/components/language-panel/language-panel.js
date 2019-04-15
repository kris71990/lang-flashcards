import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

import * as supportedLanguages from '../../utils/supported-langs';
import './language-panel.scss';

class LanguagePanel extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, LanguagePanel);
    this.state = {
      languageSelection: '',
      languageCode: null,
    };
  }

  handleChange(e) {
    if (e.currentTarget.id === e.target.id) {
      this.props.setLanguage('');
      this.setState({
        languageSelection: '',
        languageCode: null,
      });
    } else {
      const langData = e.target.id.split('-id:');
      const trans = supportedLanguages.supportedLanguages[langData[0]].transliteration;
      const { localName } = supportedLanguages.supportedLanguages[langData[0]];
      this.props.setLanguage({ 
        lang: langData[0], 
        id: langData[1], 
        transliteration: trans,
        localName, 
      });
      this.setState({
        languageSelection: langData[0],
        languageCode: langData[1],
      });
    }
  }

  render() {
    const { languages } = this.props;
    const { languageSelection } = this.state;
    const supportedLangs = supportedLanguages.supportedLanguages;

    return (
      <section id="langs" onClick={ this.handleChange }>
        {
          languages.map((choice) => {
            return (
              <div key={choice.languageId}>
                <div id={`${choice.languageName}-id:${choice.languageId}`}
                className={ languageSelection === choice.languageName ? `selected-${languageSelection}` : null }>
                  <h2>
                  { 
                    `${choice.languageName.charAt(0).toUpperCase()}${choice.languageName.slice(1)}`
                  }
                  </h2>
                  <h5>{ supportedLangs[choice.languageName].localName }</h5>
                </div>
                <span>{choice.wordCount}</span>
              </div>
            );
          })
        }
      </section>
    );
  }
}

LanguagePanel.propTypes = {
  languages: PropTypes.array,
  setLanguage: PropTypes.func,
};

export default LanguagePanel;
