import '../CssComponentes/FormUsuario.css'
import { useEffect, useState } from "react";
import Select from 'react-select';

function FormularioUsuario({eventoTeclado, obj, setObj, cadastrar, botao, cancelar, alterar, remover, select, setSelected}) {

    // use state
    const[cargos, setCargos] = useState([])
    // puxando dados do banco
    useEffect(() => {
        fetch("http://localhost:8080/cargos")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setCargos(retorno_convertido))

    }, [])
    
    const opcoes = [
      {value : '', label : 'Escolha uma opção.'}
     ]
    
     cargos.map((cargo) => (

        opcoes.push(
        {value : [cargo.nome,cargo.id], label : cargo.nome}
        )
      )
     )

     const manipulandoMudanca = event => {

      setSelected(event)
      if (event !== null) {
        const lista = event.value
        setObj(a => {
             return { ...a, idcargo: {
               id: lista[1],
               nome: lista[0],
               }
            }
          }
        )
      }
    }
    
    return (
        <form className='formularioUsuario'>
            <input type="text" placeholder="Nome" name='nome' value={obj.nome} onChange={eventoTeclado} className="form-control"></input>
            <input type="email" placeholder="Email" name='email' value={obj.email} onChange={eventoTeclado} className="form-control"></input>
            <input type="password" placeholder="senha" name='senha' value={obj.senha} onChange={eventoTeclado} className="form-control"></input>
            <Select
              className="basic-single"
              classNamePrefix={"select"}
              placeholder={opcoes[0].label}
              options={opcoes}
              value={select}
              isClearable={true}
              name="cargos"
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
export default FormularioUsuario;