//index.js do HOME
import React from "react";
import api from "../../utils/api";
import estilo from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

// className={`{estilo.card}`}

import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [relogios, setRelogios] = useState([]);

  useEffect(() => {
    api.get("/relogios/getall").then((response) => {
      setRelogios(response.data.relogios);
    });
  }, []);
  return (
    <section>
      <div className="heading_container heading_center">
        <h2>Relógios</h2>
      </div>
      {relogios.length > 0 ? (
        <div className={`${estilo.grid}`}>
          {relogios.map((relogio) => (
            <Link to={`/relogios/${relogio.id}`} key={relogio.id}>
              <div className={`${estilo.container}`}>
                <div className={`${estilo.card}`}>
                  <div className={`${estilo.imgBx}`}>
                    <img
                      src={`http://localhost:5000/public/imagem/${relogios.RelogioImagem[0]?.image}`}
                      alt=""
                    />
                  </div>
                  <div className={`${estilo.contentBx}`}>
                    <h2>{relogio.name}</h2>
                    <div className={`${estilo.size}`}>
                    

                      <h3>{relogio.descricao}</h3>
                        
                                      
                    </div>
                  </div>
                </div>
              </div>
              </Link>
            
          ))}
        </div>
      ) : (
        <p>
          Não há relogios cadastrados ou disponíveis para compra no momento!
        </p>
      )}
    </section>
  );
}

export default Home;
