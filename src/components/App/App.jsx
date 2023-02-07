import './App.css'
import React, { useState, useEffect, useLocation } from 'react'
import { Switch, Route } from 'react-router-dom'
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
  /* const location = useLocation(); */
  const [isLoading, setIsLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [savedMovies, setSavedMovies] = useState([])
  const [movieApi, setMovieApi] = useState([])
  const [isSwitched, setIsSwitched] = useState(false)

  function handleCardLike (movie) {
    // постановка лайка(добавление в сохраненные)
    mainApi
      .saveMovie(movie)
      .then(data => {
        const movies = [...savedMovies, data]
        setSavedMovies(movie => [...movie, data])
        localStorage.setItem('savedMovie', JSON.stringify(movies))
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
    setMovies([])
    if (movieApi.length === 0) {
      moviesApi
        .getBeatsMovies()
        .then(res => {
          setMovieApi(res)
          const searchResult = searchMovies(res, keyword)
          if (searchResult.length === 0) {
            setMovies([])
          } else {
            localStorage.setItem('movies', JSON.stringify(searchResult))
            setMovies(JSON.parse(localStorage.getItem('movies')))
          }
        })
        .catch(() => {
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
      } else if (searchResult.length !== 0) {
        localStorage.setItem('movies', JSON.stringify(searchResult))
        setMovies(JSON.parse(localStorage.getItem('movies')))
        setIsLoading(false)
      } else {
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

  /*   useEffect(() => {
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
  }, []) */

  return (
    <div className='page'>
      <Switch>
        <Route path='/signup'>
          <Header />
          <Register />
        </Route>
        <Route path='/signin'>
          <Header />
          <Login />
        </Route>
        <Route path='/profile'>
          <Header />
          <Profile />
        </Route>
        <Route exact path='/'>
          <Header />
          <Main />
          <Footer />
        </Route>
        <Route path='/movies'>
          <Header />
          <Movies
            isLoading={isLoading}
            movies={movies}
            handleCardLike={handleCardLike} // добавление в понравившиеся/лайк
            handleCardDislike={handleCardDislike} // удаление из понравившихся
            handleSearchMovie={handleSearchMovie} // поиск фильмов
            handleCheckboxSwitch={handleCheckboxSwitch} // свитч на короткие
            isSwitched={isSwitched} // состояние чек-бокса
          />
          <Footer />
        </Route>
        <Route path='/saved-movies'>
          <Header />
          <SavedMovies
            isLoading={isLoading}
            movies={savedMovies}
            handleSearchSavedMovie={handleSearchSavedMovie} // поиск понравившихся фильмов
            isSwitched={isSwitched} // состояние чек-бокса
            handleCheckboxSwitch={handleCheckboxSwitch} // свитч на короткие
            handleCardDislike={handleCardDislike} // удаление фильма из сохраненки
          />
          <Footer />
        </Route>
        <Route path='*'>
          <PageNotFound />
        </Route>
      </Switch>
    </div>
  )
}

export default App
