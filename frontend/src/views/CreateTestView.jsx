import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewTest, fetchLoadTests, fetchUpdateTest, fetchDeleteTest } from "../lib/fetch/fetchTest.mjs";
import { fetchLoadQuestion } from "../lib/fetch/fetchQuestion.mjs";
import { queryOptionalParamId } from "../lib/config.mjs";

import styles from "./styles/CreateTestView.module.css"

import InputText from "../components/InputText.jsx";
import QuestionInfo from "../components/QuestionInfo.jsx";


function CreateTestView() {

    const { loadData } = useContext(Context)
    const navigate = useNavigate();
    const params = useParams();
    const stateTitle = useState("Nuevo Test");

    const [TestId, setTestId] = useState(params.testId)
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
            loadTest()
        },
        [isNotFirstRender]
    );

    function loadTest(){
        if (!TestId && isNotFirstRender === true) {
            fetchNewTest(
                { title },
                handlerResponseNewTest
            )
        } else if (!!TestId) {
            fetchLoadTests(
                (queryOptionalParamId + TestId),
                handlerResponseLoadTest
            )
            fetchLoadQuestion("", TestId, setQuestions)
        }
    };

    function updateTest(){
        fetchUpdateTest(
            TestId,
            { title },
            handlerResponse
        )
    };

    function handlerClickSumbmit(){
        if (title === "") {
            alert("Pon un título a tu test")
        } else {
            updateTest()
            setTitle(null)
            navigate("/test_list/")
        }
    };

    function handlerGoToCreateQuestion(){
        updateTest()
        navigate("/test_creation/"+ TestId +"/question_creation")
    };

    function handlerResponseLoadTest(response) {
        setTitle (response.title)
        loadData()
    };

    function handlerResponseNewTest(response) {
        setTestId (response.id)
        loadData()
    };

    function handlerClickCancel(){
        /*fetchDeleteTest(
            TestId,
            handlerResponse
        )
        navigate("/")*/
        navigate("/test_list/")
    };

    function handlerResponse(_){
        loadData()
    };
    
    return(
        <>
            <div>
                <div className={styles.bigText}>
                    <label>✎</label>
                    <InputText stateValue={stateTitle}/>
                </div>
                <button className={styles.additionButton} onClick={handlerGoToCreateQuestion}>
                   Nueva Pregunta
                </button>
                <ol>
                    {questions.map(
                        question=><li key={question.id}>
                            <QuestionInfo TestId={TestId} questionData={question} loadTest={loadTest}/>
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