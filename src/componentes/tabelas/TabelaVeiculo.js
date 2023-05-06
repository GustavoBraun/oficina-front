import { createContext, useContext } from "react";

const Contexto = createContext()

function TabelaVeiculo({vetor, selecionar}) {

    if (vetor.length > 0) {

        return(
            <Contexto.Provider value={{vetor, selecionar}}>
                <TabelaComItens/>
            </Contexto.Provider>
    
        )
    }else {        
            return(
                <TabelaSemItens/>
            )
    }

}


function TabelaComItens() {

    const {vetor, selecionar} = useContext(Contexto)

    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Placa</th>
                    <th>Dono veículo</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.placa}</td>
                            <td>{obj.idCliente.nome}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

function TabelaSemItens() {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Placa</th>
                    <th>Dono veículo</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
              
            </tbody>
        </table>
    )
}
export default TabelaVeiculo;

