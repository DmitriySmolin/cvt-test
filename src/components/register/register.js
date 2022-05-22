import React from 'react';
import Button from '../UI/button';
import Input from '../UI/input';
import {connect} from 'react-redux';
import Modal from '../UI/modal';
import {actionRegister} from '../../redux/actions/action-register';
import {validateControl, validateEmail, validatePassword} from '../../helpers/helpers';

class Register extends React.Component {
  state = {
    isFormValid: false,
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
      confirm_password: {
        value: '',
        type: 'password',
        placeholder: 'Повторите пароль',
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
    },
  };

  registerHandler = () => {

    const email = this.state.formControls.email.value.trim();
    const password = this.state.formControls.password.value.trim();
    const confirm_password = this.state.formControls.confirm_password.value.trim();

    if (email === '' || password === '' || confirm_password === '') return false;

    if (password === confirm_password) {
    
      this.props.register(email, password);
    } else {
      alert('Пароли не совпадают. Повторите попытку.');
    }
  }

  submitHandler = (event) => {
    event.preventDefault();
  };

  onChangeHandler = (event, controlName) => {
    const formControls = {...this.state.formControls};
    const control = {...formControls[controlName]};

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

    if (controlName === 'confirm_password') {
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
          onChange={(event) => this.onChangeHandler(event, controlName)}
          onClick={(event) => this.onClickHandler(event, controlName)}
        />
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        <Modal>
          <form className="register-form" onSubmit={this.submitHandler}>
            <div className="register-form__title">Регистрация</div>
            {this.renderInputs()}
            <Button type="dark" onClick={this.registerHandler}>
              Зарегистрировать
            </Button>
            {this.props.error?.message && (
              <span className="error-message d-flex justify-content-center">{this.props.error.message}</span>
            )}
            {this.props.success && (
              <span className="success-message d-flex justify-content-center">Вы успешно зарегистрировались!</span>
            )}
          </form>
        </Modal>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    error: state.register.error,
    success: state.register.success,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    register: (email, password) => dispatch(actionRegister(email, password)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
