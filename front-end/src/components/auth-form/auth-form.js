import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

import './auth-form.scss';

const defaultState = {
  username: '',
  usernameDirty: false,
  usernameError: 'Username required',
  password: '',
  passwordDirty: false,
  passwordError: 'Password required',
  email: '',
  emailDirty: false,
  emailError: 'Email required',
  errorMsgDisplay: [],
};

const MIN_NAME_LENGTH = 4;
const MIN_PASSWORD_LENGTH = 6;

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = defaultState;
    autoBind.call(this, AuthForm);
  }

  handleValidation(name, value) {
    if (this.props.type === 'login') {
      return null;
    }

    switch (name) {
      case 'username':
        if (value.length < MIN_NAME_LENGTH) {
          return {
            error: `Username must be at least ${MIN_NAME_LENGTH} characters.`,
            dirty: true,
          };
        }
        return { error: null, dirty: false };
      case 'email':
        if (!value.includes('@')) {
          return { 
            error: 'Provide a valid email.',
            dirty: true,
          };
        }
        return { error: null, dirty: false };
      case 'password': 
        if (value.length < MIN_PASSWORD_LENGTH) {
          return { 
            error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`,
            dirty: true,
          };
        }
        return { error: null, dirty: false };
      default:
        return null;
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    const status = this.handleValidation(name, value);

    return this.setState({ 
      [name]: value,
      [`${name}Dirty`]: status.dirty,
      [`${name}Error`]: status.error,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { usernameError, passwordError, emailError } = this.state;

    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      return this.setState(defaultState);
    } 

    return this.handleConstructErrorMsg();
  }

  handleConstructErrorMsg() {
    const { usernameDirty, passwordDirty, emailDirty } = this.state;
    const errors = [
      usernameDirty ? this.state.usernameError : null,
      passwordDirty ? this.state.passwordError : null,
      emailDirty ? this.state.emailError : null,
    ];
    return this.setState({
      errorMsgDisplay: errors.filter(err => err),
    });
  }

  render() {
    const { type } = this.props;
    const { errorMsgDisplay } = this.state;

    return (
      <div id="form-container">
        <form className='auth-form' onSubmit={ this.handleSubmit }>
          <input
            name='username'
            placeholder='username'
            type='text'
            value={ this.state.username }
            onChange={ this.handleChange }
          />
          {
            type === 'signup' ? 
              <input
                name='email'
                placeholder='email'
                type='text'
                value={ this.state.email }
                onChange={ this.handleChange }
              />
              : null
          }
          <input
            name='password'
            placeholder='password'
            type='password'
            value={ this.state.password }
            onChange={ this.handleChange }
          />
          <button type="submit">{ type === 'login' ? 'Login' : 'Signup' }</button>
        </form>
        <div>
          {  
            errorMsgDisplay.map((err, i) => {
              return (
                <p key={ i }>{ err }</p>
              );
            })
          }
        </div>
      </div>
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
