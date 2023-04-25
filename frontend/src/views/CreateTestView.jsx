import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";
import { fetchNewTest } from "../lib/fetch/fetchTest.mjs";

import InputText from "../components/InputText.jsx";

function CreateTest() {

    const { updateData, TestId, setTestId } = useContext(Context)
    const navigate = useNavigate();

    const [isNotFirstRender, setIsNotFirstRender] = useState(false);
    const [title, setTitle] = useState("");
    const [titleTextboxValue, setTitleTextboxValue] = useState("Nuevo Test");


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
                console.log(TestId)
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


    /*
    function handlerClickSumbmit(){
        fetchNewTest(
            { title },
            handlerResponse
        ) 
    };
    */

    function autoCreateTest(){
        fetchNewTest(
            { title },
            handlerResponse
        ) 
    };

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
            </div>
            {
            //<button onClick={handlerClickSumbmit}>Subir</button>}
            }
        </>
    )
};

export default CreateTest;