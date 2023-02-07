import FormularioVeiculo from "../formularios/formularioVeiculo"
import { useState, useEffect } from "react"
import TabelaVeiculo from "../tabelas/TabelaVeiculo"

function Veiculos() {

    //Objeto Veiculo
    const veiculo = {
        idVeiculo : 0,
        placa : "",
        cor : "",
        tipoVeiculo : "",
        ano : "",
        idCliente: {
            idCliente : 0,
            cpf : "",
            telefone : "",
            email : "",
            nome : ""
        }
    }

    //use state
    const [btnCadastrar, setBtnCadastrar] = useState(true)
    const [veiculos, setVeiculos] = useState([])
    const [objVeiculo, setObjVeiculo] = useState(veiculo)

    //Pegando dados do banco de dados
    useEffect(() => {
        fetch('http://localhost:8080/veiculos')
        .then(retorno => retorno.json())
        .then(retorno_convertido => setVeiculos(retorno_convertido));
    }, []);

   //Selecionar veiculo
   const selecionarVeiculo = (indice) => {
    setObjVeiculo(veiculos[indice]);
    setBtnCadastrar(false)
}
    //obtendo dados do formulario
    const aoDigitar = (e) => {
        setObjVeiculo({...objVeiculo, [e.target.name]: e.target.value});
      }

  // Cadastrar

  const cadastrar = () => {
    fetch('http://localhost:8080/veiculos', {
        method: 'post',
        body:JSON.stringify(objVeiculo),
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
            setVeiculos([...veiculos, retorno_convertido])
            alert('Cadastro efetuado com sucesso!')
            limparFormulario();
        }
    })
  }

    // Alterar veiculo
const alterar = () => {
    fetch('http://localhost:8080/veiculos', {
      method: 'put',
      body:JSON.stringify(objVeiculo),
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
          let vetorTemporario = [...veiculos];
  
          //indice
          let indice = vetorTemporario.findIndex((c) =>{
            return c.id === objVeiculo.id;
          } );
  
          // Alterar cargo encontrado do vetor temporario
  
          vetorTemporario[indice] = objVeiculo;
  
          // Atualizar o vetor de cargos
  
          setVeiculos(vetorTemporario);
  
          limparFormulario();
        }
      })
    }

    // Deletar veiculo
  const remover = () => {
    fetch('http://localhost:8080/veiculos/'+objVeiculo.idVeiculo, {
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
          let vetorTemporario = [...veiculos];

          //indice
          let indice = vetorTemporario.findIndex((c) =>{
            return c.id === objVeiculo.idUsuario;
          } );

          //Remover indice encontrado do vetor temporario

          vetorTemporario.splice(indice, 1);

          // Atualizar o vetor de cargos

          setVeiculos(vetorTemporario);

          // Limpar formulário
          limparFormulario();

          })
    }

    const limparFormulario = () => {
    setObjVeiculo(veiculo);
    setBtnCadastrar(true);
  }

    return(
        <div>
            <FormularioVeiculo botao={btnCadastrar} eventoTeclado={aoDigitar} obj={objVeiculo} setObj={setObjVeiculo} cadastrar={cadastrar} alterar={alterar} remover={remover}/>
            <TabelaVeiculo vetor={veiculos} selecionar={selecionarVeiculo}/>
        </div>
    )
}

export default Veiculos