import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import languageSelect from '../../actions/language';

import './landing.scss';

const defaultState = {
  language: '',
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, Landing);
  }

  handleChange(e) {
    if (e.target) {
      this.setState({
        language: e.target.id,
      });
    } else {
      this.setState({
        language: '',
      });
    }
  }

  handleChoice() {
    if (this.state.language) {
      return this.props.setLanguage(this.state.language); 
    }
    return this.props.setLanguage('');
  }

  render() {
    const { language } = this.state;

    return (
      <section>
        <div id="intro">
          <h4>
            Choose a language and your desired direction of translation to practice your vocabulary skills with these flashcards.
          </h4>
          <h4>Or, try and learn a new language!</h4>
        </div>
        <div id="lang-choices" onClick={ this.handleChange }>
          <section>
            <div id="dutch"
              className={ language === 'dutch' ? 'selected-dutch' : null }>Dutch
            </div>
            <div id="german"
              className={ language === 'german' ? 'selected-germ' : null }>German
            </div>
            <div id="french"
              className={ language === 'french' ? 'selected-fren' : null }>French
            </div>
          </section>
          <button onClick={ this.handleChoice }>Show Cards</button>
        </div>
      </section>
    );
  }
}

Landing.propTypes = {
  selected: PropTypes.string,
  setLanguage: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

const mapDispatchToProps = dispatch => ({
  setLanguage: lang => dispatch(languageSelect(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
