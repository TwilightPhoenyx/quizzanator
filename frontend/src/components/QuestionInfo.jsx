import { useNavigate } from "react-router-dom";

import { fetchDeleteQuestion } from "../lib/fetch/fetchQuestion.mjs";

import styles from "./styles/QuestionInfo.module.css"

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
        <div className={styles.flexContainer}>
           {questionData.questionText}
            <span>
                <button className="mini-button" onClick={handlerClickEditQuestion}>✎</button>
                <button className="mini-button" onClick={handlerClickDeleteQuestion}>✘</button>
            </span>      
        </div>
    );

};

export default QuestionInfo;