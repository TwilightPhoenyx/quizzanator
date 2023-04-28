import { useState } from "react";
import { Link } from "react-router-dom";

function QuestionInfo({questionData}){

    return(
        <>
            <span>{questionData.questionText}</span> Id:{questionData.id}
            <Link 
                to={"/test_creation/question_creation"}
                state={{ QuestionId: questionData.id }} 
            >
                <button>Editar</button>
            </Link>
        </>
    );

};

export default QuestionInfo;