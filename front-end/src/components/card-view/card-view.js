import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as routes from '../../utils/routes';

import * as wordActions from '../../actions/words';
import scoreParser from '../../utils/score-parser';
import * as indexOptions from '../../utils/card-randomizer';

import './card-view.scss';

class CardView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardNumber: 0,
      cardTracker: [],
      isCorrect: false,
      answer: false,
      hintCategory: false,
      hintType: false,
      hintTransliteration: false,
      score: [0, 0],
      color: 'black',
    };
    autoBind.call(this, CardView);
  }

  componentDidMount() {
    let { langData, baseLangData } = this.props;
    if (!langData.languageId) {
      langData = JSON.parse(localStorage.getItem('words'));
      baseLangData = JSON.parse(localStorage.getItem('language'));

      return this.props.wordsFetch({ 
        languageSelection: langData.languageSelection, 
        translationDirection: langData.translationDirection, 
        languageSelectionCode: langData.languageSelectionCode, 
        languageSelectionLocal: baseLangData.languageSelectionLocal,
        languageSelectionTransliteration: baseLangData.languageSelectionTransliteration,
        spokenIn: baseLangData.spokenIn,
        family: baseLangData.family,
        totalSpeakers: baseLangData.totalSpeakers,
      })
        .then(() => {
          console.log('Words retrieved'); // eslint-disable-line
          const indexArr = indexOptions.createShuffledIndexArray(langData.words.length);
          return this.setState({
            cardTracker: indexArr,
            cardNumber: indexArr[0],
          });
        });
    } 
    return null;
  }

  componentWillUnmount() {
    const { profile, langData } = this.props;
    return this.props.updateProfile(profile, langData.lang, null, this.state.score);
  }

  handleFormat(type) {
    let { langData } = this.props;
    const { languageSelectionLocal } = this.props.baseLangData;
    let formatLang;

    if (!langData.langId) {
      langData = JSON.parse(localStorage.getItem('words'));
      formatLang = `${langData.languageSelection.charAt(0).toUpperCase()}${langData.languageSelection.slice(1)}`;
    } else {
      formatLang = `${langData.lang.charAt(0).toUpperCase()}${langData.lang.slice(1)}`;
    }

    switch (type) {
      case 'language':
        if (!languageSelectionLocal) {
          return formatLang;
        }
        return `${formatLang} (${languageSelectionLocal})`;
      case 'language-simple':
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

  // cycle cards and update user score
  handleRandomCard() {
    const { 
      score, cardTracker, isCorrect, 
    } = this.state;
    const { words } = this.props.langData;
    const updatedScore = [...score];
    const indices = [...cardTracker];

    let updatedIndices = indexOptions.updateIndexArray(indices);
    if (updatedIndices.length === 0) {
      updatedIndices = indexOptions.createShuffledIndexArray(words.length);
    }
    
    if (isCorrect) {
      updatedScore[0] += 1;
      updatedScore[1] += 1;
    } else {
      updatedScore[1] += 1;
    }

    const updatedColor = scoreParser(updatedScore);

    return this.setState({
      cardTracker: updatedIndices,
      cardNumber: updatedIndices[0],
      isCorrect: false,
      score: updatedScore,
      answer: false,
      hintCategory: false,
      hintType: false,
      hintTransliteration: false,
      color: updatedColor,
    });
  }

  handleHideHint() {
    return this.setState({
      hintCategory: false,
      hintType: false,
      hintTransliteration: false,
    });
  }

  handleHint() {
    const { words } = this.props.langData;
    const { cardNumber } = this.state;
    const rand = Math.floor(Math.random() * 100 + 1);

    switch (rand % 4) {
      case 0:
        return this.setState({
          hintCategory: true,
          hintType: false,
          hintTransliteration: false,
        });
      case 1:
        return this.setState({
          hintType: true,
          hintCategory: false,
          hintTransliteration: false,
        });
      case 2:
        if (!words[cardNumber].transliteration) {
          return this.setState({
            hintType: false,
            hintCategory: false,
            hintTransliteration: false,
          });
        }
        return this.setState({
          hintType: false,
          hintCategory: false,
          hintTransliteration: true,
        });
      default:
        return this.setState({
          hintType: false,
          hintCategory: false,
          hintTransliteration: false,
        });
    }
  }

  handleFlipCard() {
    const flip = !this.state.answer;
    return this.setState({
      answer: flip,
    });
  }

  handleLoadForm() {
    return this.props.history.push(routes.CARD_FORM_ROUTE);
  }

  handleUpdateWord() {
    const word = this.props.langData.words[this.state.cardNumber];
    return this.props.wordUpdate(word);
  }

  handleChange(e) {
    const { name, checked } = e.target;

    return this.setState({
      [name]: checked,
    });
  }

  render() {
    let { langData, baseLangData } = this.props;
    const { score } = this.state;
    if (!langData.langId) langData = JSON.parse(localStorage.getItem('words'));
    if (!baseLangData.spokenIn) baseLangData = JSON.parse(localStorage.getItem('language'));
    
    const { 
      cardNumber, answer, hintType, hintCategory, hintTransliteration,
    } = this.state;
    let wordsToCards;
    let totalWords;

    if (langData && langData.words) {
      wordsToCards = langData.words;
      totalWords = wordsToCards.length;
    }

    let cardJSX;
    if (wordsToCards && wordsToCards.length > 0) {
      switch (langData.translationDirection) {
        case 'native-english':
          if (!answer) {
            cardJSX = <p>
              { wordsToCards[cardNumber].wordLocal }
              { hintType ? <span>({ wordsToCards[cardNumber].typeOfWord })</span> : null }
              { hintCategory ? <span>({ wordsToCards[cardNumber].category })</span> : null }
              { hintTransliteration ? 
                <span>({ wordsToCards[cardNumber].transliteration })</span> 
                : null 
              }
            </p>;
          } else {
            cardJSX = <p>{ wordsToCards[cardNumber].wordEnglish }</p>;
          }
          break;
        case 'english-native':
          if (!answer) {
            cardJSX = <p>{ wordsToCards[cardNumber].wordEnglish }</p>;
          } else {
            cardJSX = <p>
              { wordsToCards[cardNumber].wordLocal }
              { hintType ? <span>({ wordsToCards[cardNumber].typeOfWord })</span> : null }
              { hintCategory ? <span>({ wordsToCards[cardNumber].category })</span> : null }
              { hintTransliteration ? 
                <span>({ wordsToCards[cardNumber].transliteration })</span> 
                : null 
              }
            </p>;
          }
          break;
        default: 
          cardJSX = <p>Card Error</p>;
      }
    }

    return (
      <div>
        { wordsToCards && wordsToCards.length > 0 ?
          <div className="card-box">
            <h1>Your <span>{ this.handleFormat('language') }</span> flashcards ({ totalWords ? totalWords : '0'})</h1>
            <div className="subheader">
              <h3>{ this.handleFormat('trans') }</h3>
              <p>Current Score: 
                <span id={ this.state.color }> { `${score[0]}/${score[1]}` }</span>
              </p>
            </div>
            <div onClick={ this.handleFlipCard } id="card">
              { cardJSX }
            </div>
            { hintType || hintCategory || hintTransliteration ?
              <button onClick={ this.handleHideHint }>Hide Hint</button>
              : <button onClick={ this.handleHint }>Hint</button>
            }
            <button onClick={ this.handleRandomCard }>Next Card</button>
            <input 
              type="checkbox" name="isCorrect" 
              checked={ this.state.isCorrect }
              onChange={ this.handleChange }
            />
            <label htmlFor="isCorrect">Correct?</label>
            <div><button onClick={ this.handleUpdateWord }>Edit Word</button></div>
            <div><button onClick={ this.handleLoadForm }>Add Vocabulary</button></div>
          </div>
          : 
          <div className="card-box">
            <h2>There are currently no flashcards to study in { this.handleFormat('language') }.</h2>
            <h3>Add some words!</h3>
            <button onClick={ this.handleLoadForm }>Add Vocabulary</button>
          </div>
        }
        {
          baseLangData.languageSelection ? 
            <div className="lang-info-box">
              <img src={ require(`../../assets/${baseLangData.languageSelection}.png`)}></img>
              <h1>{ this.handleFormat('language-simple') } at a glance...</h1>
              <h3><span>Known locally as: </span>{ baseLangData.languageSelectionLocal }</h3>
              <p><span>Native Speakers: </span>{ baseLangData.totalSpeakers }</p>
              <p><span>Official Language in: </span> { baseLangData.spokenIn.join(', ') }</p>
              <p><span>Family: </span>{ baseLangData.family.join(' -> ')}</p>
            </div>
            : null
        }
      </div>
    );
  }
}

CardView.propTypes = {
  langData: PropTypes.object,
  baseLangData: PropTypes.object,
  history: PropTypes.object,
  wordsFetch: PropTypes.func,
  wordUpdate: PropTypes.func,
  profile: PropTypes.object,
  updateProfile: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  wordsFetch: lang => dispatch(wordActions.wordsFetchRequest(lang)),
  wordUpdate: word => dispatch(wordActions.wordsUpdate(word)),
});

const mapStateToProps = (state) => {
  return {
    langData: {
      lang: state.words.languageSelection,
      langId: state.words.languageSelectionCode,
      translationDirection: state.words.translationDirection,
      words: state.words.words,
    },
    baseLangData: state.language,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardView);
