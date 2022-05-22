import React from 'react';
import {Navigate} from 'react-router-dom';
import Button from '../UI/button';
import Input from '../UI/input';
import {connect} from 'react-redux';
import {actionAuth} from '../../redux/actions/action-auth';
import Modal from '../UI/modal';
import {validateControl, validateEmail, validatePassword} from '../../helpers/helpers';

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
        title: 'E-mail должен быть определенного формата, длина не менее 6 и не более 50 символов',
        validation: {
          required: true,
          email: true,
        },
      },
      password: {
        value: '',
        type: 'password',
        placeholder: 'Введите пароль',
        errorMessage: 'Введите корректный пароль',
        valid: false,
        touched: false,
        required: true,
        title: 'Пароль должен содержать символы верхнего регистра (A-Z), нижнего регистра (a-z), и цифры (0-9), длина не менее 6 и не более 50 символов',
        validation: {
          required: true,
          password: true,
        },
        hidePassword: true,
        eye: true
      },
      checkbox: {
        type: 'checkbox',
        remember: false,
      },
    },
  };

  loginHandler = () => {
    const {formControls: {email, password}, remember,} = this.state;

    this.props.auth(email.value, password.value, true, remember);
  };

  submitHandler = (event) => {
    event.preventDefault();
  };

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    control.remember = event.target.checked;
    control.value = event.target.value;
    control.touched = true;
    control.valid = validateControl(control.value, control.validation);

    formControls[controlName] = control;

    let isFormValid = true;
    Object.keys(formControls).forEach((name) => {
      isFormValid = formControls[name].valid && isFormValid;
    });

    this.setState({
      formControls,
      isFormValid,
      remember: event.target.checked,
    });
  };

  onClickHandler = (event, controlName) => {

    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

    if (controlName === 'password') {
      control.type === 'text' ? control.type = 'password' : control.type = 'text';
      control.hidePassword = !control.hidePassword;
    }

    formControls[controlName] = control;

    this.setState({
      formControls,
    });
  };

  renderInputs() {
    const {formControls} = this.state;

    return Object.keys(formControls).map((controlName, index) => {
      const control = formControls[controlName];
      return (
        <Input
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
          hidePassword={control.hidePassword}
          eye={control.eye}
          remeber={control.remember}
          onChange={(event) => this.onChangeHandler(event, controlName)}
          onClick={(event) => this.onClickHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    const {isAuth, error} = this.props;
    return (
      <React.Fragment>
        {isAuth ? (
          <Navigate to="/"/>
        ) : (
          <Modal>
            <form className="auth-form" onSubmit={this.submitHandler}>
              <div className="auth-form__title">Авторизация</div>
              {this.renderInputs()}
              <Button type="dark" onClick={this.loginHandler}>
                Войти
              </Button>
              {error?.message && <span className="error-message d-flex justify-content-center">{error.message}</span>}
            </form>
          </Modal>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: !!state.auth.token,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, isLogin, remember) => dispatch(actionAuth(email, password, isLogin, remember)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
