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
    };
  }

  handleChange(e) {
    if (e.currentTarget.id === e.target.id) {
      this.props.setLanguage('');
      this.setState({
        languageSelection: '',
      });
    } else {
      this.props.setLanguage(e.target.id);
      this.setState({
        languageSelection: e.target.id,
      });
    }
  }

  render() {
    const { languages } = this.props;
    const { languageSelection } = this.state;

    return (
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
    );
  }
}

LanguagePanel.propTypes = {
  languages: PropTypes.array,
  setLanguage: PropTypes.func,
};

export default LanguagePanel;
