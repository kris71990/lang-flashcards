import React from 'react';
import PropTypes from 'prop-types';

import { languageNameCapitalizer } from '../../utils/lang-formatter';
import autoBind from '../../utils/autobind';

import './form-content.scss';

class FormContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: props.languageString ? 'add' : 'edit',
    };
    autoBind.call(this, FormContent);
  }

  render() {
    const { 
      language, languageString, baseLang, formState, handleChange, index,
    } = this.props;
    const { type } = this.state;
    const formattedLang = type === 'edit' ? languageNameCapitalizer(language.lang) : languageString;

    return (
      <div id="form-container">
        <div id="inputs">
          <div>
            <label>English:</label> 
            <input 
              type="text" 
              className="english" 
              name="wordEnglish"
              index={ type === 'add' ? index : null }
              value={ type === 'edit' ? formState.wordEnglish : this.state.value }
              placeholder="ex. boy"
              onChange={ handleChange }
            />
          </div>
          <div>
            <label>{ formattedLang }:</label> 
            <input 
              type="text" 
              className={ formattedLang }
              name="wordLocal"
              index={ type === 'add' ? index : null }
              value={ type === 'edit' ? formState.wordLocal : this.state.value }
              placeholder="ex. jongen"
              onChange={ handleChange }
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
              index={ type === 'add' ? index : null }
              value={ type === 'edit' ? formState.transliteration : this.state.value }
              placeholder="ex. ni hao"
              onChange={ handleChange }
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
              index={ type === 'add' ? index : null }
              value={ type === 'add' ? this.state.value : formState.typeOfWord }
              onChange={ handleChange }
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
              index={ type === 'add' ? index : null }
              value={ type === 'add' ? this.state.value : formState.categoryOfWord }
              onChange={ handleChange }
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
      </div>
    );
  }
}

FormContent.propTypes = {
  language: PropTypes.object,
  languageString: PropTypes.string,
  baseLang: PropTypes.object,
  formState: PropTypes.object,
  handleChange: PropTypes.func,
  index: PropTypes.number,
};

export default FormContent;
