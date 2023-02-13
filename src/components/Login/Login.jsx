import './Login.css'
import { Link } from 'react-router-dom'
import { useValidation } from '../../hooks/useValidation'

function Login (props) {
  const { values, handleErrors, errors, isValid } = useValidation()

  function blockInput() {
    console.log('input blocked')
  }

  function nandleSubmit (e) {
    e.preventDefault()
    props.onLogin(values.email, values.password)
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
          onChange={!props.isLoading ? handleErrors : blockInput}
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
          onChange={!props.isLoading ? handleErrors : blockInput}
        ></input>
        <span className='Login__span'>{errors.password}</span>
        <span
          className={`Login__warning-span ${
            !props.authWarningMessage && `Login__warning-span_disabled`
          }`}
        >
          {' '}
          Что-то пошло не так! Проверьте корректность данных!
        </span>
        {!props.isLoading ? (
          <button
            type='submit'
            className={`Login__button ${
              !isValid ? `Login__button_disabled` : 'Login__button'
            }`}
            disabled={!isValid}
          >
            Войти
          </button>
        ) : (
          <button
            type='submit'
            className='Login__button Login__button_disabled'
            disabled={true}
          >
            Вход в систему...
          </button>
        )}
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
