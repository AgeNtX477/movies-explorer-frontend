import './MoviesCardList.css'
import MovieCard from '../MoviesCard/MoviesCard'
import { Route, Switch } from 'react-router-dom'

function MoviesCardList () {
  return (
    <Switch>
      <Route exact path='/movies'>
        <section className='MoviesCardList'>
          <div className='MoviesCardList__cardlist-container'>
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
            <MovieCard />
          </div>
          <button className='MovesCardList__more-button'>Еще</button>
        </section>
      </Route>
      <Route exact path='/saved-movies'>
        <section className='MoviesCardList'>
          <div className='MoviesCardList__cardlist-container MoviesCardList__cardlist-container_saved'>
            <MovieCard />
            <MovieCard /> 
            <MovieCard />
            <MovieCard />
          </div>
        </section>
      </Route>
    </Switch>
  )
}

export default MoviesCardList
