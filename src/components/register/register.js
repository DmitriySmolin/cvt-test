import React from 'react';
import Button from '../UI/button';
import Input from '../UI/input';
import { connect } from 'react-redux';
import Modal from '../UI/modal';
import { actionRegister } from '../../redux/actions/action-register';

function validateEmail(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

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
        pattern: '([A-z0-9_.-]{1,})@([A-z0-9_.-]{1,}).([A-z]{2,8})',
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
        validation: {
          required: true,
          minLength: 6,
        },
      },
    },
  };

  registerHandler = () => {
    const {
      formControls: { email, password },
    } = this.state;
    if (email.value.trim() !== '' && password.value.trim() !== '') {
      this.props.register(email.value, password.value);
    }
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
    const formControls = { ...this.state.formControls };
    const control = { ...formControls[controlName] };

    control.value = event.target.value;
    control.touched = true;
    control.valid = this.validateControl(control.value, control.validation);

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

  renderInputs() {
    const { formControls } = this.state;

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
          onChange={(event) => this.onChangeHandler(event, controlName)}
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
