import { useEffect } from "react"
import { useState } from "react"
import Tabela from "../tabelas/Tabela"
import FormularioUsuario from "../formularios/formularioUsuario"

function Usuarios() {

    //Objeto usuário
    const usuario = {
        idUsuario : 0,
        nome : "",
        email : "",
        senha : "",
        idcargo: {
            id: 0,
            nome: ""
          }    
        }

    //use state
    const [btnCadastrar, setBtnCadastrar] = useState(true)
    const [usuarios, setUsuarios] = useState([])
    const [objUsuario, setObjUsuario] = useState(usuario)

    //Pegando dados do banco de dados
    useEffect(() => {
        fetch('http://localhost:8080/usuarios')
        .then(retorno => retorno.json())
        .then(retorno_convertido => setUsuarios(retorno_convertido));
    }, []);

 

    //Selecionar usuario
    const selecionarUsuario = (indice) => {
        setObjUsuario(usuarios[indice]);
        setBtnCadastrar(false)
    }

    //obtendo dados do formulario
    const aoDigitar = (e) => {
        setObjUsuario({...objUsuario, [e.target.name]: e.target.value});
        console.log(objUsuario)
      }

  // Cadastrar

  const cadastrar = () => {
    fetch('http://localhost:8080/usuarios', {
        method: 'post',
        body:JSON.stringify(objUsuario),
        headers: {
            'Content-type':'application/json',
            'Accept':'application/json'
        }
    })
    .then(retorno => retorno.json())
    .then(retorno_convertido => {
        if (retorno_convertido.message !== undefined) {
            alert(retorno_convertido.message)
        } else {
            setUsuarios([...usuarios, retorno_convertido])
            alert('Cadastro efetuado com sucesso!')
            limparFormulario();
        }
    })
  }

  // Alterar Usuario
const alterar = () => {
    fetch('http://localhost:8080/usuarios', {
      method: 'put',
      body:JSON.stringify(objUsuario),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.message !== undefined) {
          alert(retorno_convertido.message);
        }else{
          // mensagem
          alert('Usuário alterado com sucesso!');
          //cópia do vetor de cargos
          let vetorTemporario = [...usuarios];
  
          //indice
          let indice = vetorTemporario.findIndex((c) =>{
            return c.id === objUsuario.id;
          } );
  
          // Alterar cargo encontrado do vetor temporario
  
          vetorTemporario[indice] = objUsuario;
  
          // Atualizar o vetor de cargos
  
          setUsuarios(vetorTemporario);
  
          limparFormulario();
        }
      })
    }

    // Deletar Usuario
  const remover = () => {
    fetch('http://localhost:8080/usuarios/'+objUsuario.idUsuario, {
      method: 'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
          //mensagem
          alert("Usuário removido com sucesso!");

          //cópia do vetor de cargos
          let vetorTemporario = [...usuarios];

          //indice
          let indice = vetorTemporario.findIndex((c) =>{
            return c.id === objUsuario.idUsuario;
          } );

          //Remover indice encontrado do vetor temporario

          vetorTemporario.splice(indice, 1);

          // Atualizar o vetor de cargos

          setUsuarios(vetorTemporario);

          // Limpar formulário
          limparFormulario();

          })
    }

    const limparFormulario = () => {
    setObjUsuario(usuario);
    setBtnCadastrar(true);
  }

    return (
        <div>
            <FormularioUsuario botao={btnCadastrar} eventoTeclado={aoDigitar} remover={remover} alterar={alterar} obj={objUsuario} setObj={setObjUsuario} cadastrar={cadastrar} cancelar={limparFormulario}/>
            <Tabela vetor={usuarios} selecionar={selecionarUsuario} />
        </div>
    )
}

export default Usuarios