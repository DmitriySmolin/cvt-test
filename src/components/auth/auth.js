import React from 'react';
import './auth.scss';
import {Navigate} from 'react-router-dom';
import Button from '../UI/button';
import Input from '../UI/input';
import {connect} from 'react-redux';
import {actionAuth} from '../../redux/actions/action-auth';
import Modal from '../UI/modal';


function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

class Auth extends React.Component {

  state = {
    isFormValid: false,
    remember: false,
    formControls: {
      email: {
        value: '',
        type: 'email',
        placeholder: 'Введите E-mail',
        errorMessage: 'Введите корректный email',
        valid: false,
        touched: false,
        required: true,
        pattern: '([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})',
        validation: {
          required: true,
          email: true
        }
      },
      password: {
        value: '',
        type: 'password',
        placeholder: 'Введите пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        required: true,
        validation: {
          required: true,
          minLength: 6
        }
      },
      checkbox: {
        type: 'checkbox',
        remember: false
      },
    }
  };

  loginHandler = () => {
    const {formControls: {email, password}, remember} = this.state;
    const {auth} = this.props;

    this.props.auth(email.value, password.value, true, remember);
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

    control.remember = event.target.checked;
    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach(name => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls, isFormValid, remember: event.target.checked
    });
  };


  renderInputs() {
    const {formControls} = this.state;

    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return <Input
        key={controlName + index}
        type={control.type}
        placeholder={control.placeholder}
        required={control.required}
        pattern={control.pattern}
        value={control.value}
        valid={control.valid}
        touched={control.touched}
        label={control.label}
        shouldValidate={!!control.validation}
        errorMessage={control.errorMessage}
        remeber={control.remember}
        onChange={event => this.onChangeHandler(event, controlName)}
      />;
    });

  }


  render() {
    const {isAuth, error} = this.props;
    return <React.Fragment>
      {isAuth ? <Navigate to="/"/>
        : <Modal>
          <form className="auth-form" onSubmit={this.submitHandler}>
            <div className="auth-form__title">Авторизация</div>
            {this.renderInputs()}
            <Button type="dark" onClick={this.loginHandler}>Войти</Button>
            {error?.message && <span className="error-message d-flex justify-content-center">{error.message}</span>}
          </form>
        </Modal>}
    </React.Fragment>;

  }
}


const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token,
    error: state.auth.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isLogin, remember) => dispatch(actionAuth(email, password, isLogin, remember))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
