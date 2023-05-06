import { useEffect } from "react"
import { useState } from "react"
import FormularioOrdens from "../formularios/formularioOrdens"
import TabelaOrdem from "../tabelas/TabelaOrdem"

function OrdemServico() {
    const ordem = {
        idOrdem: 0,
        idVeiculo: {
            idVeiculo: 0,
            placa : "",
            cor : "",
            tipoVeiculo : "",
            ano : "",
            idCliente: {
                idCliente : 0,
                cpf: "",
                telefone : "",
                email : "",
                nome : ""
            }
        }
    }

        //use state

        const [btnCadastrar, setBtnCadastrar] = useState(true)
        const [formServico, setFormServico] = useState(false)
        const [ordens, setOrdens] = useState([])
        const [objOrdem, setObjOrdem] = useState(ordem)
        const [activeIndex, setActiveIndex] = useState(null);

        
        //pegando dados do banco
        
        useEffect(() => {
            fetch('http://localhost:8080/ordens')
            .then(retorno => retorno.json())
            .then(retorno_convertido => setOrdens(retorno_convertido))
        }, [])

        //Selecionar ordem
        const selecionarOrdem = (indice) => {
            setObjOrdem(ordens[indice])
            setBtnCadastrar(false)
            formServico
            ?
            setFormServico(false)
            :
            setFormServico(true)
        }

        const aoDigitar = (e) => {
            setObjOrdem({...objOrdem, [e.target.name] : e.target.value})
        }
        const cadastrar = () => {
            fetch('http://localhost:8080/ordens', {
                method: 'post',
                body:JSON.stringify(objOrdem),
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
                    setOrdens([...ordens, retorno_convertido])
                    alert('Cadastro efetuado com sucesso!')
                    limparFormulario();
                    window.location.reload()

                }
            })
          }
          //Alterar Ordem
          const alterar = () => {
            fetch('http://localhost:8080/ordens', {
              method: 'put',
              body:JSON.stringify(objOrdem),
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
                  alert('Ordem alterado com sucesso!');
                  //cópia do vetor de cargos
                  let vetorTemporario = [...ordens];
          
                  //indice
                  let indice = vetorTemporario.findIndex((c) =>{
                    return c.id === objOrdem.id;
                  } );
          
                  // Alterar cargo encontrado do vetor temporario
          
                  vetorTemporario[indice] = objOrdem;
          
                  // Atualizar o vetor de cargos
          
                  setOrdens(vetorTemporario);
          
                  limparFormulario();
                  window.location.reload()

                }
              })
            }

    // Deletar ordem
    const remover = () => {
    console.log(objOrdem)
    fetch('http://localhost:8080/ordens/'+objOrdem.idOrdem, {
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
          alert("Ordem removido com sucesso!");

          //cópia do vetor de ordens
          let vetorTemporario = [...ordens];

          //indice
          let indice = vetorTemporario.findIndex((c) =>{
            return c.id === objOrdem.id_ordem;
          } );

          //Remover indice encontrado do vetor temporario

          vetorTemporario.splice(indice, 1);

          // Atualizar o vetor de cargos

          setOrdens(vetorTemporario);

          // Limpar formulário
          limparFormulario();
          window.location.reload()

          }})
    }
    const limparFormulario = () => {
        setObjOrdem(ordem)
        setBtnCadastrar(true)
        setActiveIndex(null)
      }
    
    return (
        <div>
            <FormularioOrdens botao={btnCadastrar} eventoTeclado={aoDigitar} obj={objOrdem} setObj={setObjOrdem} cadastrar={cadastrar} alterar={alterar} remover={remover} cancelar={limparFormulario}/>
            <TabelaOrdem vetor={ordens} selecionar={selecionarOrdem} servico={formServico} activeIndex={activeIndex} setActiveIndex={setActiveIndex}/>
        </div>
    )
}

export default OrdemServico