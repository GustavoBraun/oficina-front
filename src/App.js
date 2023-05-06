import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import NavBar from './componentes/layout/NavBar';
import Cargos from './componentes/paginas/Cargos';
import Clientes from './componentes/paginas/Clientes';
import Home from './componentes/paginas/Home';
import OrdemServico from './componentes/paginas/OrdemServico';
import Usuarios from './componentes/paginas/Usuarios';
import Veiculos from './componentes/paginas/Veiculos';
import './Css/App.css'
function App() {

  return (
    <Router>
      <NavBar/>

        <Routes>
          <Route exact path='/' element={<Home/>}></Route>
          <Route path='/cargos' element={<Cargos/>}></Route>
          <Route path='/usuarios' element={<Usuarios/>}></Route> 
          <Route path='/clientes' element={<Clientes/>}></Route> 
          <Route path='/veiculos' element={<Veiculos/>}></Route> 
          <Route path='/ordens' element={<OrdemServico/>}></Route> 

        </Routes>

    </Router>

  )
}

export default App;
