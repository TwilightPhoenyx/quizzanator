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
            <span>{answerData.answerText}</span>
            {isAnswered === true && <span>{answerData.isCorrect === true ? "✔️" : "❌"}</span>}
            {isAnswered !== true && <button onClick={handlerClickAnswer}>O</button>}
            
        </div>
    );

};

export default CheckAnswer;