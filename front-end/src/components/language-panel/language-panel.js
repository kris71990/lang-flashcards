import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

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
      this.props.setLanguage({ lang: langData[0], id: langData[1] });
      this.setState({
        languageSelection: langData[0],
        languageCode: langData[1],
      });
    }
  }

  render() {
    const { languages } = this.props;
    const { languageSelection } = this.state;

    return (
      <section id="langs" onClick={ this.handleChange }>
        {
          languages.map((choice) => {
            return (
              <div id={`${choice.languageName}-id:${choice.languageId}`}
              className={ languageSelection === choice.languageName ? `selected-${languageSelection}` : null } key={choice.languageId}>
                { 
                  choice.languageName.charAt(0).toUpperCase() + choice.languageName.slice(1) 
                }
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
