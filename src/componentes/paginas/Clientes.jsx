import { useEffect } from "react";
import { useState } from "react";
import FormularioClientes from "../formularios/formularioClientes";
import Tabela from '../tabelas/Tabela';


function Clientes() {
    //obj Cliente
    const cliente = {
        idCliente : 0,
        cpf : "",
        telefone: "",
        email : "",
        nome : ""
    }

    //use state

    const [objCliente, setObjCliente] = useState(cliente)
    const [btnCadastrar, setBtnCadastrar] = useState(true);
    const [clientes, setClientes] = useState([])

    //Pegando dados do banco de dados
  useEffect(() => {
    fetch("http://localhost:8080/clientes")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setClientes(retorno_convertido));
  }, []);
    

  const aoDigitar = (e) => {
    setObjCliente({...objCliente, [e.target.name] : e.target.value})
  }

  //Cadastrando Cliente
  const cadastrar = () => {
    fetch('http://localhost:8080/clientes', {
        method: 'post',
        body:JSON.stringify(objCliente),
        headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
        .then(retorno => retorno.json())
        .then(retorno_convertido => {
            if (retorno_convertido.message !== undefined) {
                alert(retorno_convertido.message)
            } else {
                setClientes([...clientes], retorno_convertido)
                alert('Cadastro efetuado com sucesso!')
                limparFormulario()
                window.location.reload()

            }
        })
}
    //alterando cliente
    const alterar = () => {
        fetch('http://localhost:8080/clientes', {
            method: 'put',
            body:JSON.stringify(objCliente),
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
                alert('Cliente alterado com sucesso!');
                //cópia do vetor de cargos
                let vetorTemporario = [...clientes];
        
                //indice
                let indice = vetorTemporario.findIndex((c) =>{
                  return c.id === objCliente.id;
                } );
        
                // Alterar cargo encontrado do vetor temporario
        
                vetorTemporario[indice] = objCliente;
        
                // Atualizar o vetor de cargos
        
                setClientes(vetorTemporario);
        
                limparFormulario();
                window.location.reload()

              }
            })
    }


    // Deletar Cliente
  const remover = () => {
    fetch('http://localhost:8080/clientes/'+objCliente.idCliente, {
      method: 'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        if (retorno_convertido.message !== undefined) {
          alert(retorno_convertido.message);
        }
        else {
          //mensagem
          alert("Cliente removido com sucesso!");

          //cópia do vetor de cargos
          let vetorTemporario = [...clientes];

          //indice
          let indice = vetorTemporario.findIndex((c) =>{
            return c.id === objCliente.id;
          } );

          //Remover indice encontrado do vetor temporario

          vetorTemporario.splice(indice, 1);

          // Atualizar o vetor de cargos

          setClientes(vetorTemporario);

          // Limpar formulário
          limparFormulario();
          window.location.reload()

        }})
    }


    const limparFormulario = () => {
        setObjCliente(cliente)
        setBtnCadastrar(true)
    }

    const selecionarCliente = (indice) => {
        setObjCliente(clientes[indice])
        setBtnCadastrar(false)
    }
    return (
        <div>
            <FormularioClientes botao={btnCadastrar} obj={objCliente} eventoTeclado={aoDigitar} cadastrar={cadastrar} alterar={alterar} remover={remover} cancelar={limparFormulario}/>
            <Tabela vetor={clientes} selecionar={selecionarCliente}/>
        </div>
    )
}

export default Clientes