import { useEffect, useState } from 'react';
import FormularioCargos from '../formularios/formularioCargo';
import Tabela from '../tabelas/Tabela';

function Cargos() {

  //objeto produto
  const cargo = {
    id : 0,
    nome : ""
  }

  //use state
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [cargos, setCargos] = useState([]);
  const [objCargo, setObjCargo] = useState(cargo);

  //use effect
  useEffect(()=>{
    fetch("http://localhost:8080/cargos")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setCargos(retorno_convertido));
  }, []);

  //obtendo dados do formulario
  const aoDigitar = (e) => {
    setObjCargo({...objCargo, [e.target.name]: e.target.value});
  }

  // Cadastrar Cargo
  const cadastrar = () => {
    fetch('http://localhost:8080/cargos', {
      method: 'post',
      body:JSON.stringify(objCargo),
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
          setCargos([...cargos, retorno_convertido]);
          alert('Cadastro efetuado com sucesso!');
          limparFormulario();
        }
      })
    }

// Alterar cargo
const alterar = () => {
  fetch('http://localhost:8080/cargos', {
    method: 'put',
    body:JSON.stringify(objCargo),
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
        alert('Cargo alterado com sucesso!');
        //cópia do vetor de cargos
        let vetorTemporario = [...cargos];

        //indice
        let indice = vetorTemporario.findIndex((c) =>{
          return c.id === objCargo.id;
        } );

        // Alterar cargo encontrado do vetor temporario

        vetorTemporario[indice] = objCargo;

        // Atualizar o vetor de cargos

        setCargos(vetorTemporario);

        limparFormulario();
      }
    })
  }

  // Deletar Cargo
  const remover = () => {
    fetch('http://localhost:8080/cargos/'+objCargo.id, {
      method: 'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
          //mensagem
          alert("Produto removido com sucesso!");

          //cópia do vetor de cargos
          let vetorTemporario = [...cargos];

          //indice
          let indice = vetorTemporario.findIndex((c) =>{
            return c.id === objCargo.id;
          } );

          //Remover indice encontrado do vetor temporario

          vetorTemporario.splice(indice, 1);

          // Atualizar o vetor de cargos

          setCargos(vetorTemporario);

          // Limpar formulário
          limparFormulario();

          })
    }


  //Limpar formulario
  const limparFormulario = () => {
    setObjCargo(cargo);
    setBtnCadastrar(true);
  }



  //Selecionar cargo
  const selecionarCargo = (indice) => {
    setObjCargo(cargos[indice]);
    setBtnCadastrar(false);
  }

  //retorno
  return (
    <div>
      <FormularioCargos  botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objCargo} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={cargos} selecionar={selecionarCargo} />
      </div>
  );
}

export default Cargos;
