import './Login.css'
import { Link } from 'react-router-dom'

function Login () {
  return (
    <main className='Login'>
      <h1 className='Login__title'>Рады видеть!</h1>
      <form className='Login__form'>
        <label required className='Login__label'>
          E-mail
        </label>
        <input required type='email' className='Login__input'></input>
        <span required className='Login__span'></span>
        <label required className='Login__label'>
          Пароль
        </label>
        <input type='password' required className='Login__input'></input>
        <span required className='Login__span'></span>
        <button type='submit' className='Login__button'>
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
