import './App.css'
import React, { useEffect, useState } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
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
  const [isLoading, setIsLoading] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [movieApi, setMovieApi] = useState([])
  const [isSwitched, setIsSwitched] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    _id: '',
    name: '',
    email: ''
  })
  const [connectionError, setConnectionError] = useState(false) // состояние отвечающее за вывод сообщение если потеряно соединение при поиске фильмов
  const [foundNotAny, setFoundNotAny] = useState(false) // состояние отвечающее за вывод сообщение если не найден ни один фильм

  function handleRegister (e, name, email, password) {
    // регистрация
    authApi
      .signUp(name, email, password)
      .then(data => {
        setCurrentUser({ ...data })
        setIsLoggedIn(true)
        history.push('/movies')
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей')
        }
      })
  }

  function handleLogin (e, email, password) {
    // логин
    authApi
      .signIn(email, password)
      .then(data => {
        setIsLoggedIn(true)
        setCurrentUser({ ...data })
        history.push('/movies')
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей')
        }
      })
  }

  function handleProfileUpdate (e, name, email) {
    // логин редактирование профиля
    mainApi
      .editProfile(name, email)
      .then(data => {
        setCurrentUser({...data})
      })
      .catch(err => {
        if (err.status === 400) {
          console.log('400 - некорректно заполнено одно из полей')
        }
      })
  }

  function handleLogOut () {
    setIsLoggedIn(false)
    setCurrentUser({
      _id: '',
      name: '',
      email: ''
    })
    setMovieApi([]);
    setMovies([]);
    setSavedMovies([]);
    localStorage.removeItem('jwt');
    localStorage.removeItem('savedMovies');
    localStorage.removeItem('movies');
    history.push('/');
  }

  useEffect(() => {
    // проверим токен при посещении сайта, если есть то redirect to /movies
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      authApi
        .checkToken(jwt)
        .then(res => {
          setIsLoggedIn(true)
          setCurrentUser({ ...res })
          history.push('/movies')
        })
        .catch(err => {
          if (err.status === 400) {
            console.log('400 — Токен не передан или передан не в том формате')
          } else if (err.status === 401) {
            console.log('401 — Переданный токен некорректен')
          }
        })
    }
  }, [history])

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
    // получение данных пользователя
    mainApi
      .getProfile()
      .then(data => {
        setCurrentUser({data})
      })
      .catch(err => console.log(err))
  }, [])

  useEffect(() => {
    // получение фильмов
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
  }, [isLoggedIn])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className='page'>
        <Switch>
          <Route path='/signup'>
            <Header />
            <Register onRegister={handleRegister} />
          </Route>
          <Route path='/signin'>
            <Header />
            <Login onLogin={handleLogin} />
          </Route>
          <ProtectedRoute
            path='/profile'
            isLoggedIn={isLoggedIn}
            component={Profile}
            onUpdateUser={handleProfileUpdate}
            handleLogOut={handleLogOut}
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
