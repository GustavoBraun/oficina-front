import { useEffect, useState } from "react"

function FormularioVeiculo({eventoTeclado, obj, setObj, cadastrar, botao, cancelar, alterar, remover}) {

     // use state
     const[clientes, setClientes] = useState([])

     // puxando dados do banco
     useEffect(() => {
         fetch("http://localhost:8080/clientes")
         .then(retorno => retorno.json())
         .then(retorno_convertido => setClientes(retorno_convertido))
 
     }, [])

    
     const manipulandoMudanca = event => {
        const lista = event.target.value.split(',')
        setObj(a => {
             return { ...a, idCliente: {
               idCliente: lista[1],
               nome: lista[0],
               telefone : lista[3],
               email : lista[4],
               cpf : lista[2]
             }
            }
          }
        )
     }

     console.log(obj)

    return(
        <form>
            <input type='text' value={obj.placa} onChange={eventoTeclado} name='placa' placeholder="Placa" className="form-controller"/>
            
            <input type='text' value={obj.cor} onChange={eventoTeclado} name='cor' placeholder="Cor" className="form-controller"/>
            
            <input type='text' value={obj.tipoVeiculo} onChange={eventoTeclado} name='tipoVeiculo' placeholder="Classificação Veículo" className="form-controller"/>
            
            <input type='date' value={obj.ano} onChange={eventoTeclado} name='ano' placeholder="Ano" className="form-controller"/>
            <div className="cargoESelect form-control">
              <select className='select border' placeholder='Cliente' name='idCliente' onChange={manipulandoMudanca}>
                  <option value=''>Selecione um cliente.</option> {
                      clientes.map((objeto, indice) => (
                        <option value={[objeto.nome, objeto.idCliente, objeto.cpf, objeto.telefone, objeto.email]} key={indice} >
                          {objeto.nome}                            
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

export default FormularioVeiculo