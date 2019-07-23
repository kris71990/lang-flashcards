import React from 'react';
import PropTypes from 'prop-types';
import autoBind from '../../utils/autobind';

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
          return `Your name must be at least ${MIN_NAME_LENGTH} characters long/`;
        }
        return null;
      case 'email':
        if (!value.includes('@')) {
          return 'You must provide a valid email.';
        }
        return null;
      case 'password': 
        if (value.length < MIN_PASSWORD_LENGTH) {
          return `Your password must be at least ${MIN_PASSWORD_LENGTH} characters long.`;
        }
        return null;
      default:
        return null;
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ 
      [name]: value,
      [`${name}Dirty`]: true,
      [`${name}Error`]: this.handleValidation(name, value),
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { usernameError, passwordError, emailError } = this.state;

    if (this.props.type === 'login' || (!usernameError && !passwordError && !emailError)) {
      this.props.onComplete(this.state);
      this.setState(defaultState);
    } else {
      this.setState({
        usernameDirty: true,
        emailDirty: true,
        passwordDirty: true,
      });
    }
  }

  render() {
    const { type } = this.props;

    return (
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
              type='email'
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
    );
  }
}

AuthForm.propTypes = {
  type: PropTypes.string,
  onComplete: PropTypes.func,
};

export default AuthForm;
