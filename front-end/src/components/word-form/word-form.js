import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as wordActions from '../../actions/words';
import * as routes from '../../utils/routes';

const defaultState = {
  wordEnglish: '',
  wordLocal: '',
};

class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, WordForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    return this.props.addWord(this.state, this.props.words.languageSelectionCode)
      .then(() => {
        this.setState(defaultState);
        this.props.history.push(routes.CARDS_ROUTE);
      });
  }

  render() {
    const { languageSelection } = this.props.words;
    let formattedLang;
    if (languageSelection) {
      formattedLang = `${languageSelection.charAt(0).toUpperCase()}${languageSelection.slice(1)}`;
    }
    return (
      <div id="vocab-container">
        <form id="vocab-form" onSubmit={ this.handleSubmit }>
          <fieldset>
            <legend>Add Vocabulary ({ formattedLang })</legend>
            <div>
              <label>English</label> 
              <input 
                type="text" 
                className="english" 
                name="wordEnglish"
                placeholder="ex. boy"
                onChange={ this.handleChange }
              />
              <label>{ formattedLang }</label> 
              <input 
                type="text" 
                className={ languageSelection }
                name="wordLocal" 
                placeholder="ex. jongen"
                onChange={ this.handleChange }
              />
            </div>
            <div>
            </div>
          </fieldset>
          {/* <button onClick={ this.handleAddField }>Add field</button> */}
          <button type="submit">Add Words</button>
        </form>
      </div>
    );
  }
}

WordForm.propTypes = {
  words: PropTypes.object,
  addWord: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    words: state.words,
  };
};

const mapDispatchToProps = dispatch => ({
  addWord: (word, languageId) => dispatch(wordActions.wordPostRequest(word, languageId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
