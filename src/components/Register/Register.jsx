import './Register.css'
import { Link } from 'react-router-dom'

function Register () {
  return (
    <main className='Register'>
      <h1 className='Register__title'>Добро пожаловать!</h1>
      <form className='Register__form'>
        <label required className='Register__label'>
          Имя
        </label>
        <input required type='text' className='Register__input'></input>
        <span required className='Register__span'></span>
        <label required className='Register__label'>
          E-mail
        </label>
        <input type='email' required className='Register__input'></input>
        <span required className='Register__span'></span>
        <label required className='Register__label'>
          Пароль
        </label>
        <input type='password' required className='Register__input'></input>
        <span required className='Register__span'>
          Что-то пошло не так...
        </span>
        <button type='submit' className='Register__button'>
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
