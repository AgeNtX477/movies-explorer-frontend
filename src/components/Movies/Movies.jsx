import './Movies.css'
import SearchForm from '../SearchForm/SearchForm'
import MoviesCardList from '../MoviesCardList/MoviesCardList'
import Header from '../Header/Header'
import Footer from '../Footer/Footer'

function Movies ({ isLoading, ...props }) {
  return (
    <main>
      <Header />
      <SearchForm
        handleSearchMovie={props.handleSearchMovie}
        isSwitched={props.isSwitched}
        handleSearchFormClick={props.handleSearchFormClick}
        movies={props.movies}
        setIsSwitched={props.setIsSwitched}
        isSavedMovies={false}
      />
      <MoviesCardList
        isLoading={isLoading}
        movies={props.movies}
        handleCardLike={props.handleCardLike}
        handleCardDislike={props.handleCardDislike}
        isSavedMovies={false}
        connectionError={props.connectionError}
        foundNotAny={props.foundNotAny}
      />
      <Footer />
    </main>
  )
}

export default Movies
