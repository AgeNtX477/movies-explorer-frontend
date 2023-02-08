import './Register.css'
import { Link } from 'react-router-dom'
import { useValidation } from '../../hooks/useValidation'

function Register (props) {
  const { values, handleErrors, errors, isValid } = useValidation()

  function handleSubmit (e) {
    e.preventDefault()
    props.onRegister(e, values.name, values.email, values.password)
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
          onChange={handleErrors}
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
          onChange={handleErrors}
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

        <button
          type='submit'
          className={`Register__button ${
            !isValid ? `Register__button_disabled` : 'Register__button'
          }`}
          disabled={!isValid}
        >
          Зарегистрироваться
        </button>
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
