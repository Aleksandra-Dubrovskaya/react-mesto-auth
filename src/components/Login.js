import React from 'react';

function Login(props) {

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
    props.onLogin(email, password)
  }

  return (
    <section className="register">
      <h1 className="register__title">{props.title}</h1>
      <form className="register__form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" className="register__input" value={email || ''} onChange={handleEmailInput} />
        <input type="password" placeholder="Пароль" className="register__input" value={password || ''} onChange={handlePasswordInput} />
        <button type="submit" className="register__submit-button">{props.buttonText}</button>
      </form>
    </section>
  )
}

export default Login;
