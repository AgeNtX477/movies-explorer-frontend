import './PageNotFound.css'
import { useHistory } from 'react-router-dom'

function PageNotFound () {
  const history = useHistory()

  function goBackClick () {
    history.goBack()
  }

  return (
    <main className='PageNotFound'>
      <h1 className='PageNotFound__title'>404</h1>
      <p className='PageNotFound__subtitle'>Страница не найдена</p>
      <button
        className='PageNotFound__button'
        type='button'
        onClick={goBackClick}
      >
        Назад
      </button>
    </main>
  )
}

export default PageNotFound
