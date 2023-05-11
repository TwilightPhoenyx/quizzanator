import { useEffect, useState } from "react";

import CheckAnswer from "../components/CheckAnswer";

import styles from "./styles/TakeTestQuestionView.module.css"

function TakeTestQuestionView(
        {
            questionData, 
            stateIndex,
            stateCorrectAnswers, 
            totalQuestions, 
            setIsTestFinished, 
            setIsTestInProcess
        }
    ){

    let [answerIndex, setAnswerIndex] = stateIndex

    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(questionData.timer);
    const stateIsAnswered = useState(false);
    const [isAnswered, setIsAnswered] = stateIsAnswered;
    const [auto, setAuto] = useState(false);
    

    useEffect(
        ()=>{ 
            setTimer(questionData.timer)
            setIsAnswered(false)
            setMessage("")
            setAuto(true)
        },
        [answerIndex]
    );

    useEffect(
        ()=>{
          let timerCode
          if (auto === true && isAnswered !== true && timer !== 0) { timerCode = setTimeout(timerCountdown, 1000) }
          return ()=>{clearTimeout(timerCode)}
        },
        [auto, isAnswered, timer]
    );

    function timerCountdown(){
        if (timer > 1) {
            setTimer(timer-1)
        } else {
            setTimer(0)
            setAuto(false)
            setIsAnswered(true)
            setMessage("❌Se acabó el tiempo")
        }
    };

    function handlerClickNextQuestion(){
        if (answerIndex+1 <= totalQuestions-1) {
            setAnswerIndex(answerIndex+1)
        } else {
            setIsTestInProcess(false)
            setIsTestFinished(true)
        }
        
    };

    
    return(
        <div className={styles.questionContainer}>
            <h2>{questionData.questionText}</h2>
            {/*timer !== 0 &&*/ isAnswered !== true && <p>{timer}</p>}
            {isAnswered === true && <p>{message}</p>}
            <div className={styles.answerContainer}>
                {questionData.Answers.map(
                    answer=> 
                        <CheckAnswer 
                            key={answer.id} 
                            answerData={answer} 
                            setMessage={setMessage}
                            setAuto={setAuto} 
                            stateIsAnswered={stateIsAnswered}
                            stateCorrectAnswers={stateCorrectAnswers}
                        />
                    )
                }
            </div>
            <button 
                className={isAnswered ? styles.nextButton : styles.nextButtonDisabled} 
                onClick={handlerClickNextQuestion}>Siguiente
            </button>
        </div>
    );

};

export default TakeTestQuestionView;