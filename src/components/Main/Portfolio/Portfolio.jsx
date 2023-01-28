import './Portfolio.css'
import portfolio from '../../../images/portfolio.svg'

function Portfolio () {
  return (
    <section className='Portfolio'>
      <h2 className='Portfolio__title'>Портфолио</h2>
      <ul className='Portfolio__list-box'>
        <li className='Portfolio__list'>
          <a
            href='https://github.com/AgeNtX477/how-to-learn'
            target='_blank'
            rel='noreferrer'
            className='Portfolio__link'
          >
            Статичный сайт
            <img src={portfolio} alt='портфолио' />
          </a>
        </li>
        <li className='Portfolio__list'>
          <a
            href='https://github.com/AgeNtX477/russian-travel'
            target='_blank'
            rel='noreferrer'
            className='Portfolio__link'
          >
            Адаптивный сайт
            <img src={portfolio} alt='портфолио' />
          </a>
        </li>
        <li className='Portfolio__list'>
          <a
            href='https://github.com/AgeNtX477/react-mesto-api-full'
            target='_blank'
            rel='noreferrer'
            className='Portfolio__link'
          >
            Одностраничное приложение
            <img src={portfolio} alt='портфолио' />
          </a>
        </li>
      </ul>
    </section>
  )
}

export default Portfolio
