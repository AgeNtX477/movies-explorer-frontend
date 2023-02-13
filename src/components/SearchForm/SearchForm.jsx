import './SearchForm.css'
import searchlogo from '../../images/searchlogo.svg'
import ShortCheckbox from './ShortCheckbox/ShortCheckbox'
import { useState } from 'react'

function SearchForm (props) {
  const [inputChange, setInputChange] = useState('')

  function handleInputChange (e) {
    setInputChange(e.target.value)
  }

  function onSubmitMovie (e) {
    e.preventDefault()
    props.handleSearchMovie(inputChange)
  }

  function onSubmitSavedMovie (e) {
    e.preventDefault()
    props.handleSearchSavedMovie(inputChange)
  }

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
