import { useNavigate } from "react-router-dom";

import { fetchDeleteQuestion } from "../lib/fetch/fetchQuestion.mjs";

function QuestionInfo({TestId, questionData, loadTest}){

    const navigate = useNavigate();


    function handlerClickEditQuestion() {
        navigate("/test_creation/"+ TestId +"/question_creation/" + questionData.id)
    };

    function handlerClickDeleteQuestion(){
        fetchDeleteQuestion(
            questionData.id,
            handlerResponse
        )
    };

    function handlerResponse(_) {
        loadTest()
    };

    return(
        <>
            <span>{questionData.questionText}</span>
            <button onClick={handlerClickEditQuestion}>Editar</button>
            <button onClick={handlerClickDeleteQuestion}>Borrar</button>
        </>
    );

};

export default QuestionInfo;