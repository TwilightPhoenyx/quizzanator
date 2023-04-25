import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchNewTest } from "../lib/fetch/fetchTest.mjs";
import { fetchLoadQuestion } from "../lib/fetch/fetchQuestion.mjs";

import InputText from "../components/InputText.jsx";




function CreateTest() {

    const { updateData, TestId, setTestId } = useContext(Context)
    const navigate = useNavigate();

    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const [title, setTitle] = useState("");
    const [titleTextboxValue, setTitleTextboxValue] = useState("Nuevo Test");
    const [questions, setQuestions] = useState([]);


    useEffect(
        ()=>{ 
            setIsNotFirstRender(true)
        },
        []
    );

    useEffect(
        ()=>{ 
            if (TestId === null && isNotFirstRender === true) {
                autoCreateTest()
            } else {
                TestId !== null && loadQuestions()
            }
        },
        [isNotFirstRender]
    );

    useEffect(
        ()=>{ 
            setTitle(titleTextboxValue)
        },
        [titleTextboxValue]
    );


    function autoCreateTest(){
        fetchNewTest(
            { title },
            handlerResponse
        ) 
    };

    function loadQuestions(){
        fetchLoadQuestion(TestId, setQuestions)
    }

    function handlerResponse(response) {
        setTestId (response.id)
        updateData()
        //navigate("/test_list")
    };

    return(
        <>
            <div>
                <label>Introduce título de nuevo Test</label>
                <InputText value={titleTextboxValue} valueSetter={setTitleTextboxValue}/>
                <Link to={"/test_creation/question_creation"}><button>Añadir pregunta</button></Link>

                <ol>Lista de preguntas
                    {questions.map(
                        question=><li key={question.id}>
                            <p>{question.questionText}</p>
                        </li>
                        )
                    }
                </ol>

            </div>
            {
            //<button onClick={handlerClickSumbmit}>Subir</button>}
            }
        </>
    )
};

export default CreateTest;