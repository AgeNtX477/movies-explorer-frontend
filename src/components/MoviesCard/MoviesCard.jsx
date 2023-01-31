import './MoviesCard.css'
import moviePicture from '../../images/moviePicture.jpg'
import { useState } from 'react'
import { Route, Switch } from 'react-router-dom'

function MovieCard () {
  // на этапе верстки захардкодил лайк
  const [isMovieLike, setMovieLike] = useState(false)

  const likeButtonClassName = `MoviesCard__like-button ${
    isMovieLike ? 'MoviesCard__like-button_type_active' : ''
  }`

  function handleCardLike () {
    !isMovieLike ? setMovieLike(true) : setMovieLike(false)
  }

  return (
    <Switch>
      <Route exact path='/movies'>
        <article className='MoviesCard'>
          <div className='MoviesCard__content'>
            <h2 className='MoviesCard__name'>33 слова о дизайне</h2>
            <p className='MoviesCard__duration'>1ч 42м</p>
            <button
              onClick={handleCardLike}
              className={likeButtonClassName}
            ></button>
          </div>
          <img
            src={moviePicture}
            className='MoviesCard__img'
            alt='film_image'
          ></img>
        </article>
      </Route>
      <Route exact path='/saved-movies'>
        <article className='MoviesCard'>
          <div className='MoviesCard__content'>
            <h2 className='MoviesCard__name'>33 слова о дизайне</h2>
            <p className='MoviesCard__duration'>1ч 42м</p>
            <button className='MoviesCard__delete'></button>
          </div>
          <img
            src={moviePicture}
            className='MoviesCard__img'
            alt='film_image'
          ></img>
        </article>
      </Route>
    </Switch>
  )
}

export default MovieCard
