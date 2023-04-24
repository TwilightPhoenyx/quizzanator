import { useNavigate } from "react-router-dom";
import { Context } from "../services/ContextComponent.jsx";
import { useContext, useState } from "react";

function CreateQuestionView() {

    const { TestId } = useContext(Context);
    const navigate = useNavigate();

    const [inputQuestionTextValue, setInputQuestionTextValue] = useState("Nueva pregunta")

    function handlerClickReturnToCreateTest(){
        navigate("/test_creation")
        console.log(inputQuestionTextValue)
    }

    function handlerInputQuestionText(event){
        setInputQuestionTextValue(event.target.value);
    };

    return(
        <>
            <input onInput={handlerInputQuestionText} type="text" defaultValue={inputQuestionTextValue}/>
            <p>Aqui se editan las preguntas del test con Id:{TestId}</p>
            <button onClick={handlerClickReturnToCreateTest}>Volver a crear Test</button>
        </>
    )

}

export default CreateQuestionView;