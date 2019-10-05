import React from 'react';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';

import './edit-form.scss';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    const { word } = props;
    this.state = {
      wordEnglish: word.wordEnglish,
      wordLocal: word.wordLocal,
      transliteration: word.transliteration,
      typeOfWord: word.typeOfWord,
      categoryOfWord: word.category,
      wordDirty: false,
      wordError: 'Error',
    };
    autoBind.call(this, EditForm);
  }

  // handleValidation(name, value) {
  //   switch (name) {
  //     case 'wordEnglish':
  //       if (!wordEnglish) {
  //         return 'Error';
  //       }
  //       return null;
  //     default:
  //       return null;
  //   }
  // }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ 
      [name]: value,
      wordDirty: value ? false : true,
      wordError: value ? null : 'Error',
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const editedWord = { 
      wordId: this.props.word.wordId,
      wordEnglish: this.state.wordEnglish,
      wordLocal: this.state.wordLocal,
      transliteration: this.state.transliteration,
      typeOfWord: this.state.typeOfWord,
      category: this.state.categoryOfWord,
    };
    return this.props.onComplete(editedWord);
  }

  render() {
    const { lang, baseLang } = this.props;

    return (
      <div>
        <form onSubmit={ this.handleSubmit }>
          <fieldset>
            <legend>Edit Word</legend>
            <div>
              <div>
                <div>
                  <label>English:</label> 
                  <input 
                    type="text" 
                    className="english" 
                    name="wordEnglish"
                    value={ this.state.wordEnglish }
                    placeholder="ex. boy"
                    onChange={ this.handleChange }
                  />
                </div>
                <div>
                  <label>{ lang.lang }</label> 
                  <input 
                    type="text" 
                    className={ lang.lang }
                    name="wordLocal"
                    value={ this.state.wordLocal }
                    placeholder="ex. jongen"
                    onChange={ this.handleChange }
                  />
                </div>
              </div>
              { baseLang.languageSelectionTransliteration ?
                <div>
                  <label>Latinization:</label> 
                  <input 
                    type="text" 
                    className="transliteration" 
                    name="transliteration"
                    value={ this.state.transliteration }
                    placeholder="ex. ni hao"
                    onChange={ this.handleChange }
                  />
                </div>
                : null
              }
              <div id="dropdowns">
                <div>
                  <label>Part of Speech</label> 
                  <select
                    className="wordType-select"
                    name="typeOfWord"
                    value={ this.state.typeOfWord }
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
                </div>
                <div>
                  <label>Category</label> 
                  <select
                    className="category-select"
                    name="categoryOfWord"
                    value={ this.state.categoryOfWord }
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
                </div>
              </div>
              <span>{ this.state.wordDirty ? this.state.wordError : null }</span>
            </div>
          </fieldset>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

EditForm.propTypes = {
  word: PropTypes.object,
  lang: PropTypes.object,
  baseLang: PropTypes.object,
  onComplete: PropTypes.func,
};

export default EditForm;
