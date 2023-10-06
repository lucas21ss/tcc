import React, { useState } from 'react'
import InputGroup from '../../../src/components/InputGroup'
import api from '../../../../frontend/src/utils/api'
import style from './cadastrarProduto.module.css'


function Cadastrar() {
  const [relogio, setRelogio] = useState({})
  const [preview, setPreview] = useState()
  const [token] = useState(localStorage.getItem('token') || '')

  function handleChange(e) {
    setRelogio({ ...relogio, [e.target.name]: e.target.value })
  }
  const [image, setImage] = useState(null)
  function onFileChange(e) {
    setPreview(URL.createObjectURL(e.target.files[0]))
    setImage(e.target.files[0])
    console.log(preview)
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const formData = new FormData()

    if (image) {
      formData.append('images', image)
    }

    //montando objeto com o formulario
    await Object.keys(relogio).forEach((key) => formData.append(key, relogio[key]))

    const data = await api.post(`relogios/create`, formData, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data'
      }
    }).then((response) => {
      return response.data
    }).catch((err) => {
      alert(err.response.data)
      return err.response.data
    })
    alert(data.message)
  }

  return (
    <section className={`${style.section}`}>
      <div className={`${style.formulario}`}>
        <form onSubmit={handleSubmit}>
          <InputGroup
            label='Imagem'
            type='file'
            className={`${style.input}`}
            name='image'
            handleChange={onFileChange}
          />
          <InputGroup
            type='text'
            label='Nome'
            name='name'
            className={`${style.input}`}
            placeholder='Digite seu nome'
            handleChange={handleChange}
          />
          <InputGroup
            type='descricao'
            label='Descrição'
            name='descricao'
            className={`${style.input}`}
            placeholder='Digite a descrição do relógio'
            handleChange={handleChange}
          />
          <InputGroup
            type='tamanho'
            label='Tamanho'
            name='tamanho'
            className={`${style.input}`}
            placeholder='Digite o tamanho em milímetros'
            handleChange={handleChange}
          />
          <InputGroup
            type='marca'
            label='Marca'
            name='marca'
            className={`${style.input}`}
            placeholder='Digite a marca do relógio'
            handleChange={handleChange}
          />
          <InputGroup
            type='material'
            label='Material'
            name='material'
            className={`${style.input}`}
            placeholder='Digite o material que o relógio é feito'
            handleChange={handleChange}
          />
          <InputGroup
            type='referencia'
            label='Referência'
            name='referencia'
            className={`${style.input}`}
            placeholder='Digite a referencia do relógio'
            handleChange={handleChange}
          />
          <InputGroup
            type='comprar'
            label='Onde comprar'
            name='comprar'
            className={`${style.input}`}
            placeholder='Cole um link onde é possivel achar o relógio para a compra'
            handleChange={handleChange}
          />
          <button className={`${style.atualizar}`} type='submit'>Cadastrar</button>
        </form>
      </div>
    </section>
  )
}


export default Cadastrar