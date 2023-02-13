import './App.css'
import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { CurrentUserContext } from '../../context/CurrentUserContext'
import ProtectedRoute from '../../protectedRoute/ProtectedRoute'
import Header from '../Header/Header'
import Register from '../Register/Register'
import Login from '../Login/Login'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Main from '../Main/Main'
import Footer from '../Footer/Footer'
import PageNotFound from '../PageNotFound/PageNotFound'
import authApi from '../../utils/AuthApi'
import mainApi from '../../utils/MainApi'
import moviesApi from '../../utils/MoviesApi'

function App () {
  const history = useHistory()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(true)
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [movieApi, setMovieApi] = useState([])
  const [isSwitched, setIsSwitched] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    name: '',
    email: '',
    _id: ''
  })
  const [connectionError, setConnectionError] = useState(false) // состояние отвечающее за вывод сообщение если потеряно соединение при поиске фильмов
  const [foundNotAny, setFoundNotAny] = useState(false) // состояние отвечающее за вывод сообщение если не найден ни один фильм
  const [successMessage, setCuccessMessage] = useState(false)
  const [authWarningMessage, setAuthWarningMessage] = useState(false) // состояние отвечающее за вывод сообщение если есть ошибки регистрации или логина

  function handleRegister (name, email, password) {
    // регистрация
    setIsLoading(true)
    setAuthWarningMessage(false)
    authApi
      .signUp(name, email, password)
      .then(() => {
        // после успешной регистрации сделаем автоматический логин
        authApi
          .signIn(email, password)
          .then(data => {
            localStorage.setItem('jwt', data.token)
            setIsLoggedIn(true)
            setCurrentUser({ ...data })
            history.push('/movies')
          })
          .catch(err => {
            if (err.status === 400) {
              console.log('400 - некорректно заполнено одно из полей')
            } else {
              setAuthWarningMessage(true)
              setIsLoading(false)
            }
          })
          .finally(() => {
            setIsLoading(false)
          })
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей')
        } else {
          setAuthWarningMessage(true)
          setIsLoading(false)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleLogin (email, password) {
    // логин
    setIsLoading(true)
    setAuthWarningMessage(false)
    authApi
      .signIn(email, password)
      .then(data => {
        localStorage.setItem('jwt', data.token)
        setIsLoggedIn(true)
        setCurrentUser({ ...data })
        history.push('/movies')
      })
      .catch(err => {
        setIsLoggedIn(false)
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей')
        } else {
          setAuthWarningMessage(true)
          setIsLoading(false)
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleProfileUpdate (name, email) {
    // логин редактирование профиля
    setCuccessMessage(false)
    setAuthWarningMessage(false)
    mainApi
      .editProfile(name, email)
      .then(data => {
        setCurrentUser({ ...data })
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей')
        } else {
          setAuthWarningMessage(true)
        }
      })
      .finally(() => {
        setCuccessMessage(true)
        setTimeout(() => {
          setCuccessMessage(false)
        }, 3500)
      })
  }

  function handleLogOut () {
    // выходи их приложения + удаление локальных данных
    setIsLoggedIn(false)
    setCurrentUser({
      _id: '',
      name: '',
      email: ''
    })
    setMovieApi([])
    setMovies([])
    setSavedMovies([])
    localStorage.removeItem('jwt')
    localStorage.removeItem('savedMovies')
    localStorage.removeItem('movies')
    history.push('/')
  }

  useEffect(() => {
    // проверим токен при повторном посещении сайта
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then(res => {
          setCurrentUser({ ...res })
        })
        .catch(err => {
          if (err.status === 400) {
            console.log('400 — Токен не передан или передан не в том формате')
          } else if (err.status === 401) {
            console.log('401 — Переданный токен некорректен')
          }
        })
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  function handleCardLike (movie) {
    // постановка лайка(добавление в сохраненные)
    mainApi
      .saveMovie(movie)
      .then(data => {
        const movies = [...savedMovies, data]
        setSavedMovies(movie => [...movie, data])
        localStorage.setItem('savedMovies', JSON.stringify(movies))
      })
      .catch(err => console.log(`Error: ${err}`))
  }

  function handleCardDislike (movieId) {
    // постановка лайка(добавление в сохраненные)
    mainApi
      .deleteMovie(movieId)
      .then(() => {
        const likedMovies = savedMovies.filter(item => {
          return item._id !== movieId
        })
        setSavedMovies(likedMovies)
        localStorage.setItem('savedMovies', JSON.stringify(likedMovies))
      })
      .catch(err => console.log(`Error: ${err}`))
  }

  function searchMovies (movies, keyword) {
    let foundMovies = []
    movies.forEach(data => {
      if (data.nameRU.indexOf(keyword) > -1) {
        if (isSwitched) {
          data.duration <= 40 && foundMovies.push(data)
        } else {
          foundMovies.push(data)
        }
      }
    })
    return foundMovies
  }

  function handleSearchMovie (keyword) {
    setIsLoading(true)
    setConnectionError(false)
    setFoundNotAny(false)
    setMovies([])
    if (movieApi.length === 0) {
      moviesApi
        .getBeatsMovies()
        .then(res => {
          setMovieApi(res)
          const searchResult = searchMovies(res, keyword)
          if (searchResult.length === 0) {
            setFoundNotAny(true)
            setMovies([])
          } else {
            localStorage.setItem('movies', JSON.stringify(searchResult))
            setMovies(JSON.parse(localStorage.getItem('movies')))
          }
        })
        .catch(() => {
          setConnectionError(true)
          setMovies([])
        })
        .finally(() => {
          setIsLoading(false)
        })
    } else {
      const searchResult = searchMovies(movieApi, keyword)
      if (searchResult.length === 0) {
        setMovies([])
        setIsLoading(false)
        setFoundNotAny(true)
      } else if (searchResult.length !== 0) {
        localStorage.setItem('movies', JSON.stringify(searchResult))
        setMovies(JSON.parse(localStorage.getItem('movies')))
        setIsLoading(false)
      } else {
        setConnectionError(true)
        setMovies([])
      }
    }
  }

  function handleSearchSavedMovie (keyword) {
    const movies = JSON.parse(localStorage.getItem('savedMovies'))
    const searchResult = searchMovies(movies, keyword)
    setSavedMovies(searchResult)
  }

  function handleCheckboxSwitch (e) {
    setIsSwitched(e.target.checked)
  }

  useEffect(() => {
    if (isLoggedIn) {
      // получение данных пользователя
      mainApi
        .getProfile()
        .then(data => {
          setCurrentUser({ ...data })
        })
        .catch(err => console.log(err))
    }
  }, [isLoggedIn])

  useEffect(() => {
    // получение фильмов
    if (isLoggedIn) {
      const movies = localStorage.getItem('movies')
      const savedMovies = localStorage.getItem('savedMovies')
      if (movies) {
        setMovies(JSON.parse(movies))
      }
      if (savedMovies) {
        setSavedMovies(JSON.parse(savedMovies))
      } else {
        mainApi
          .getMovies()
          .then(res => {
            setSavedMovies(res)
            localStorage.setItem('savedMovies', JSON.stringify(res))
          })
          .catch(err => console.log(err))
      }
    }
  }, [location, isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/signup'>
            <Header />
            <Register
              onRegister={handleRegister}
              authWarningMessage={authWarningMessage}
              isLoading={isLoading}
            />
          </Route>
          <Route path='/signin'>
            <Header />
            <Login
              onLogin={handleLogin}
              authWarningMessage={authWarningMessage}
              isLoading={isLoading}
            />
          </Route>
          <ProtectedRoute
            path='/profile'
            isLoggedIn={isLoggedIn}
            isLoading={isLoading}
            component={Profile}
            onUpdateUser={handleProfileUpdate}
            handleLogOut={handleLogOut}
            authWarningMessage={authWarningMessage}
            successMessage={successMessage}
          ></ProtectedRoute>
          <Route exact path='/'>
            <Header isLoggedIn={isLoggedIn} />
            <Main />
            <Footer />
          </Route>
          <ProtectedRoute
            path='/movies'
            isLoggedIn={isLoggedIn}
            component={Movies}
            isLoading={isLoading}
            movies={movies}
            handleCardLike={handleCardLike} // добавление в понравившиеся/лайк
            handleCardDislike={handleCardDislike} // удаление из понравившихся
            handleSearchMovie={handleSearchMovie} // поиск фильмов
            handleCheckboxSwitch={handleCheckboxSwitch} // свитч на короткие
            isSwitched={isSwitched} // состояние чек-бокса
            connectionError={connectionError}
            foundNotAny={foundNotAny}
          ></ProtectedRoute>
          <ProtectedRoute
            path='/saved-movies'
            isLoggedIn={isLoggedIn}
            component={SavedMovies}
            isLoading={isLoading}
            movies={savedMovies}
            handleSearchSavedMovie={handleSearchSavedMovie} // поиск понравившихся фильмов
            isSwitched={isSwitched} // состояние чек-бокса
            handleCheckboxSwitch={handleCheckboxSwitch} // свитч на короткие
            handleCardDislike={handleCardDislike} // удаление фильма из сохраненки
          ></ProtectedRoute>
          <Route path='*'>
            <PageNotFound />
          </Route>
        </Switch>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
