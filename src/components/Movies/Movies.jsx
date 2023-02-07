import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function Movies ({ isLoading, ...props }) {
  return (
    <main>
      <SearchForm
        handleSearchMovie={props.handleSearchMovie}
        handleCheckboxSwitch={props.handleCheckboxSwitch}
        isSwitched={props.isSwitched}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={props.movies}
        handleCardLike={props.handleCardLike}
        handleCardDislike={props.handleCardDislike}
      />
    </main>
  )
}

export default Movies
