import React from 'react';
import PropTypes from 'prop-types';

import FormContent from '../form-content/form-content';
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
      <div className="form-container">
        <form onSubmit={ this.handleSubmit }>
          <fieldset>
            <legend>Edit Word</legend>
            <div>
              <FormContent 
                language={ lang }
                baseLang={ baseLang }
                formState={ this.state }
                handleChange={ this.handleChange }
              />
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
