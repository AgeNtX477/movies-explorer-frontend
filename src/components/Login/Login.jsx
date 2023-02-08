import './Login.css'
import { Link } from 'react-router-dom'
import { useValidation } from '../../hooks/useValidation'

function Login (props) {
  const { values, handleErrors, errors, isValid } = useValidation()

  function nandleSubmit (e) {
    e.preventDefault()
    props.onLogin(e, values.email, values.password)
  }
  return (
    <main className='Login'>
      <h1 className='Login__title'>Рады видеть!</h1>
      <form
        name='login-form'
        onSubmit={nandleSubmit}
        className='Login__form'
        noValidate
      >
        <label className='Login__label'>E-mail</label>
        <input
          required
          autoComplete='off'
          value={values.email || ''}
          type='email'
          name='email'
          className='Login__input'
          onChange={handleErrors}
        ></input>
        <span className='Login__span'>{errors.email}</span>

        <label className='Login__label'>Пароль</label>
        <input
          required
          type='password'
          autoComplete='off'
          value={values.password || ''}
          name='password'
          className='Login__input'
          onChange={handleErrors}
        ></input>
        <span className='Login__span'>{errors.password}</span>

        <button type='submit' className={`Login__button ${
            !isValid ? `Login__button_disabled` : ''
          }`}
          disabled={!isValid}>
          Войти
        </button>
      </form>
      <h3 className='Login__toRegister'>
        Еще не зарегистрированы?
        <Link to='/signup' className='Login__toRegister-link'>
          Регистрация
        </Link>
      </h3>
    </main>
  )
}

export default Login
