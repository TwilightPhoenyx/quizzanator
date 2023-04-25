import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewQuestion } from "../lib/fetch/fetchQuestion.mjs";

import InputNumber from "../components/InputNumber.jsx";
import InputText from "../components/InputText.jsx";
import Answer from "../components/Answer.jsx";




function CreateQuestionView() {

    const { updateData, TestId } = useContext(Context);
    const navigate = useNavigate();

    const [questionText, setquestionText] = useState("Nueva pregunta");
    const [timer, setTimer] = useState(0);
    const [numberOfAnswers, setNumberOfAnswers] = useState(2);
    const [answers, setAnswers] = useState([]);
    const oldAnswers = []

    useEffect(
        ()=>{
          const newAnswer = []
                let counter = 0
                while (counter < numberOfAnswers) {
                    newAnswer.push( 
                        oldAnswers[counter] ? 
                        oldAnswers[counter] : {answerText: "Respuesta "+ (counter+1), isCorrect: false} 
                    )
                    /* <div key={counter+1}>
                    <span>Respuesta {counter+1}</span><input type="checkbox"></input>
                    </div>*/
                    //const answerData = {answerText: "Respuesa", isCorrect: false}
                    console.log(newAnswer)
                    counter++
                    
                }
                setAnswers(newAnswer)
    
        },
        [numberOfAnswers]
    );

    function createQuestion(){
        fetchNewQuestion(
            TestId,
            { questionText, timer, numberOfAnswers, answers },
            handlerResponse
        ) 
    };

    function handlerResponse(response) {
        updateData()
        console.log(response)
        navigate("/test_creation")
        //navigate("/test_list")
    };

    function handlerClickConfirm(){
        createQuestion()
    };



    return(
        <>
            <div>
                <InputText value={questionText} valueSetter={setquestionText}/>
            </div>
            <InputNumber 
                text="Nº de respuestas"
                minValue="2" 
                maxValue="4" 
                number={numberOfAnswers} 
                numberSetter={setNumberOfAnswers}
            />
            <InputNumber
                text="Temporizador" 
                minValue="0" 
                maxValue="120" 
                number={timer} 
                numberSetter={setTimer}
            />
            <p>Aqui se editan las preguntas del test con Id:{TestId}</p>
            {
                answers.map( 
                    (answer, arrayPosition) => 
                        <Answer 
                            key={arrayPosition} 
                            id={arrayPosition} 
                            allAnswers={[answers, setAnswers]} 
                        />
                )
            }
            <button onClick={handlerClickConfirm}>Confirmar</button>
        </>
    )

}

export default CreateQuestionView;