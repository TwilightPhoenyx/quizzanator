import { useState, useEffect} from "react";

import InputText from "./InputText";
import styles from "./styles/Answer.module.css"




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
            
        },
        [answerText, isCorrect]
    );


    function handlerClickIsCorrect(){
        setIsCorrect(!isCorrect)
    };


    return(
        <div
            className={
                [
                    styles.answerRow,
                    id % 2 === 0 ? styles.evenRowBackground : styles.oddRowBackground,
                ].join(" ")      
            }
        >
            <label>✎</label>
            <InputText stateValue={stateAnswers}/>
            <label>
                <input type="checkbox" onClick={handlerClickIsCorrect} defaultChecked={isCorrect}/>
                <span className={styles.checkboxLabel}>{isCorrect ? "Correcta" : "Incorrecta"}</span>
            </label>
        </div>
    )

};

export default Answer;