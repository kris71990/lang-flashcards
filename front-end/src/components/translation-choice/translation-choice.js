import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

import './translation-choice.scss';

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
      this.props.setTransDir('');
      this.setState({
        translationDirection: '',
      });
    } else {
      this.props.setTransDir(e.target.id);
      this.setState({
        translationDirection: e.target.id,
      });
    }
  }

  render() {
    const { formattedLangSelection } = this.props;
    const { translationDirection } = this.state;

    return (
      <div id="translation-direction" onClick={ this.handleChange }>
        <button id="native-english" className={ translationDirection === 'native-english' ? 'selected' : null }>
          { formattedLangSelection } - English
        </button>
        <button id="english-native" className={ translationDirection === 'english-native' ? 'selected' : null }>
          English - { formattedLangSelection }
        </button>
      </div>
    );
  }
}

TranslationChoice.propTypes = {
  formattedLangSelection: PropTypes.string,
  setTransDir: PropTypes.func,
};

export default TranslationChoice;
