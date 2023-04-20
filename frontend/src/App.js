import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import { fetchLoadTests } from "./lib/fetch/fetchTest.mjs"
import { ContextComponent } from './services/ContextComponent.jsx';

import CreateTestView from "./views/CreateTestView.jsx";
import TestListView from "./views/TestListView.jsx";

function App() {

    const [tests, setTests] = useState([])

    useEffect(
            updateData,
        []
    );
      
    function updateData(){
      fetchLoadTests(setTests)
    }; 

    return (
      <>
        <nav>
            <Link to={"/test_creation"}><button>Crear Test Nuevo</button></Link>
            <Link to={"/test_list"}><button>Lista de Tests</button></Link>
        </nav>

        <ContextComponent contextValue={{updateData}}> 

          <Routes>
              <Route 
                path='/test_creation' 
                element={
                  <CreateTestView/>
                }
              />
              <Route 
                path='/test_list' 
                element={
                  <TestListView loadedTests={tests}/>
                }
              />
          </Routes>

        </ContextComponent>
      </>
    )
    
}

export default App;
