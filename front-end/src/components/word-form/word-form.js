import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as wordActions from '../../actions/words';
// import * as profileActions from '../../actions/profile';
import * as routes from '../../utils/routes';

import './word-form.scss';

const defaultState = {
  wordEnglish: [],
  wordLocal: [],
  transliteration: [],
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

  componentDidMount() {
    let { words, language } = this.props;
    if (!words.languageSelectionCode) words = JSON.parse(localStorage.getItem('words'));
    if (!language.languageSelectionCode) language = JSON.parse(localStorage.getItem('language'));

    return this.props.wordsFetch({ 
      languageSelection: language.languageSelection, 
      translationDirection: language.translationDirection, 
      languageSelectionCode: language.languageSelectionCode, 
      languageSelectionLocal: language.languageSelectionLocal,
      languageSelectionTransliteration: language.languageSelectionTransliteration,
      spokenIn: language.spokenIn,
      family: language.family,
      totalSpeakers: language.totalSpeakers,
    })
      .then(() => {
        console.log('Words retrieved'); // eslint-disable-line
      });
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
      wordError: 'Error',
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
      wordEnglish, wordLocal, typeOfWord, categoryOfWord, wordDirty,
    } = this.state;

    if (!words.languageSelectionCode) words = JSON.parse(localStorage.getItem('words'));
    const languageSelectionCode = words.languageSelectionCode;
    const existingWords = words.words.map(word => word.wordLocal);

    // loop through word arrays and make sure no fields are null, break if error
    for (let i = 0; i < wordEnglish.length; i++) {
      if (existingWords.includes(wordLocal[i])) {
        return this.setState({
          wordDirty: true,
          wordError: 'Word Already Exists',
          wordDirtyIndex: i,
        });
      }
      if ((!wordEnglish[i] || !wordLocal[i] || !typeOfWord[i] || !categoryOfWord[i])) {
        return this.setState({ 
          wordDirty: true,
          wordDirtyIndex: i,
        });
      }
    }

    // if no fields are null, check that there are data for multiple words, and that all data is filled out. If so, post in bulk and return to cards view
    if ((wordDirty === false) && (wordEnglish.length > 1 && wordLocal.length > 1 && categoryOfWord.length > 1 && typeOfWord.length > 1) 
      && (wordEnglish.length === wordLocal.length && wordLocal.length === categoryOfWord.length && categoryOfWord.length === typeOfWord.length)) {
      return this.props.bulkAddWords({
        wordsEnglish: this.state.wordEnglish,
        wordsLocal: this.state.wordLocal,
        wordTypes: this.state.typeOfWord,
        category: this.state.categoryOfWord,
        transliteration: this.state.transliteration,
        languageId: languageSelectionCode,
      })
        .then(() => {
          this.props.updateProfile(this.props.profile, this.props.words.languageSelection, this.state.wordLocal.length);
          this.setState(defaultState);
          return this.props.history.push(routes.CARDS_ROUTE);
        });
    } 
    
    // if data exists only for one word, post a single word and return to cards view
    if ((wordDirty === false) && (wordEnglish.length === wordLocal.length && wordLocal.length === categoryOfWord.length && categoryOfWord.length === typeOfWord.length)) {
      return this.props.addWord({
        wordEnglish: this.state.wordEnglish[0],
        wordLocal: this.state.wordLocal[0],
        typeOfWord: this.state.typeOfWord[0],
        category: this.state.categoryOfWord[0],
        transliteration: this.state.transliteration[0],
        languageId: languageSelectionCode,
      })
        .then(() => {
          this.props.updateProfile(this.props.profile, this.props.words.languageSelection, 1);
          this.setState(defaultState);
          return this.props.history.push(routes.CARDS_ROUTE);
        });
    }
    return this.setState({ wordDirty: true });
  }

  render() {
    let { words, language } = this.props;

    // get words from local storage to keep app alive on page refresh
    if (!words.languageSelectionCode) words = JSON.parse(localStorage.getItem('words'));
    if (!language.languageSelectionCode) language = JSON.parse(localStorage.getItem('language'));
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
            <legend>Add Vocabulary ({ formattedLang ? formattedLang : null }) 
              <img src={ require(`../../assets/${words.languageSelection}.png`) }></img>
            </legend>
            {
              [...Array(totalFields)].map((e, i) => {
                return (
                  <div key={i}>
                    <label>English:</label> 
                    <input 
                      type="text" 
                      className="english" 
                      name="wordEnglish"
                      index={`${i}`}
                      placeholder="ex. boy"
                      onChange={ this.handleChange }
                    />
                    <label>{ formattedLang }:</label> 
                    <input 
                      type="text" 
                      className={ languageSelection }
                      name="wordLocal"
                      index={i}
                      placeholder="ex. jongen"
                      onChange={ this.handleChange }
                    />
                    { language.languageSelectionTransliteration ?
                      <div>
                        <label>Latinization:</label> 
                        <input 
                          type="text" 
                          className="transliteration" 
                          name="transliteration"
                          index={`${i}`}
                          placeholder="ex. ni hao"
                          onChange={ this.handleChange }
                        />
                      </div>
                      : null
                    }
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
                      <option value="pronoun">Pronoun</option>
                      <option value="proper noun">Proper Noun</option>
                      <option value="verb">Verb</option>
                      <option value="adjective">Adjective</option>
                      <option value="adverb">Adverb</option>
                      <option value="preposition">Preposition</option>
                      <option value="conjunction">Conjunction</option>
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
                      <option value="animal">Animal</option>
                      <option value="art">Art</option>
                      <option value="accomodation/housing">Accomodation/Housing</option>
                      <option value="body">Body Part</option>
                      <option value="color">Color</option>
                      <option value="education">Education</option>
                      <option value="food/cooking">Food/Cooking</option>
                      <option value="greeting">Greeting</option>
                      <option value="health">Health</option>
                      <option value="location">Location</option>
                      <option value="love">Love</option>
                      <option value="money">Money</option>
                      <option value="number">Number</option>
                      <option value="object">Object</option>
                      <option value="outdoors">Outdoors</option>
                      <option value="person">Person</option>
                      <option value="phrase">Phrase</option>
                      <option value="religion">Religion</option>
                      <option value="society/urban">Society/Urban Life</option>
                      <option value="sport">Sport</option>
                      <option value="time/date">Time/Date</option>
                      <option value="transportation">Transportation</option>
                      <option value="weather">Weather/Climate</option>
                      <option value="other">Other</option>
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
  language: PropTypes.object,
  profile: PropTypes.object,
  addWord: PropTypes.func,
  bulkAddWords: PropTypes.func,
  wordsFetch: PropTypes.func,
  history: PropTypes.object,
  updateProfile: PropTypes.func,
  fetchProfile: PropTypes.func,
};

const mapStateToProps = (state) => {
  return {
    words: state.words,
    language: state.language,
  };
};

const mapDispatchToProps = dispatch => ({
  addWord: word => dispatch(wordActions.wordPostRequest(word)),
  bulkAddWords: words => dispatch(wordActions.wordsBulkPostRequest(words)),
  wordsFetch: lang => dispatch(wordActions.wordsFetchRequest(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WordForm);
