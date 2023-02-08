import './SavedMovies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function SavedMovies ({ isLoading, ...props }) {
  return (
    <main>
      <Header />
      <SearchForm
        handleSearchSavedMovie={props.handleSearchSavedMovie}
        isSavedMovies={true}
        handleCheckboxSwitch={props.handleCheckboxSwitch}
        isSwitched={props.isSwitched}
      />
      <MoviesCardList
        isLoading={isLoading}
        isSavedMovies={true}
        movies={props.movies}
        handleCardDislike={props.handleCardDislike}
      />
      <Footer />
    </main>
  )
}

export default SavedMovies
