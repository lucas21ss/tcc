/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../utils/api';
import estilo from './product.module.css';

function RelogioDetalhe() {
  const [relogios, setRelogios] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    api.get(`relogios/getRelogio/${id}`).then((response) => {
      setRelogios(response.data.relogios);
    });
  }, [id]);

  return (
    <main className={`${estilo.container}`}>

    <div className={`${estilo.leftcolumn}`}>
        <img
            src={`http://localhost:5000/images/${relogios.relogiosImagems && relogios.relogiosImagems[0] && relogios.relogiosImagems[0].image}`}
            style={{ width: '500px' }}
        />
    </div>

    <div className={`${estilo.rightcolumn}`}>
        <div className={`${estilo.productdescription}`}>
        <h1>{relogios.name}</h1>
            <span>{relogios.descricao}</span>
            {/* <span>{relogios.tamanho}</span>
            <span>{relogios.marca}</span>
            <span>{relogios.material}</span>
            <span>{relogios.referencia}</span>
            <span>{relogios.comprar}</span> */}

        </div>


        <div className={`${estilo.productPrice}`}>
            <a className={`${estilo.cartbtn}`}>Onde comprar</a>
        </div>
    </div>
    
</main>
  )
}

export default RelogioDetalhe