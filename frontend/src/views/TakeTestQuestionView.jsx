import { useEffect, useState } from "react";

import CheckAnswer from "../components/CheckAnswer";

function TakeTestQuestionView({questionData, stateIndex, totalQuestions, setIsTestFinished, setIsTestInProcess}) {

    let [answerIndex, setAnswerIndex] = stateIndex

    const [timer, setTimer] = useState(questionData.timer);
    const [isAnswered, setIsAnswered] = useState(false)
    const [message, setMessage] = useState("")

    useEffect(
        ()=>{ 
            setTimer(questionData.timer);
            setIsAnswered(false);
            setMessage("");
        },
        [answerIndex]
    );

    function handlerClickNextQuestion(){
        if (answerIndex+1 <= totalQuestions-1) {
            setAnswerIndex(answerIndex+1)
        } else {
            setIsTestInProcess(false)
            setIsTestFinished(true)
        }
        
    };
    
    return(
        <div>
            <h2>{questionData.questionText}</h2>
            <p>{timer}</p>
            <p>{message}</p>
            {questionData.Answers.map(
                answer=> 
                    <CheckAnswer 
                        key={answer.id} 
                        answerData={answer} 
                        setMessage={setMessage} 
                        setIsAnswered={setIsAnswered}
                    />
                )
            }
            {isAnswered && <button onClick={handlerClickNextQuestion}>Siguiente</button>}
        </div>
    );

};

export default TakeTestQuestionView;