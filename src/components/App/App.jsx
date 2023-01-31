import './App.css'
import React from 'react'
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

function App () {
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
          <Movies />
          <Footer />
        </Route>
        <Route path='/saved-movies'>
          <Header />
          <SavedMovies />
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
