import React from 'react';
import { Link } from 'react-router-dom';

function Register(props) {

  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  function handleEmailInput(event) {
    setEmail(event.target.value)
  }

  function handlePasswordInput(event) {
    setPassword(event.target.value)
  }

  function handleSubmit(event) {
    event.preventDefault();
    props.onRegister(email, password)
  }

  return (
    <section className="register">
      <h1 className="register__title">{props.title}</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="register__input" onChange={handleEmailInput} />
        <input type="password" placeholder="Пароль" className="register__input" onChange={handlePasswordInput} />
        <button type="submit" className="register__submit-button">{props.buttonText}</button>
      </form>
      <p className="register__text">Уже зарегистрированы? <Link to="/sign-in" className="register__link">Войти</Link></p>
    </section>
  )
}

export default Register;
