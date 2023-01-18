import './Promo.css'

function Promo () {
  return (
    <section className='promo'>
      <h1 className='promo__title'>
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <nav className='navTab'>
        <a href='#aboutproject' className='navTab__item'>
          О проекте
        </a>
        <a href='#techs' className='navTab__item'>
          Технологии
        </a>
        <a href='#aboutme' className='navTab__item'>
          Студент
        </a>
      </nav>
    </section>
  )
}

export default Promo
