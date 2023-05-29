import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewTest, fetchLoadTests, fetchUpdateTest } from "../lib/fetch/fetchTest.mjs";
import { fetchLoadQuestion } from "../lib/fetch/fetchQuestion.mjs";
import { queryOptionalParamId } from "../lib/config.mjs";

import styles from "./styles/CreateTestView.module.css"

import InputText from "../components/InputText.jsx";
import QuestionInfo from "../components/QuestionInfo.jsx";


function CreateTestView() {

    const { loadData, token, sessionName, setNotification } = useContext(Context)
    const navigate = useNavigate();
    const params = useParams();
    const stateTitle = useState("Nuevo Test");

    const [TestId, setTestId] = useState(params.testId)
    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const [title, setTitle] = stateTitle;
    const [isPublished, setIsPublished] = useState(false)
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
                token,
                handlerResponseNewTest,
                setNotification
            )
        } else if (!!TestId) {
            fetchLoadTests(
                (queryOptionalParamId + TestId),
                handlerResponseLoadTest,
                setNotification
            )
            fetchLoadQuestion("", TestId, setQuestions, setNotification)
        }
    };

    function updateTest(){
        fetchUpdateTest(
            TestId,
            { title, isPublished },
            token,
            handlerResponse,
            setNotification
        )
    };

    function handlerClickSumbmit(){
        if (title === "") {
            setNotification("Pon un título a tu test")
        } else {
            updateTest()
            setTitle(null)
            navigate("/user/" + sessionName)
        }
    };

    function handlerClickCancel(){
        navigate("/user/" + sessionName)
    };

    function handlerClickIsPublished(){
        setIsPublished(!isPublished)
        console.log(isPublished)
    }

    function handlerGoToCreateQuestion(){
        updateTest()
        navigate("/test_creation/"+ TestId +"/question_creation")
    };

    function handlerResponseLoadTest(response) {
        setTitle (response.title)
        setIsPublished(response.isPublished)
        console.log(response.isPublished)
        loadData()
    };

    function handlerResponseNewTest(response) {
        setTestId (response.id)
        loadData()
    };

    function handlerResponse(_){
        loadData()
    };
    
    return(
        <>
            <div>
                <div className={styles.bigText}>
                    <label>✎</label>
                    <InputText stateValue={stateTitle} type="text" maxLength="80"/>
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
            <div className={styles.buttonContainer}>
                <div>
                    <button onClick={handlerClickSumbmit}>Guardar</button>
                    <button onClick={handlerClickCancel}>Cancelar</button>
                </div>
                <label
                    className={
                        [
                            styles.checkboxLabel,
                            isPublished === true ? styles.greenBackground : styles.darkBlueBackground,
                        ].join(" ")  
                    }
                >
                    <input type="checkbox" onChange={handlerClickIsPublished} checked={isPublished}/>
                    <span> Publicado</span>
                </label>
            </div>
        </>
    )
};

export default CreateTestView;