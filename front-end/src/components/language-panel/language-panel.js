import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

import { supportedLanguages } from '../../utils/supported-langs';
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
    let parseId = e.target.id.split('-id:');
    const parseParentId = e.nativeEvent.target.parentNode.id.split('-id:');

    if ((!parseId[0] && !parseParentId[0]) || (parseId[0] === 'langs' || (parseParentId[0] === 'langs' && !parseId[0]))) {
      this.props.setLanguage('');
      this.setState({
        languageSelection: '',
        languageCode: null,
      });
    } else {
      if (!parseId[0]) parseId = parseParentId;
      const translit = supportedLanguages[parseId[0]].transliteration;
      const name = supportedLanguages[parseId[0]].localName;
      this.props.setLanguage({ 
        lang: parseId[0], 
        id: parseId[1], 
        transliteration: translit,
        localName: name, 
        spokenIn: supportedLanguages[parseId[0]].spokenIn,
        family: supportedLanguages[parseId[0]].family,
        totalSpeakers: supportedLanguages[parseId[0]].totalSpeakers,
      });
      this.setState({
        languageSelection: parseId[0],
        languageCode: parseId[1],
      });
    }
  }

  render() {
    let { languages } = this.props;
    languages = languages.sort((a, b) => b.wordCount - a.wordCount); 
    const { languageSelection } = this.state;

    return (
      <section id="langs" onClick={ this.handleChange }>
        {
          languages.map((choice) => {
            return (
              <div key={choice.languageId}>
                <div 
                  id={`${choice.languageName}-id:${choice.languageId}`}
                  className={ languageSelection === choice.languageName ? `selected-${languageSelection}` : null }
                >
                  <h2>
                  { 
                    `${choice.languageName.charAt(0).toUpperCase()}${choice.languageName.slice(1)}`
                  }
                  </h2>
                  <h5 className="local-name">{ supportedLanguages[choice.languageName].localName }</h5>
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
