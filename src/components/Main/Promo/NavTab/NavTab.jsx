import './NavTab.css'

function NavTab () {
  return (
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
  )
}

export default NavTab
