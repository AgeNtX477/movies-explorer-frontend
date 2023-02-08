import './Header.css'
import Navigation from './Navigation/Navigation'

function Header (props) {
  return (
    <header className='Header'>
      <Navigation isLoggedIn={props.isLoggedIn} />
    </header>
  )
}

export default Header
