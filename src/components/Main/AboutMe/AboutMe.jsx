import './AboutMe.css'

function AboutMe () {
  return (
    <section className='AboutMe' id='aboutme'>
      <h2 className='AboutMe__title'>Студент</h2>
      <div className='AboutMe__data-container'>
        <div className='AboutMe__info'>
          <h3 className='AboutMe__subtitle'>Юрий</h3>
          <div className='AboutMe__caption'>Фронтент-разработчик, 34 года</div>
          <p className='AboutMe__about'>
            Я родился и живу в Одинцово, закончил МГАУ им. Горячкина. Увлекаюсь
            футболом, компьютерными играми и боксом. В 2021 году решил освоить
            новую профессию и пошел на курс по WEB-Разработки от Яндекс.
          </p>
          <a
            className='AboutMe__github'
            href='https://github.com/AgeNtX477'
            target='_blank'
            rel='noreferrer'
          >
            Github
          </a>
        </div>
        <img
          src='https://images.unsplash.com/photo-1549692520-acc6669e2f0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
          alt='authorPhoto'
          className='AboutMe__photo'
        ></img>
      </div>
    </section>
  )
}

export default AboutMe
