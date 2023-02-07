import '../CssComponentes/FormUsuario.css'
import { useEffect, useState } from "react";

function FormularioUsuario({eventoTeclado, obj, setObj, cadastrar, botao, cancelar, alterar, remover}) {

    // use state
    const[cargos, setCargos] = useState([])

    // puxando dados do banco
    useEffect(() => {
        fetch("http://localhost:8080/cargos")
        .then(retorno => retorno.json())
        .then(retorno_convertido => setCargos(retorno_convertido))

    }, [])
    
  const manipulandoMudanca = event => {
    console.log(event.target.value)
    const lista = event.target.value.split(',')
    setObj( a => {
        return { ...a, idcargo: {
          id: lista[1],
          nome: lista[0]
        }}
      }
    )
  }

    return (
        <form className='formularioUsuario'>
            <input type="text" placeholder="Nome" name='nome' value={obj.nome} onChange={eventoTeclado} className="form-control"></input>
            <input type="email" placeholder="Email" name='email' value={obj.email} onChange={eventoTeclado} className="form-control"></input>
            <input type="password" placeholder="senha" name='senha' value={obj.senha} onChange={eventoTeclado} className="form-control"></input>
            <div className="cargoESelect form-control">
              <select className='select border' placeholder='Cargo' name='idcargo' onChange={manipulandoMudanca}>
                  <option value=''>Selecione um cargo.</option> {
                      cargos.map((obj) => (
                        <option value={[obj.nome, obj.id]} key={obj.id} >
                          {obj.nome}                            
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
export default FormularioUsuario;