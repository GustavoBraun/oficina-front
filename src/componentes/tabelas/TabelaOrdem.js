import { createContext, useContext } from "react";
import Servicos from "../paginas/Servicos";
import classNames from "classnames";
import { Collapse} from 'reactstrap';



const Contexto = createContext()

function TabelaOrdem({vetor, selecionar, servico, activeIndex, setActiveIndex}) {



    if (vetor.length > 0) {

        return(
            <Contexto.Provider value={{vetor, selecionar, servico, activeIndex, setActiveIndex}}>
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


    const {vetor, selecionar, activeIndex, setActiveIndex} = useContext(Contexto)




    return (
        <div class="table-responsive">

            <table className="table ">
                <thead>
                    <tr>
                        <th style={{width: "33%"}}>#</th>
                        <th style={{width: "33%"}}>Id</th>
                        <th style={{width: "33%"}}>Selecionar</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        vetor.map((obj, indice) => (
                            <>
                            <tr class="accordion-toggle collapsed"
                                data-mdb-toggle="collapse"
                                onClick={event => setActiveIndex(activeIndex === indice ? null : indice)}
                                href={indice}
                                aria-controls="collapseOne">
                                    <td>{indice + 1}</td>
                                    <td>{obj.idOrdem}</td>
                                    <td><button onClick={() => { selecionar(indice); } } className="btn btn-success">Selecionar</button></td>
                            </tr>
                            <Collapse isOpen={activeIndex === indice}>
                                <Servicos valor={indice} className={classNames("hide-table-padding collapsed in p-3", {
                                    show: activeIndex === indice,
                                    hide: activeIndex !== indice
                                })}/>
                               
                            </Collapse></>
                        
                        ))
                        
                    }
                    
                </tbody>
            </table>
        </div>
    )
}

function TabelaSemItens() {
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Selecionar</th>
                </tr>
            </thead>
            <tbody>
              
            </tbody>
        </table>
    )
}
export default TabelaOrdem;