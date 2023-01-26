import './Navigation.css'
import headerlogo from '../../../images/headerlogo.svg'
import accountlogo from '../../../images/accountlogo.svg'
import accountlogo2 from '../../../images/accountlogo2.svg'
import navbutton from '../../../images/navbuttonhidden.svg'
import closelogo from '../../../images/closelogo.svg'
import { Switch, Link, Route } from 'react-router-dom'
import { useState } from 'react'

function Navigation () {

const [isDropMenuOpen, setDropmenuOpen] = useState(false);

const DropMenuClass = `Navigation__dropdown-menu ${
  isDropMenuOpen ? 'Navigation__dropdown-menu_is-open' : ''
}`

function handleDropMenuToggle () {
  !isDropMenuOpen ? setDropmenuOpen(true) : setDropmenuOpen(false)
}


  return (
    <div className='Navigation'>
      <Switch>
        <Route exact path='/'>
          <Link className='Navigation__logo' to='/'>
            <img src={headerlogo} alt='Логотип' />
          </Link>
          <div>
            <Link className='Navigation__signup' to='/signup'>
              Регистрация
            </Link>
            <Link className='Navigation__signin' to='/signin'>
              Войти
            </Link>
          </div>
        </Route>
        <Route exact path='/signup'>
          <Link className='Navigation__logo Navigation__logo-auth' to='/'>
            <img src={headerlogo} alt='Логотип' />
          </Link>
        </Route>
        <Route exact path='/signin'>
          <Link className='Navigation__logo Navigation__logo-auth' to='/'>
            <img src={headerlogo} alt='Логотип' />
          </Link>
        </Route>
        <Route exact path='/profile'>
          <Link className='Navigation__logo' to='/'>
            <img src={headerlogo} alt='Логотип' />
          </Link>
          <div className='Navagation__nav-box'>
            <Link className='Navigation__movie' to='/movies'>
              Фильмы
            </Link>
            <Link className='Navigation__saved-movie' to='/saved-movies'>
              Сохраненные фильмы
            </Link>
            <Link className='Navigation__profile-link' to='/profile'>
              <div className='Navigation__profile-container'>
                <img className='Navigation__profile-logo1' src={accountlogo} alt='Логотип-Профиля' />
                <img className='Navigation__profile-logo2' src={accountlogo2} alt='Логотип-Профиля' />
                <p className='Navigation__profile-acc'>Аккаунт</p>
              </div>
            </Link>
          </div>
          <button onClick={handleDropMenuToggle} className='Navigation__nav-button'><img src={navbutton} alt='nav_image'></img></button>
        </Route>
        <Route exact path='/movies'>
          <Link className='Navigation__logo' to='/'>
            <img src={headerlogo} alt='Логотип' />
          </Link>
          <div className='Navagation__nav-box'>
            <Link className='Navigation__movie' to='/movies'>
              Фильмы
            </Link>
            <Link className='Navigation__saved-movie' to='/saved-movies'>
              Сохраненные фильмы
            </Link>
            <Link className='Navigation__profile-link' to='/profile'>
              <div className='Navigation__profile-container'>
                <img className='Navigation__profile-logo1' src={accountlogo} alt='Логотип-Профиля' />
                <img className='Navigation__profile-logo2' src={accountlogo2} alt='Логотип-Профиля' />
                <p className='Navigation__profile-acc'>Аккаунт</p>
              </div>
            </Link>
          </div>
          <button onClick={handleDropMenuToggle} className='Navigation__nav-button'><img src={navbutton} alt='nav_image'></img></button>
        </Route>
        <Route exact path='/saved-movies'>
          <Link className='Navigation__logo' to='/'>
            <img src={headerlogo} alt='Логотип' />
          </Link>
          <div className='Navagation__nav-box'>
            <Link className='Navigation__movie' to='/movies'>
              Фильмы
            </Link>
            <Link className='Navigation__saved-movie' to='/saved-movies'>
              Сохраненные фильмы
            </Link>
            <Link className='Navigation__profile-link' to='/profile'>
              <div className='Navigation__profile-container'>
                <img className='Navigation__profile-logo1' src={accountlogo} alt='Логотип-Профиля' />
                <img className='Navigation__profile-logo2' src={accountlogo2} alt='Логотип-Профиля' />
                <p className='Navigation__profile-acc'>Аккаунт</p>
              </div>
            </Link>
          </div>
          <button onClick={handleDropMenuToggle} className='Navigation__nav-button'><img src={navbutton} alt='nav_image' ></img></button>
        </Route>
      </Switch>
      <div className={DropMenuClass}>
        <div className='Navigation__dropdown-content'>
        <Link onClick={handleDropMenuToggle} to='/' className='Navigation__dropdown-link'>Главная</Link>
        <Link onClick={handleDropMenuToggle} to='/movies' className='Navigation__dropdown-link'>Фильмы</Link>
        <Link onClick={handleDropMenuToggle} to='/saved-movies' className='Navigation__dropdown-link'>Сохраненные фильмы</Link>
        <Link onClick={handleDropMenuToggle} className='Navigation__profile-link' to='/profile'>
          <button type='button'className='Navigation__dropdown-close'><img src={closelogo} alt='close_logo'></img></button>
              <div className='Navigation__profile-container Navigation__profile-container_place_dropdown'>
                <img className='Navigation__profile-logo1' src={accountlogo} alt='Логотип-Профиля' />
                <img className='Navigation__profile-logo2' src={accountlogo2} alt='Логотип-Профиля' />
                <p className='Navigation__profile-acc'>Аккаунт</p>
              </div>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Navigation
