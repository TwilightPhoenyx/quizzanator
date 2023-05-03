import { useState } from "react";
import { Link } from "react-router-dom";

function QuestionInfo({TestId, questionData}){

    return(
        <>
            <span>{questionData.questionText}</span> Id:{questionData.id}
            <Link to={"/test_creation/"+ TestId +"/question_creation/" + questionData.id}>
                <button>Editar</button>
            </Link>
        </>
    );

};

export default QuestionInfo;