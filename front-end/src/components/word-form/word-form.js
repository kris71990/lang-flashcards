import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as wordActions from '../../actions/words';
import * as routes from '../../utils/routes';

const defaultState = {
  wordEnglish: [],
  wordLocal: [],
  totalFields: 1,
};

class WordForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, WordForm);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const i = e.target.attributes.index.value;
    const prevState = this.state[name].slice();
    prevState[i] = value;
    this.setState({
      [name]: prevState,
    });
  }

  handleAddField() {
    this.setState({
      totalFields: this.state.totalFields + 1,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.wordEnglish.length > 1 && this.state.wordLocal.length > 1) {
      return this.props.bulkAddWords({
        wordsEnglish: this.state.wordEnglish,
        wordsLocal: this.state.wordLocal,
        languageId: this.props.words.languageSelectionCode,
      })
        .then(() => {
          this.setState(defaultState);
          this.props.history.push(routes.CARDS_ROUTE);
        });
    } 
    return this.props.addWord({
      wordEnglish: this.state.wordEnglish[0],
      wordLocal: this.state.wordLocal[0],
      languageId: this.props.words.languageSelectionCode,
    })
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
            {
              [...Array(this.state.totalFields)].map((e, i) => {
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
                  </div>
                );
              })
            }
          </fieldset>
          <button type="submit">Add Words</button>
        </form>
        <button onClick={ this.handleAddField }>Add field</button>
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
