import './SearchForm.css'
import searchlogo from '../../images/searchlogo.svg'
import ShortCheckbox from './ShortCheckbox/ShortCheckbox'
import { useEffect, useState } from 'react'

function SearchForm (props) {
  const [inputChange, setInputChange] = useState('')
  const [inputChangeSaved, setInputChangeSaved] = useState('')

  function handleInputChange (e) {
    if (!props.isSavedMovies) {
      setInputChange(e.target.value)
    } else {
      setInputChangeSaved(e.target.value)
    }
  }

  function onSubmitMovie (e) {
    e.preventDefault()
    localStorage.setItem('lastSearch', inputChange)
    props.handleSearchMovie(inputChange)
  }

  function onSubmitSavedMovie (e) {
    e.preventDefault()
    localStorage.setItem('lastSearchSaved', inputChangeSaved)
    props.handleSearchSavedMovie(inputChangeSaved)
  }


  // хук для получения текста поиска в инпуте
  useEffect(() => {
    const lastSearch = localStorage.getItem('lastSearch')
    const lastSearchSaved = localStorage.getItem('lastSearchSaved')
    if (lastSearch) {
      setInputChange(lastSearch)
    }
    if (lastSearchSaved) {
      setInputChangeSaved(lastSearchSaved)
    }
  }, [])

  return (
    <section
      className='SearchForm'
      onSubmit={!props.isSavedMovies ? onSubmitMovie : onSubmitSavedMovie}
    >
      <form className='SearchForm__form'>
        <input
          required
          type='text'
          placeholder='Фильмы'
          className='SearchForm__search-input'
          autoComplete='off'
          onChange={handleInputChange}
          value={!props.isSavedMovies ? inputChange : inputChangeSaved}
        ></input>
        <button className='SearchForm__button'>
          <img alt='logo4search' src={searchlogo}></img>
        </button>
      </form>
      <ShortCheckbox
        handleCheckboxSwitch={props.handleCheckboxSwitch}
        isSwitched={props.isSwitched}
      />
    </section>
  )
}

export default SearchForm
