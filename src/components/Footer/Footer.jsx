import './Footer.css'

function Footer () {
  return (
    <footer className='Footer'>
      <h2 className='Footer__title'>
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className='Footer__basement'>
        <p className='Footer__year'>© 2023</p>
        <div className='Footer__links'>
          <a
            href='https://practicum.yandex.ru'
            target='_blank'
            rel='noreferrer'
            className='Footer__link'
          >
            Яндекс.Практикум
          </a>
          <a
            href='https://github.com/AgeNtX477/'
            target='_blank'
            rel='noreferrer'
            className='Footer__link'
          >
            Github
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
