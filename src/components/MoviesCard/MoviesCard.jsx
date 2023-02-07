import './MoviesCard.css'
/* import moviePicture from '../../images/moviePicture.jpg' */
import { useState, useCallback, useEffect } from 'react'

function MovieCard (props) {
  const [isMovieLiked, setMovieLiked] = useState(false)

  const film = {
    country: props.movie.country || 'Не указано',
    director: props.movie.director || 'Не указано',
    duration: props.movie.duration || 0,
    year: props.movie.year || 'Не указано',
    description: props.movie.description || 'Не указано',
    image: 'https://api.nomoreparties.co/' + props.movie.image.url,
    trailerLink: props.movie.trailerLink,
    nameRU: props.movie.nameRU || 'Не указано',
    nameEN: props.movie.nameEN || 'Не указано',
    thumbnail: `https://api.nomoreparties.co${props.movie.image?.formats?.thumbnail?.url}`,
    movieId: props.movie.id
  }

  const changedTimeFormat = `${Math.trunc(film.duration / 60)}ч ${
    film.duration % 60
  }м`

  const likeButtonClassName = `MoviesCard__like-button ${
    isMovieLiked ? 'MoviesCard__like-button_type_active' : ''
  }`

  const isSavedMovie = useCallback(() => {
    if (localStorage.getItem('savedMovies')) {
      let savedMovies = JSON.parse(localStorage.getItem('savedMovies'))
      if (savedMovies.some(movie => movie.nameRU === props.movie.nameRU)) {
        setMovieLiked(true)
      }
    }
  }, [props.movie.nameRU])

  function handleDeleteMovie () {
    const savedMovies = JSON.parse(localStorage.getItem('savedMovies'))
    const card = savedMovies.find(movie => movie.nameRU === props.movie.nameRU)
    props.handleCardDislike(card._id)
    setMovieLiked(false)
  }

  function handleCardLike () {
    props.handleCardLike(film)
    setMovieLiked(true)
  }

  function handleCardDislike () {
    setMovieLiked(false)
    props.handleCardDislike(props.movie._id)
  }

  useEffect(() => {
    isSavedMovie()
  }, [isSavedMovie])

  return (
    <article className='MoviesCard'>
      <div className='MoviesCard__content'>
        <h2 className='MoviesCard__name'>{props.movie.nameRU}</h2>
        <p className='MoviesCard__duration'>{changedTimeFormat}</p>
        {props.isSavedMovies ? (
          <button
            onClick={handleCardDislike}
            className='MoviesCard__delete'
          ></button>
        ) : (
          <button
            onClick={!isMovieLiked ? handleCardLike : handleCardDislike}
            className={likeButtonClassName}
          ></button>
        )}
      </div>
      <img
        src={film.image}
        className='MoviesCard__img'
        alt={`Изобрадение ${props.movie.nameRU}`}
      ></img>
    </article>

    /*     <article className='MoviesCard'>
          <div className='MoviesCard__content'>
            <h2 className='MoviesCard__name'>{props.movie.nameRU}</h2>
            <p className='MoviesCard__duration'>{changedTimeFormat}</p>
            <button
              onClick={handleCardDislike}
              className='MoviesCard__delete'
            ></button>
          </div>
          <img
            src={props.movie.image}
            className='MoviesCard__img'
            alt='film_image'
          ></img>
        </article> */
  )
}

export default MovieCard
