import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
//Contexto
import { Context } from '../../context/UserContext'
import estilo from './NavBar.module.css'
import Logo from './img/Logo.png'

function NavBar() {
  const { authenticated, logout } = useContext(Context)

  return (
    <nav className={`${estilo.nav}`}>
      <div className={`${estilo.container}`}>

        <div className={`${estilo.logos}`}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: '120px' }}
            className={`${estilo.logo}`}
          />
        </div>

        <div className={`${estilo.links}`}>
          <ul className={`${estilo.navlinks}`}>
            <li className={`${estilo.li}`}>
              <Link to='/'>Ínicio</Link>
            </li>
            {!authenticated ? (
              <>
                <li className={`${estilo.li}`}>
                  <Link to='/register'>Registrar</Link>
                </li>
                <li className={`${estilo.li}`}>
                  <Link to='/login'>Login</Link>
                </li>
              </>
            ) : (
              <>
               
                <li className={`${estilo.li}`}>
                  <Link className='nav-link' to='/cadastrar'>Cadastrar relógio</Link>
                </li>
                <li onClick={logout} className={`${estilo.li}`}>
                  <Link to='/'>Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default NavBar