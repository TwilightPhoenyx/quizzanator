import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewTest, fetchLoadTests, fetchUpdateTest, fetchDeleteTest } from "../lib/fetch/fetchTest.mjs";
import { fetchLoadQuestion } from "../lib/fetch/fetchQuestion.mjs";
import { queryOptionalParamId } from "../lib/config.mjs";

import InputText from "../components/InputText.jsx";
import QuestionInfo from "../components/QuestionInfo.jsx";


function CreateTestView({stateTestId}) {

    const { loadData } = useContext(Context)
    const navigate = useNavigate();
    const stateTitle = useState("Nuevo Test");

    const [TestId, setTestId] = stateTestId;
    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const [title, setTitle] = stateTitle;
    const [questions, setQuestions] = useState([]);

    useEffect(
        ()=>{ 
            setIsNotFirstRender(true)
        },
        []
    );

    useEffect(
        ()=>{ 
            if (TestId === null && isNotFirstRender === true) {
                fetchNewTest(
                    { title },
                    handlerResponseNewTest
                )
            } else if (TestId !== null) {
                fetchLoadTests(
                    (queryOptionalParamId + TestId),
                    handlerResponseLoadTest
                )
                fetchLoadQuestion(TestId, setQuestions)
            }
        },
        [isNotFirstRender]
    );

    function handlerClickSumbmit(){
        updateTest()
        setTitle(null)
        navigate("/test_list")
    };

    function handlerGoToCreateQuestion(){
        updateTest()
        navigate("/test_creation/question_creation")
    };

    function handlerResponseLoadTest(response) {
        setTitle (response.title)
        loadData()
    };

    function handlerResponseNewTest(response) {
        setTestId (response.id)
        loadData()
    };

    function updateTest(){
        fetchUpdateTest(
            TestId,
            { title },
            handlerResponse
        )
    };

    function handlerClickCancel(){
        fetchDeleteTest(
            TestId,
            handlerResponse
        )
        navigate("/")
    };

    function handlerResponse(_){
        loadData()
    };
    
    return(
        <>
            <div>
                <label>Introduce título de nuevo Test</label>
                <InputText stateValue={stateTitle}/>
                <button onClick={handlerGoToCreateQuestion}>Añadir pregunta</button>

                <ol>Lista de preguntas
                    {questions.map(
                        question=><li key={question.id}>
                            <QuestionInfo questionData={question}/>
                        </li>
                        )
                    }
                </ol>

            </div>
            <button onClick={handlerClickSumbmit}>Subir</button>
            <button onClick={handlerClickCancel}>Cancelar</button>
        </>
    )
};

export default CreateTestView;