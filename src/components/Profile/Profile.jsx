import './Profile.css'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { useValidation } from '../../hooks/useValidation'
import { useContext, useRef, useState } from 'react'
import Header from '../Header/Header'

function Profile (props) {
  const { values, handleErrors, errors, isValid } = useValidation()
  const [сonflictErr, setConflictErr] = useState(false)

  const input = useRef()

  const currentUser = useContext(CurrentUserContext)

  function handleSubmit (e) {
    e.preventDefault()
    setConflictErr(false)
    if (values.name === currentUser.name || values.name === currentUser.name) {
      console.log('Нельзя отправить запрос, данные совпадают')
      setConflictErr(true)
      setTimeout(() => {
        setConflictErr(false)
      }, 3000)
    } else {
      e.preventDefault()
      props.onUpdateUser(
        values.name || currentUser.name,
        values.email || currentUser.email
      )
      setConflictErr(false)
    }
  }

  function blockInput () {
    console.log('input blocked')
  }

  return (
    <main>
      <Header />
      <main className='Profile'>
        <h1 className='Profile__title'>{`Привет, ${currentUser.name}!`}</h1>
        <form
          className='Profile__form'
          name='profile-form'
          onSubmit={handleSubmit}
          noValidate
        >
          <div className='Profile__input-box'>
            <label required className='Profile__label'>
              Имя
            </label>
            <input
              defaultValue={currentUser.name}
              required
              name='name'
              type='text'
              className='Profile__input'
              onChange={!props.isLoading ? handleErrors : blockInput}
              autoComplete='off'
              ref={input}
              minLength={2}
              maxLength={20}
            ></input>
            <span required className='Profile__span'>
              {errors.name}
            </span>
          </div>
          <div className='Profile__input-box'>
            <label required className='Profile__label'>
              E-mail
            </label>
            <input
              defaultValue={currentUser.email}
              type='email'
              required
              name='email'
              className='Profile__input'
              onChange={!props.isLoading ? handleErrors : blockInput}
              autoComplete='off'
              ref={input}
            ></input>
            <span required className='Profile__span'>
              {errors.email}
            </span>
          </div>
          <span
            className={`Profile__warning-span ${
              !props.authWarningMessage && `Profile__warning-span_disabled`
            }`}
          >
            {' '}
            Что-то пошло не так! Проверьте корректность данных!
          </span>
          <span
            className={`Profile__success-span ${
              !props.successMessage && `Profile__success-span_disabled`
            }`}
          >
            {' '}
            Данные профиля успешно обновлены!
          </span>
          <span
            className={`Profile__сonflictErr-span ${
              !сonflictErr && `Profile__сonflictErr-span_disabled`
            }`}
          >
            {' '}
            Нельзя изменить. Имя или email совпадают
          </span>
          {!props.isLoading ? (
            <button
              type='submit'
              className={`Profile__edit-button ${
                !isValid
                  ? `Profile__edit-button_disabled`
                  : 'Profile__edit-button'
              }`}
              disabled={!isValid}
            >
              Редактировать
            </button>
          ) : (
            <button
              type='submit'
              className='Profile__edit-button Profile__edit-button_disabled'
              disabled={true}
            >
              Редактирование...
            </button>
          )}
          <button
            type='button'
            className='Profile__logout'
            onClick={props.handleLogOut}
          >
            Выйти из аккаунта
          </button>
        </form>
      </main>
    </main>
  )
}

export default Profile
