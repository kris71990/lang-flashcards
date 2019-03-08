import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';

import './card-view.scss';

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: 0,
    };
    autoBind.call(this, CardView);
  }

  handleFormat(type) {
    const formatLang = `${this.props.langData.lang.charAt(0).toUpperCase()}${this.props.langData.lang.slice(1)}`;

    switch (type) {
      case 'language':
        return formatLang;
      case 'trans':
        switch (this.props.langData.translationDirection) {
          case 'native-english':
            return `${formatLang} - English`;
          default:
            return `English - ${formatLang}`;
        }
      default:
        return null;
    }
  }

  handleRandomCard() {
    const rand = Math.floor(Math.random() * this.props.words.length);
    this.setState({
      cardNumber: rand,
    });
  }

  render() {
    const { langData } = this.props;
    const { cardNumber } = this.state;
    let wordsToCards;
    let totalWords;

    if (langData && this.props.words) {
      wordsToCards = this.props.words;
      totalWords = wordsToCards.length;
    }

    return (
      <div>
        { wordsToCards ?
          <div id="card-container">
            <h1>Your <span>{ this.handleFormat('language') } </span> flashcards ({ totalWords ? totalWords : '0'})</h1>
            <h3>{ this.handleFormat('trans') }</h3>
            <div id="card">
              {
                langData.translationDirection === 'native-english' ?
                  <p>{ wordsToCards[cardNumber].wordLocal }</p>
                  : <p>{ wordsToCards[cardNumber].wordEnglish }</p>
              }
            </div>
            <button onClick={ this.handleRandomCard }>Next</button>
          </div>
          : <h1>fuck</h1>
        }
      </div>
    );
  }
}

CardView.propTypes = {
  words: PropTypes.array,
  langData: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    words: state.words.words,
    langData: {
      lang: state.words.languageSelection,
      langId: state.words.languageSelectionCode,
      translationDirection: state.words.translationDirection,
    },
  };
};

export default connect(mapStateToProps, null)(CardView);
