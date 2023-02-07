import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'

function SavedMovies ({ isLoading, ...props }) {
  return (
    <main>
      <SearchForm
        handleSearchSavedMovie={props.handleSearchSavedMovie}
        isSavedMovies={true}
        handleCheckboxSwitch={props.handleCheckboxSwitch}
        isSwitched={props.isSwitched}
      />
      <MoviesCardList
        isLoading={isLoading}
        isMovieLiked={true}
        movies={props.movies}
        handleCardDislike={props.handleCardDislike}
      />
    </main>
  )
}

export default SavedMovies
