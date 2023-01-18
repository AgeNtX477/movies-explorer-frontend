import './SearchForm.css'
import searchlogo from '../../images/searchlogo.svg'

function SearchForm () {
  return (
    <section className='SearchForm'>
      <form className='SearchForm__form'>
        <input
          type='input'
          placeholder='Фильмы'
          className='SearchForm__search-input'
        ></input>
        <button className='SearchForm__button'>
          <img alt='logo4search' src={searchlogo}></img>
        </button>
      </form>
      <fieldset className='SearchForm__checkbox'>
        <input type='checkbox' className='SearchForm__input' id='switch'/>
        <label htmlFor='switch' className='SearchForm__container'></label>
        <label htmlFor='switch' className='SearchForm__subtitle'>Короткометражки</label>
      </fieldset>
    </section>
  )
}

export default SearchForm
