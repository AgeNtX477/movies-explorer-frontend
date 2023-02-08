import './MoviesCardList.css'
import MovieCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { useState } from 'react'

function MoviesCardList ({ isLoading, ...props }) {
  const [movieAmount, setMovieAmount] = useState(() => {
    const width = window.innerWidth
    if (width > 500) {
      return 6
    } else if (width < 500) {
      return 5
    }
  })

  const [addMoreMovie, setAddMoreMovies] = useState(() => {
    const width = window.innerWidth
    if (width > 500) {
      return 6
    } else if (width < 500) {
      return 5
    }
  })

  function handleAddMoreMovies () {
    setMovieAmount(movies => movies + addMoreMovie)
  }

  const renderMovie = props.movies.slice(0, movieAmount)

  return (
    <>
      {isLoading && <Preloader />}
      <span
        className={`MovieCardList__span ${
          !props.connectionError && `MovieCardList__span_disabled`
        }`}
      >
        Во время запроса произошла ошибка. Возможно, проблема с соединением или
        сервер недоступен. Подождите немного и попробуйте ещё раз
      </span>
      <span
        className={`MovieCardList__span ${
          !props.foundNotAny && `MovieCardList__span_disabled`
        }`}
      >
        Ничего не найдено
      </span>
      <section className='MoviesCardList'>
        <div className='MoviesCardList__cardlist-container'>
          {renderMovie.map(movie => {
            return (
              <MovieCard
                key={movie._id || movie.id}
                handleCardLike={props.handleCardLike}
                handleCardDislike={props.handleCardDislike}
                isSavedMovies={props.isSavedMovies}
                movie={movie}
              />
            )
          })}
        </div>
        <button
          onClick={handleAddMoreMovies}
          className={`MoviesCardList__more-button ${
            props.isSavedMovies ? 'MoviesCardList__more-button_hidden' : ''
          }`}
        >
          Еще
        </button>
      </section>
    </>
  )
}

export default MoviesCardList

/* key={props.isSavedMovies ? movie.movieId : movie.id} */
