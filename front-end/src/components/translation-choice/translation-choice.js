import React from 'react';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';

class TranslationChoice extends React.Component {
  constructor(props) {
    super(props);
    autoBind.call(this, TranslationChoice);
    this.state = {
      translationDirection: '',
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
    const { formattedLangSelection } = this.props;
    const { translationDirection } = this.state;

    return (
      formattedLangSelection ? 
        <div id="translation-direction" onClick={ this.handleChange }>
          <button id="native-english" className={ translationDirection === 'native-english' ? 'selected' : null }>
            { formattedLangSelection } - English
          </button>
          <button id="english-native" className={ translationDirection === 'english-native' ? 'selected' : null }>
            English - { formattedLangSelection }
          </button>
        </div>
        : null

    );
  }
}

TranslationChoice.propTypes = {
  formattedLangSelection: PropTypes.string,
};

export default TranslationChoice;
