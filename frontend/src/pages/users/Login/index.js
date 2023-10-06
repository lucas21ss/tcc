import React from 'react'
import InputGroup from '../../../components/InputGroup'
import { Link } from 'react-router-dom'
import { useContext, useState } from 'react'
import { Context } from '../../../context/UserContext'
import estilo from './Login.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';


function Login() {
  const [user, setUser] = useState({})
  const { login } = useContext(Context)

  function handleChange(e) {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()
    login(user)
  }

  return (
    <div className={`${estilo.section}`}>
      <div className={`${estilo.container}`}>
        <form onSubmit={handleSubmit} name="form1" className={`${estilo.box}`} method="post">
          <h4 className={`${estilo.login}`}>Login</h4>
          <h5 className={`${estilo.conta}`}>Faça seu login</h5>
          <InputGroup
            type='email'
            name='email'
            className={`${estilo.input}`}
            placeholder='Digite seu email'
            handleChange={handleChange}
          />
          <InputGroup
            type='password'
            name='password'
            className={`${estilo.input}`}
            placeholder='Digite sua senha'
            handleChange={handleChange}
          />
          <button className={`${estilo.btn1}`} type='submit'>Login</button>
          <p className={`${estilo.semConta}`}>
            Não tem uma conta? <Link to='/register' className={`${estilo.cliqueAqui}`}>Clique aqui</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
