function CheckAnswer({answerData, setMessage, setIsAnswered}){

    function handlerClickAnswer(){
        if (answerData.isCorrect === true){
            setMessage("Correcto!")
        } else {
            setMessage("Incorrecto...")
        }
        setIsAnswered(true)
    };

    return(
        <div>
            <span>{answerData.answerText}</span>
            <button onClick={handlerClickAnswer} value={answerData.isCorrect}>O</button>
        </div>
    );

};

export default CheckAnswer;