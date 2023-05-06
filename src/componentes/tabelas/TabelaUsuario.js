import { createContext, useContext } from "react";

const Contexto = createContext()

function TabelaUsuario({vetor, selecionar}) {


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
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
                {
                    vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.idcargo.nome}</td>
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
                    <th>Nome</th>
                    <th>Cargo</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
              
            </tbody>
        </table>
    )
}
export default TabelaUsuario;