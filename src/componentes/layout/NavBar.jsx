import { Link } from "react-router-dom"

function NavBar() {

    return(
        <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
        <div className="container-fluid">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to='/' className="nav-link active">Home</Link>
                </li>
                <li class="nav-item">
                    <Link to='/cargos' className="nav-link active">Cargos</Link>
                </li>
                <li class="nav-item">
                    <Link to='/usuarios' className="nav-link active">Usuarios</Link>
                </li>
                <li class="nav-item">
                    <Link to='/ordens' className="nav-link active">Ordens de Serviço</Link>
                </li>
                <li class="nav-item">
                    <Link to='/clientes' className="nav-link active">Clientes</Link>
                </li>
                <li class="nav-item">
                    <Link to='/veiculos' className="nav-link active">Veículos</Link>
                </li>
            </ul>
            
            
        </div>
        </nav>
        
    )

}

export default NavBar