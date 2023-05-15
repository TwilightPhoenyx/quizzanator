import { Link, useNavigate, useParams } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewQuestion, fetchLoadQuestion, fetchLoadAnswers, fetchUpdateQuestion } from "../lib/fetch/fetchQuestion.mjs";
import { queryOptionalParamId } from "../lib/config.mjs";

import InputNumber from "../components/InputNumber.jsx";
import InputText from "../components/InputText.jsx";
import Answer from "../components/Answer.jsx";
import styles from "./styles/CreateQuestionView.module.css"


function QuestionView() {

    const { loadData } = useContext(Context);
    const navigate = useNavigate();
    const params = useParams();
    const TestId = params.testId
    const QuestionId = params.questionId

    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const [renderAnswers, setRenderAnswers] = useState(false)
    
    const stateQuestion = useState("Nueva pregunta");
    const [questionText, setQuestionText] = stateQuestion;
    const stateTimer = useState(0);
    const [timer, setTimer] = stateTimer;
    const stateNumberOfAnswers = useState(2);
    const [numberOfAnswers, setNumberOfAnswers] = stateNumberOfAnswers;
   
    const [answers, setAnswers] = useState([]);
    const [oldAnswers, setOldAnswers] = useState([])
   

    useEffect(
        ()=>{ 
            setIsNotFirstRender(true)
        },
        []
    );

    useEffect(
        ()=>{ 
            if (!!QuestionId && isNotFirstRender === true) {
                fetchLoadQuestion(
                    (queryOptionalParamId + QuestionId),
                    TestId,
                    handlerResponseLoadQuestion
                )
            } else if (!QuestionId) {
                setRenderAnswers(true)
            }
        },
        [isNotFirstRender]
    );

    useEffect(
        ()=>{
            if (renderAnswers) {
                const newAnswer = []
                let counter = 0
                while (counter < numberOfAnswers) {
                    newAnswer.push( 
                        oldAnswers[counter] ? 
                        oldAnswers[counter] : {answerText: "Respuesta "+ (counter+1), isCorrect: false} 
                    )
                    counter++
                }
                setAnswers(newAnswer)
            }
        },
        [numberOfAnswers, renderAnswers]
    );

    function CreateQuestion(){
        if (!QuestionId){
            fetchNewQuestion(
                TestId,
                { questionText, timer, numberOfAnswers, answers },
                handlerResponse
            )
        } else {
            fetchUpdateQuestion(
                QuestionId,
                { questionText, timer, numberOfAnswers, TestId, answers },
                handlerResponse
            )
        }
    };

    function handlerResponse(_) {
        loadData()
        navigate("/test_creation/"+ TestId)

    };

    function handlerResponseLoadQuestion(response) {
        setTimer(response.timer)
        setNumberOfAnswers(response.numberOfAnswers)
        setQuestionText(response.questionText)
        fetchLoadAnswers(QuestionId, handlerLoadAnswers)
    };

    function handlerLoadAnswers(data){
        setOldAnswers(data)
        setRenderAnswers(true)
    };


    function handlerClickConfirm(){
        CreateQuestion()
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
            <div className={styles.answersContainer}>
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
            </div>
            <button onClick={handlerClickConfirm}>Confirmar</button>
            <Link to={"/test_creation/"+ TestId}><button>Cancelar</button></Link>
        </>
    )

}

export default QuestionView;