import './Profile.css'
import { Link } from 'react-router-dom';

function Profile() {
    return (
        <main className='Profile'>
          <h1 className='Profile__title'>Привет, Юрий!</h1>
          <form className='Profile__form'>

            <div className='Profile__input-box'>
            <label required className='Profile__label'>
              Имя
            </label>
            <input required type='text' className='Profile__input'></input>
            <span required className='Profile__span'></span>
            </div>

            <div className='Profile__input-box'>
            <label required className='Profile__label'>
              E-mail
            </label>
            <input type='email' required className='Profile__input'></input>
            <span required className='Profile__span'></span>
            </div>

            <button type='button' className='Profile__edit-button'>
              Редактировать
            </button>
            <Link to='/signin' className='Profile__logout'>
              Выйти из аккаунта
            </Link>
          </form>
        </main>
      )
}

export default Profile;