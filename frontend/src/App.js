import { Link, Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ContextComponent } from './services/ContextComponent.jsx';

import { fetchLoadTests } from "./lib/fetch/fetchTest.mjs";

import LayoutView from './views/LayoutView.jsx';
import CreateTestView from "./views/CreateTestView.jsx";
import TestListView from "./views/TestListView.jsx";
import CreateQuestionView from './views/CreateQuestionView.jsx';

function App() {

    const navigate = useNavigate();
    const stateTestId = useState(null);

    const [tests, setTests] = useState([]);
    const [TestId, setTestId] = stateTestId;

    useEffect(
            loadData,
        []
    );

    function handlerGoToCreateTest(){
      navigate("/test_creation");
      setTestId(null);
    };
      
    function loadData(){
      fetchLoadTests("", setTests);
    }; 

    return (
      <>
        <nav>
            <button onClick={handlerGoToCreateTest}>Crear Test Nuevo</button>
            <Link to={"/"}><button>Inicio</button></Link>
        </nav>

        <ContextComponent contextValue={
            {
              loadData
            }
          }
          > 

          <Routes>
            <Route 
              path='/' 
              element={
                <LayoutView />
              }
            />
            <Route 
              path='/test_creation' 
              element={
                <CreateTestView stateTestId={stateTestId}/>
              }
            />
              <Route 
              path='/test_creation/question_creation' 
              element={
                <CreateQuestionView TestId={TestId}/>
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
