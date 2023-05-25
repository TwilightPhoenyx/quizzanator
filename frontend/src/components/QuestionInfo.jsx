import { useNavigate } from "react-router-dom";
import { Context } from "../services/ContextComponent.jsx";

import { fetchDeleteQuestion } from "../lib/fetch/fetchQuestion.mjs";

import styles from "./styles/QuestionInfo.module.css"
import { useContext } from "react";

function QuestionInfo({TestId, questionData, loadTest}){

    const navigate = useNavigate();
    const { token } = useContext(Context)


    function handlerClickEditQuestion() {
        navigate("/test_creation/"+ TestId +"/question_creation/" + questionData.id)
    };

    function handlerClickDeleteQuestion(){
        fetchDeleteQuestion(
            questionData.id,
            token,
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