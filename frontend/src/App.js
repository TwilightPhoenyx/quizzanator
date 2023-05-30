import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";
import { ContextComponent } from './services/ContextComponent.jsx';

import { fetchLoadTests } from "./lib/fetch/fetchTest.mjs";

import MainMenuView from './views/MainMenuView.jsx';
import CreateTestView from "./views/CreateTestView.jsx";
import TestListView from "./views/TestListView.jsx";
import CreateQuestionView from './views/CreateQuestionView.jsx';
import TakeTestView from './views/TakeTestView.jsx';
import LoginFormView from './views/LoginFormView.jsx';
import RegisterFormView from './views/RegisterFormView.jsx';
import UserProfileView from './views/UserProfileView.jsx';

import "./App.css"

function App() {

    const navigate = useNavigate();

    const [tests, setTests] = useState([]);
    const [token, setToken] = useState("");
    const defalultSessionName = "invitad@";
    const [sessionName, setSessionName] = useState(defalultSessionName)
    const notificationModal = useRef()
    let [notification, setNotification] = useState("");

    useEffect(
          ()=>{
            if (notification === "") {
              notificationModal.current.close()
            } else {
              notificationModal.current.showModal()
            }
          },
      [notification]
    );

    useEffect(
            loadData,
        []
    );


    function handlerReturnToMainMenu(){
      navigate("/");
    };

    function handlerGoToLogIn(){
      navigate("/login/");
    };

    function handlerClickLogOut(){
      setToken("")
      setSessionName(defalultSessionName)
      navigate("/")
    };

    function handlerClickCloseModal(){
      setNotification("")
    };
      
    function loadData(){
      fetchLoadTests("", "", setTests, setNotification);
    }; 

    return (
      <>
        <nav>
          {(token === "") && <button onClick={handlerGoToLogIn}>Inicia Sesión</button>}
          {token && <button onClick={handlerClickLogOut}>Cerrar Sesión</button>}
          {(token === "") && <p className="session-name">Hola, invitad@</p>}
          {token && 
              <Link to={"/user/" + sessionName}>
                <p className="session-name">Hola, {sessionName}</p>
              </Link>}
          <button onClick={handlerReturnToMainMenu}>Volver a inicio</button>
        </nav>
        <main>
          <ContextComponent contextValue={
              {
                loadData,
                token,
                setToken,
                sessionName,
                setSessionName,
                setNotification
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
              <Route 
                path='/login/' 
                element={
                  <LoginFormView/>
                }
              />
              <Route 
                path='/sign_up/' 
                element={
                  <RegisterFormView/>
                }
              />
              <Route 
                path='/user/:username' 
                element={
                  <UserProfileView/>
                }
              />
            </Routes>
          </ContextComponent>

          <dialog ref={notificationModal} id="modal">
                <span>{notification}</span>
                <button onClick={handlerClickCloseModal}>Aceptar</button>
          </dialog>

        </main>
        <footer>
          <p>©️ Copyright 2023. </p>
        </footer>
      </>
    )
    
}

export default App;
