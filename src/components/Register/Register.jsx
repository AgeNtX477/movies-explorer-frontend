import './Register.css'
import { Link } from 'react-router-dom'
import { useValidation } from '../../hooks/useValidation'

function Register (props) {
  const { values, handleErrors, errors, isValid } = useValidation()

  function blockInput () {
    console.log('input blocked')
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.onRegister(values.name, values.email, values.password)
  }

  return (
    <main className='Register'>
      <h1 className='Register__title'>Добро пожаловать!</h1>
      <form
        className='Register__form'
        name='register-form'
        onSubmit={handleSubmit}
        noValidate
      >
        <label required className='Register__label'>
          Имя
        </label>
        <input
          required
          autoComplete='off'
          type='text'
          className='Register__input'
          onChange={!props.isLoading ? handleErrors : blockInput}
          name='name'
          minLength={2}
          maxLength={20}
          value={values.name || ''}
        ></input>
        <span required className='Register__span'>
          {errors.name}
        </span>

        <label required className='Register__label'>
          E-mail
        </label>
        <input
          type='email'
          autoComplete='off'
          required
          className='Register__input'
          onChange={!props.isLoading ? handleErrors : blockInput}
          name='email'
          value={values.email || ''}
        ></input>
        <span required className='Register__span'>
          {errors.email}
        </span>

        <label required className='Register__label'>
          Пароль
        </label>
        <input
          type='password'
          autoComplete='off'
          required
          className='Register__input'
          onChange={handleErrors}
          name='password'
          minLength={6}
          maxLength={30}
          value={values.password || ''}
        ></input>
        <span required className='Register__span'>
          {errors.password}
        </span>
        <span
          className={`Register__warning-span ${
            !props.authWarningMessage && `Register__warning-span_disabled`
          }`}
        >
          {' '}
          Что-то пошло не так! Проверьте корректность данных!
        </span>
        {!props.isLoading ? (
          <button
            type='submit'
            className={`Register__button ${
              !isValid ? `Register__button_disabled` : 'Register__button'
            }`}
            disabled={!isValid}
          >
            Зарегистрироваться
          </button>
        ) : (
          <button
            type='submit'
            className='Register__button Register__button_disabled'
            disabled={true}
          >
            Регистрация и вход...
          </button>
        )}
      </form>
      <h3 className='Register__toLogin'>
        Уже Зарегистрированы?
        <Link to='/signin' className='Register__toLogin-link'>
          Войти
        </Link>
      </h3>
    </main>
  )
}

export default Register
