import { useEffect, useState } from "react"

function FormularioOrdens({eventoTeclado, obj, setObj, cadastrar, botao, cancelar, alterar, remover}) {

     // use state
     const[veiculos, setVeiculos] = useState([])
     // puxando dados do banco
     useEffect(() => {
         fetch("http://localhost:8080/veiculos")
         .then(retorno => retorno.json())
         .then(retorno_convertido => setVeiculos(retorno_convertido))
 
     }, [])

     const manipulandoMudanca = event => {
      const lista = event.target.value.split(',')
      let indice = veiculos.findIndex((c) =>{
        return parseInt(c.idVeiculo) === parseInt(lista[1]);
      } );

      setObj(a => {
          return { ...a, idVeiculo: {
            idVeiculo: lista[1],
            placa: lista[0],
            tipoVeiculo : lista[3],
            ano : lista[4],
            cor : lista[2],
            idCliente : veiculos[indice].idCliente
            }
          }
        }
      )
     }

     return(
        <form>
            <div className="cargoESelect form-control">
              <select placeholder='Veiculo' name='idVeiculo' onChange={manipulandoMudanca}>
                  <option value=''>Selecione o veículo.</option> {
                      veiculos.map((objeto, indice) => (
                        <option value={[objeto.placa, objeto.idVeiculo, objeto.cor, objeto.tipoVeiculo, objeto.ano, objeto.idCliente]} key={indice} >
                          {objeto.placa}                            
                        </option>
                      ))}
                </select>
            </div>
            {
                botao
                ?
                <input type='button' value='Cadastrar' onClick={cadastrar} className="btn btn-primary"/>
                :
                <div>
                <input type='button' value='Alterar' onClick={alterar} className="btn btn-warning"/>
                <input type='button' value='Remover' onClick={remover} className="btn btn-danger"/>
                <input type='button' value='Cancelar'  onClick={cancelar} className="btn btn-secondary"/>    
                </div>
            }   
        </form>
    )
}

export default FormularioOrdens;