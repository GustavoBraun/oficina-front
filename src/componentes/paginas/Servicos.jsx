import { useState } from "react"
import TabelaServicos from "../tabelas/TabelaServicos";
import styles from '../CssComponentes/TableCss.module.css';
import FormularioServicos from "../formularios/formularioServicos";

function Servicos() {
    
    const [servicos] = useState()

 
    return(
        <div className={styles.collapseOrdens}>
            <TabelaServicos vetor={servicos}/>
            <FormularioServicos/>
        </div>
    )
}
export default Servicos;