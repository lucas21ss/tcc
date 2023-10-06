//componente register 
import React from 'react'
import InputGroup from '../../../components/InputGroup'

//hooks
import { useContext, useState } from 'react'

//context
import { Context } from '../../../context/UserContext'
import estilo from './Register.module.css'
import { Link } from 'react-router-dom';


function Register() {
  //a logica para enviar um formulario, ou para fazer qualquer coisa diferenciada em uma pagina fica nesse local
  const [user, setUser] = useState({})
  const { register } = useContext(Context)

  function handleChange(evento) {
    setUser({ ...user, [evento.target.name]: evento.target.value })
    //{...user}: isso aqui, cria uma cópia do objeto user atual, usando a sintaze de espalhamento do javascript(...), essa cópia e feita para preservar valores existentes no objeto antes de fazer qualquer att
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    register(user)
  }

  return (

    <div className={`${estilo.section}`}>
      <div className={`${estilo.container}`}>
        <form onSubmit={handleSubmit} name="form1" className={`${estilo.box}`} method="post">
          <h2 className={`${estilo.login}`}>Registrar</h2>
          <h5 className={`${estilo.conta}`}>  Se registre</h5>
          <InputGroup
            type='text'
            placeholder='Seu nome aqui'
            name='name'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <InputGroup
            type='email'
            placeholder='Seu email aqui'
            name='email'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <InputGroup
            type='tel'
            placeholder='Seu telefone aqui'
            name='phone'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <InputGroup
            type='password'
            placeholder='Digite sua senha'
            name='password'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <InputGroup
            type='password'
            placeholder='Confirme sua senha'
            name='confirmpassword'
            className={`${estilo.input}`}
            handleChange={handleChange}
          />
          <button className={`${estilo.btn1}`} type='submit'>Login</button>
          <p className={`${estilo.semConta}`}>
            Não tem uma conta? <Link to='/register'>Clique aqui!!!</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Register