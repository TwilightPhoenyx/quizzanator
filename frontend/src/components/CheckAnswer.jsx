import styles from "./styles/CheckAnswer.module.css"

function CheckAnswer({answerData, setMessage, setAuto, stateIsAnswered, stateCorrectAnswers}){

    const [isAnswered, setIsAnswered] = stateIsAnswered; 
    let [correctAnswers, setCorrectAnswers] = stateCorrectAnswers;
    
    function handlerClickAnswer(){
        if (answerData.isCorrect === true){
            setMessage("✔️Correcto!")
            setCorrectAnswers(correctAnswers+1)
        } else {
            setMessage("❌Incorrecto...")
        }
        setIsAnswered(true)
    };

    return(
        <div>
            {isAnswered !== true && 
                <button className={styles.answerButton} onClick={handlerClickAnswer}>
                    <span>{answerData.answerText}</span>
                </button>
            }
            {isAnswered === true && 
                <span className={
                        [
                            styles.answerDisplay,
                            answerData.isCorrect === true ? styles.greenBackground : styles.redBackground,
                        ].join(" ")       
                    }
                >
                    {answerData.answerText}
                </span>
            }        
        </div>
    );

};

export default CheckAnswer;