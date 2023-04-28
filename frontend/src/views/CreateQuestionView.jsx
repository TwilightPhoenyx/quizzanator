import { Link, useNavigate, useLocation } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewQuestion } from "../lib/fetch/fetchQuestion.mjs";

import InputNumber from "../components/InputNumber.jsx";
import InputText from "../components/InputText.jsx";
import Answer from "../components/Answer.jsx";


function CreateQuestionView({TestId}) {


    const { loadData } = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const stateQuestion = useState("Nueva pregunta");
    const stateTimer = useState(0);
    const stateNumberOfAnswers = useState(2);

    const [questionText, setQuestionText] = stateQuestion;
    const [timer, setTimer] = stateTimer;
    const [numberOfAnswers, setNumberOfAnswers] = stateNumberOfAnswers;
    const [answers, setAnswers] = useState([]);
    const oldAnswers = []

    //location.state?.QuestionId === undefined && console.log("good")

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
                    //console.log(newAnswer)
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
        loadData()
        //console.log(response)
        navigate("/test_creation")
        //navigate("/test_list")
    };

    function handlerClickConfirm(){
        createQuestion()
    };



    return(
        <>
            <div>
                <InputText stateValue={stateQuestion}/>
            </div>
            <InputNumber 
                text="Nº de respuestas"
                minValue="2" 
                maxValue="4" 
                stateNumber={stateNumberOfAnswers}
            />
            <InputNumber
                text="Temporizador" 
                minValue="0" 
                maxValue="120" 
                stateNumber={stateTimer}
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
            <Link to={"/test_creation"}><button>Cancelar</button></Link>
        </>
    )

}

export default CreateQuestionView;