import { Link, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from "react";
import { fetchLoadTests } from "./lib/fetch/fetchTest.mjs"

import CreateTestView from "./views/CreateTestView.jsx";
import TestListView from "./views/TestListView.jsx";

function App() {

    const [tests, setTests] = useState([])

    useEffect(
            updateData,
        []
    );
      
    function updateData(){
      fetchLoadTests(handlerData)
    };

    function handlerData(data) {
        setTests(data)
    };

    return (
      <>
        <nav>
            <Link to={"/test_creation"}><button>Crear Test Nuevo</button></Link>
            <Link to={"/test_list"}><button>Lista de Tests</button></Link>
        </nav>


        <Routes>
            <Route 
              path='/test_creation' 
              element={
                <CreateTestView updateDataFunction={updateData}/>
              }
            />
            <Route 
              path='/test_list' 
              element={
                <TestListView loadedTests={tests} updateDataFunction={updateData}/>
              }
            />
        </Routes>
      </>
    )
    
}

export default App;
