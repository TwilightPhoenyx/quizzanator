import { useState, useEffect} from "react";

import InputText from "./InputText";




function Answer({id, allAnswers}){

    const [answers, setAnswers] = allAnswers;
    const newAnswers = [...answers];
    const stateAnswers = useState (newAnswers[id].answerText);
    const [answerText, setAnswerText] = stateAnswers
    const [isCorrect, setIsCorrect] = useState (newAnswers[id].isCorrect)

    useEffect(
        ()=>{ 
            newAnswers[id].answerText = answerText;
            newAnswers[id].isCorrect = isCorrect;
            setAnswers(newAnswers);
            //console.log("este es el array", answers)
        },
        [answerText, isCorrect]
    );

    /*console.log(answerText, isCorrect)*/

    function handlerClickIsCorrect(){
        setIsCorrect(!isCorrect)
    };


    return(
        <div>
            <InputText stateValue={stateAnswers}/>
            <input type="checkbox" onClick={handlerClickIsCorrect} defaultValue={isCorrect}></input>
        </div>
    )

};

export default Answer;