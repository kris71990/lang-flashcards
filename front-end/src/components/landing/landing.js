import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import autoBind from '../../utils/autobind';
import * as languageActions from '../../actions/language';

// import * as routes from '../../utils/routes';

import './landing.scss';

const defaultState = {
  languageSelection: '',
};

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, Landing);
  }

  componentDidMount() {
    this.props.languagesFetch();
  }

  handleChange(e) {
    if (e.target) {
      this.setState({
        languageSelection: e.target.id,
      });
    } else {
      this.setState({
        languageSelection: '',
      });
    }
  }

  handleChoice() {
    if (this.state.languageSelection) {
      return this.props.setLanguage(this.state.languageSelection);
    }
    return this.props.setLanguage('');
  }

  render() {
    const { languageSelection } = this.state;
    const { languages } = this.props.language;

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
            {
              languages ?
                languages.map((choice) => {
                  return (
                    <div id={choice.languageName}
                    className={ languageSelection === choice.languageName ? `selected-${languageSelection}` : null } key={choice.languageId}>
                      { 
                        choice.languageName.charAt(0).toUpperCase() + choice.languageName.slice(1) 
                      }
                    </div>
                  );
                })
                : null
            }
          </section>
          <button onClick={ this.handleChoice }>Show Cards</button>
        </div>
      </section>
    );
  }
}

Landing.propTypes = {
  languageSelection: PropTypes.string,
  language: PropTypes.object,
  setLanguage: PropTypes.func,
  languagesFetch: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    language: state.language,
  };
};

const mapDispatchToProps = dispatch => ({
  languagesFetch: () => dispatch(languageActions.languagesFetchRequest()),
  setLanguage: lang => dispatch(languageActions.languageSelect(lang)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
