import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";

import { fetchLoadQuestion } from "../lib/fetch/fetchQuestion.mjs";

import TakeTestQuestionView from "./TakeTestQuestionView.jsx";

function TakeTestView(){
    const params = useParams();

    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const [questionsData, setQuestionsData] = useState([])
    const [isTestInProcess, setIsTestInProcess] = useState(false)
    const [isTestFinished, setIsTestFinished] = useState(false)
    let stateAnswerIndex = useState(0)
    let [answerIndex, setAnswerIndex] = stateAnswerIndex

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

    return(
        <>
            <h1>{params.testTitle}</h1>
            {isTestInProcess !== true && <button onClick={handlerClickStartTest}>Empezar</button>}
            {isTestInProcess === true && questionsData.length > 0 && 
                <>
                    <TakeTestQuestionView 
                        questionData={questionsData[answerIndex]} 
                        stateIndex={stateAnswerIndex}
                        totalQuestions={questionsData.length}
                        setIsTestFinished={setIsTestFinished}
                        setIsTestInProcess={setIsTestInProcess}
                    />
                </>
            }
            {isTestFinished && <p>Test Terminado</p>}
        </>
    );


};

export default TakeTestView