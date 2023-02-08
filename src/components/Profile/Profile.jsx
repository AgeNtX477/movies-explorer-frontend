import './Profile.css'
import { Link } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import { useValidation } from '../../hooks/useValidation'
import { useContext, useEffect, useState } from 'react'
import Header from '../Header/Header'

function Profile (props) {
 const { values, handleErrors, errors, isValid } = useValidation()

/*   const inputRef = useRef()

  const currentUser = useContext(CurrentUserContext)

  function onSubmit (e) {
    e.preventDefault()
    props.onUpdateUser(
      e,
      values.name || currentUser.name,
      values.email || currentUser.email
    )
  } */

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const currentUser = useContext(CurrentUserContext)


  function handleNameChange (e) {
    setName(e.target.value)
  }

  function handleEmailChange (e) {
    setEmail(e.target.value)
  }

  function handleSubmit (e) {
    e.preventDefault()
    props.onUpdateUser({
      name: name,
      email: email
    })
  }

  useEffect(() => {
    setName(currentUser.name)
    setEmail(currentUser.email)
  }, [currentUser])


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
              onChange={handleNameChange}
              autoComplete='off'
              /* ref={inputRef} */
              minLength={2}
              maxLength={20}
            ></input>
            <span required className='Profile__span'>
             
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
              onChange={handleEmailChange}
              autoComplete='off'
              /* ref={inputRef} */
            ></input>
            <span required className='Profile__span'>
            
            </span>
          </div>

          <button
            type='submit'
            className={`Profile__edit-button ${
              !isValid ? `Profile__edit-button_disabled` : ''
            }`}
            /* disabled={!isValid} */
          >
            Редактировать
          </button>
          <button type='button' className='Profile__logout' onClick={props.handleLogOut}>
            Выйти из аккаунта
          </button>
        </form>
      </main>
    </main>
  )
}

export default Profile
