import './MoviesCardList.css'
import MovieCard from '../MoviesCard/MoviesCard'
import Preloader from '../Preloader/Preloader'
import { useEffect, useState } from 'react'

function MoviesCardList ({ isLoading, ...props }) {
  const [movieAmount, setMovieAmount] = useState(() => {
    const width = window.innerWidth
    if (width > 500) {
      return 6
    } else if (width < 500) {
      return 5
    }
  })

  const [addMoreMovie] = useState(() => {
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
      <section className='MoviesCardList'>
        <div className='MoviesCardList__cardlist-container'>
          {renderMovie.map(movie => {
            return (
              <MovieCard
                key={props.isSavedMovies ? movie.movieId : movie.id}
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
            props.isSavedMovie ? 'MoviesCardList__more-button_hidden' : ''
          }`}
        >
          Еще
        </button>
      </section>
    </>
  )
}

export default MoviesCardList
