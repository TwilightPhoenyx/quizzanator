import { Route, Routes, useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import { ContextComponent } from './services/ContextComponent.jsx';

import { fetchLoadTests } from "./lib/fetch/fetchTest.mjs";

import MainMenuView from './views/MainMenuView.jsx';
import CreateTestView from "./views/CreateTestView.jsx";
import TestListView from "./views/TestListView.jsx";
import CreateQuestionView from './views/CreateQuestionView.jsx';
import TakeTestView from './views/TakeTestView.jsx';

import "./App.css"

function App() {

    const navigate = useNavigate();

    const [tests, setTests] = useState([]);

    useEffect(
            loadData,
        []
    );

    function handlerGoToCreateTest(){
      navigate("/test_creation/");
    };

    function handlerReturnToMainMenu(){
      navigate("/");
    };
      
    function loadData(){
      fetchLoadTests("", setTests);
    }; 

    return (
      <>
        <nav>
            <button onClick={handlerGoToCreateTest}>¡Crea tu test!</button>
            <button onClick={handlerReturnToMainMenu}>Volver a inicio</button>
        </nav>
        <main>
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
                  <MainMenuView />
                }
              />
              <Route 
                path='/test_creation/:testId?' 
                element={
                  <CreateTestView/>
                }
              />
                <Route 
                path='/test_creation/:testId/question_creation/:questionId?' 
                element={
                  <CreateQuestionView/>
                }
              />
              <Route 
                path='/test_list/' 
                element={
                  <TestListView loadedTests={tests}/>
                }
              />
              <Route 
                path='/take_a_test/:testId/:testTitle' 
                element={
                  <TakeTestView/>
                }
              />
            </Routes>
          </ContextComponent>
        </main>
        <footer>
          <p>©️ Copyright 2023. </p>
        </footer>
      </>
    )
    
}

export default App;
