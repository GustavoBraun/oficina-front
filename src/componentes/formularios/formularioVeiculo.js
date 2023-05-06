import { useEffect, useState } from "react"
import Select from 'react-select';

function FormularioVeiculo({eventoTeclado, obj, setObj, cadastrar, botao, cancelar, alterar, remover, select, setSelected}) {

     // use state
     const[clientes, setClientes] = useState([])

     // puxando dados do banco
     useEffect(() => {
         fetch("http://localhost:8080/clientes")
         .then(retorno => retorno.json())
         .then(retorno_convertido => setClientes(retorno_convertido))
 
     }, [])

     const opcoes = [
      {value : '', label : 'Escolha uma opção.'}
     ]
     if (clientes.length > 0) {
      
     clientes.map((cliente) => (
        
      opcoes.push(
      {value : [cliente.nome,cliente.idCliente,cliente.cpf,cliente.telefone,cliente.email], label : `${cliente.nome}`}
      )  
    )
   )
     }
     
     const manipulandoMudanca = event => {
      setSelected(event)
      if (event !== null) {
        const lista = event.value
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
    }


    return(
        <form>
            <input type='text' value={obj.placa} onChange={eventoTeclado} name='placa' placeholder="Placa" className="form-controller"/>
            
            <input type='text' value={obj.cor} onChange={eventoTeclado} name='cor' placeholder="Cor" className="form-controller"/>
            
            <input type='text' value={obj.tipoVeiculo} onChange={eventoTeclado} name='tipoVeiculo' placeholder="Classificação Veículo" className="form-controller"/>
            
            <input type='date' value={obj.ano} onChange={eventoTeclado} name='ano' placeholder="Ano" className="form-controller"/>
            <Select
              className="basic-single"
              classNamePrefix={"select"}
              placeholder={opcoes[0].label}
              options={opcoes}
              value={select}
              defaultValue={opcoes[0]}
              isClearable={true}
              name="clientes"
              onChange={(event) => manipulandoMudanca(event)}
            />
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