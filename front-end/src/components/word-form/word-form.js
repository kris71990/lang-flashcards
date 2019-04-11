import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as wordActions from '../../actions/words';
import * as routes from '../../utils/routes';

import './word-form.scss';

const defaultState = {
  wordEnglish: [],
  wordLocal: [],
  typeOfWord: [],
  categoryOfWord: [],
  totalFields: 1,
  wordError: 'Error',
  wordDirty: false,
  wordDirtyIndex: undefined,
};

class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, WordForm);
  }

  handleChange(e) {
    const { name } = e.target;
    let { value } = e.target;

    // select menu reassigned from value to default selection assigns value to null
    if (value === '') value = null;

    const i = e.target.attributes.index.value;
    const prevState = this.state[name].slice();
    prevState[i] = value;

    this.setState({
      [name]: prevState,
      wordDirty: false,
      wordDirtyIndex: undefined,
    });
  }

  // cannot create more than 10 words at a time
  handleAddField() {
    if (this.state.totalFields < 10) {
      this.setState({
        totalFields: this.state.totalFields + 1,
      });
    }
  }

  // cannot create fewer than 1 word for obvious reasons
  handleRemoveField() {
    if (this.state.totalFields > 1) {
      this.setState({
        totalFields: this.state.totalFields - 1,
      });
    }
  }

  // lots of error handling to insure creation data is valid before being sent to server, especially 
  // when creating in bulk.
  handleSubmit(e) {
    e.preventDefault();

    let { words } = this.props;
    const { 
      wordEnglish, wordLocal, typeOfWord, categoryOfWord, 
    } = this.state;

    if (!words.languageSelectionCode) words = JSON.parse(localStorage.getItem('words'));
    const languageSelectionCode = words.languageSelectionCode;

    // loop through word arrays and make sure no fields are null, break if error
    for (let i = 0; i < wordEnglish.length; i++) {
      if (!wordEnglish[i] || !wordLocal[i] || !typeOfWord[i] || !categoryOfWord[i]) {
        return this.setState({ 
          wordDirty: true,
          wordDirtyIndex: i,
        });
      }
    }

    // if no fields are null, check that there are data for multiple words, and that all data is filled out. If so, post in bulk and return to cards view
    if ((wordEnglish.length > 1 && wordLocal.length > 1 && categoryOfWord.length > 1 && typeOfWord > 1) 
      && (wordEnglish.length === wordLocal.length && wordLocal.length === categoryOfWord.length && categoryOfWord.length === typeOfWord.length)) {
      return this.props.bulkAddWords({
        wordsEnglish: this.state.wordEnglish,
        wordsLocal: this.state.wordLocal,
        wordTypes: this.state.typeOfWord,
        category: this.state.categoryOfWord,
        languageId: languageSelectionCode,
      })
        .then(() => {
          this.setState(defaultState);
          this.props.history.push(routes.CARDS_ROUTE);
        });
    } 
    
    // if data exists only for one word, post a single word and return to cards view
    if (wordEnglish.length === wordLocal.length && wordLocal.length === categoryOfWord.length && categoryOfWord.length === typeOfWord.length) {
      return this.props.addWord({
        wordEnglish: this.state.wordEnglish[0],
        wordLocal: this.state.wordLocal[0],
        typeOfWord: this.state.typeOfWord[0],
        category: this.state.categoryOfWord[0],
        languageId: languageSelectionCode,
      })
        .then(() => {
          this.setState(defaultState);
          this.props.history.push(routes.CARDS_ROUTE);
        });
    }
    return this.setState({ wordDirty: true });
  }

  render() {
    let { words } = this.props;

    // get words from local storage to keep app alive on page refresh
    if (!words.languageSelectionCode) words = JSON.parse(localStorage.getItem('words'));
    const languageSelection = words.languageSelection;
    const { totalFields } = this.state;
    let formattedLang;
    if (languageSelection) {
      formattedLang = `${languageSelection.charAt(0).toUpperCase()}${languageSelection.slice(1)}`;
    }

    return (
      <div id="vocab-container">
        <form id="vocab-form" onSubmit={ this.handleSubmit }>
          <fieldset>
            <legend>Add Vocabulary ({ formattedLang })</legend>
            {
              [...Array(totalFields)].map((e, i) => {
                return (
                  <div key={i}>
                    <label>English</label> 
                    <input 
                      type="text" 
                      className="english" 
                      name="wordEnglish"
                      index={`${i}`}
                      placeholder="ex. boy"
                      onChange={ this.handleChange }
                    />
                    <label>{ formattedLang }</label> 
                    <input 
                      type="text" 
                      className={ languageSelection }
                      name="wordLocal"
                      index={i}
                      placeholder="ex. jongen"
                      onChange={ this.handleChange }
                    />
                    <label>Part of Speech</label> 
                    <select
                      className="wordType-select"
                      name="typeOfWord"
                      index={i}
                      value={ this.state.value }
                      onChange={ this.handleChange }
                    >
                      <option value="">Select</option>
                      <option value="noun">Noun</option>
                      <option value="proper">Proper Noun</option>
                      <option value="verb">Verb</option>
                      <option value="pronoun">Pronoun</option>
                      <option value="adjective">Adjective</option>
                      <option value="other">Other</option>
                    </select>
                    <label>Category</label> 
                    <select
                      className="category-select"
                      name="categoryOfWord"
                      index={i}
                      value={ this.state.value }
                      onChange={ this.handleChange }
                    >
                      <option value="">Select</option>
                      <option value="greeting">Greeting</option>
                      <option value="object">Object</option>
                      <option value="cooking">Cooking</option>
                      <option value="outdoors">Outdoors</option>
                    </select>
                    <span>
                      { this.state.wordDirty && this.state.wordDirtyIndex === i 
                        ? this.state.wordError : null
                      }
                    </span>
                  </div>
                );
              })
            }
            <p>{ this.state.wordDirty && this.state.wordDirtyIndex === undefined ? this.state.wordError : null }</p>
          </fieldset>
          <button type="submit">Add { totalFields > 1 ? 'Words' : 'Word' }</button>
        </form>
        <button onClick={ this.handleAddField }>Add field</button>
        <button onClick={ this.handleRemoveField }>Remove field</button>
      </div>
    );
  }
}

WordForm.propTypes = {
  words: PropTypes.object,
  addWord: PropTypes.func,
  bulkAddWords: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    words: state.words,
  };
};

const mapDispatchToProps = dispatch => ({
  addWord: word => dispatch(wordActions.wordPostRequest(word)),
  bulkAddWords: words => dispatch(wordActions.wordsBulkPostRequest(words)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
