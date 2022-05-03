import React from 'react';
import classes from './auth.module.scss';

import Button from '../UI/button';
import Input from '../UI/input';
import {connect} from 'react-redux';
import {actionAuth} from '../../redux/actions/action-auth';


function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

class Auth extends React.Component {

  state = {
    isFormValid: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        label: 'Email',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        label: 'Password',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 6
        }
      }
    }
  };

  loginHandler = () => {
    const {email, password} = this.state.formControls;
    this.props.auth(email.value, password.value, true);
  };

  registerHandler = () => {
    const {email, password} = this.state;
    this.props.auth(email.value, password.value, false);
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  validateControl = (value, validation) => {
    if (!validation) {
      return true;
    }

    let isValid = true;

    if (validation.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (validation.email) {
      isValid = validateEmail(value) && isValid;
    }

    if (validation.minLength) {
      isValid = value.length >= validation.minLength && isValid;
    }

    return isValid;
  };

  onChangeHandler = (event, controlName) => {

    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({formControls, isFormValid});
  };

  renderInputs() {
    const {formControls} = this.state;

    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return <Input
        key={controlName + index}
        type={control.type}
        value={control.value}
        valid={control.valid}
        touched={control.touched}
        label={control.label}
        shouldValidate={!!control.validation}
        errorMessage={control.errorMessage}
        onChange={event => this.onChangeHandler(event, controlName)}
      />;
    });

  }

  render() {
    return <div className={classes.auth}>
      <div>
        <h1 className="">Вход</h1>
        <form className={classes.authForm} onSubmit={this.submitHandler}>
          {this.renderInputs()}
          <Button type="btn-dark" onClick={this.loginHandler} disabled={!this.state.isFormValid}>Войти</Button>
          <Button type="btn-dark" onClick={this.registerHandler} disabled={!this.state.isFormValid}>Зарегистрировать</Button>
        </form>
      </div>
    </div>;
  }
}

const mapDispatchToProps = (dispatch) => {

  return {
    auth: (email, password, isLogin) => dispatch(actionAuth(email, password, isLogin))
  };
};

export default connect(null, mapDispatchToProps)(Auth);
