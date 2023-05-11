import { useParams, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";

import { fetchLoadQuestion } from "../lib/fetch/fetchQuestion.mjs";

import TakeTestQuestionView from "./TakeTestQuestionView.jsx";
import TestResultsView from "./TestResultsView.jsx";

import styles from "./styles/TakeTestView.module.css"

function TakeTestView(){
    const params = useParams();
    const navigate = useNavigate();

    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const [questionsData, setQuestionsData] = useState([]);
    const [isTestInProcess, setIsTestInProcess] = useState(false);
    const [isTestFinished, setIsTestFinished] = useState(false)
    let stateAnswerIndex = useState(0);
    let [answerIndex, setAnswerIndex] = stateAnswerIndex;
    let stateCorrectAnswers = useState(0);
    let [correctAnswers, setCorrectAnswers] = stateCorrectAnswers;

    useEffect(
        ()=>{ 
            setIsNotFirstRender(true)
        },
        []
    );

    useEffect(
        ()=>{ 
            fetchLoadQuestion("", params.testId, setQuestionsData)
        },
        [isNotFirstRender]
    );

    function handlerClickStartTest(){
        setIsTestInProcess(true)
    };

    function handlerClickReturn(){
        navigate("/test_list/")
    }

    return(
        <div className={styles.testScreen}>
            <h1>{params.testTitle}</h1>
            {
                isTestInProcess  !== true && isTestFinished !== true &&
                    <>
                        <h2>¿Comenzamos?</h2>
                        <button className={styles.titleButton} onClick={handlerClickStartTest}>
                            <span className={styles.arrowMarkers}>⮞ </span>
                            ¡Adelante!
                            <span className={styles.arrowMarkers}> ⮜</span>
                        </button>
                        <button className={styles.titleButton} onClick={handlerClickReturn}>
                            <span className={styles.arrowMarkers}>⮞ </span>
                                Mejor no
                            <span className={styles.arrowMarkers}> ⮜</span> 
                        </button>
                    </>
                
            }
            {
                isTestInProcess === true && questionsData.length > 0 && 
                    <TakeTestQuestionView 
                        questionData={questionsData[answerIndex]} 
                        stateIndex={stateAnswerIndex}
                        stateCorrectAnswers={stateCorrectAnswers}
                        totalQuestions={questionsData.length}
                        setIsTestFinished={setIsTestFinished}
                        setIsTestInProcess={setIsTestInProcess}
                    />       
            }
            {
                isTestFinished && 
                    <TestResultsView 
                        TestId={params.testId} 
                        correctAnswers={correctAnswers} 
                        answerIndex={answerIndex} 
                    />
            }
        </div>
    );


};

export default TakeTestView