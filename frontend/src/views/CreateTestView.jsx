import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchNewTest } from "../lib/fetch/fetchTest.mjs";

function CreateTest({updateDataFunction}) {

    const navigate = useNavigate();

    const [title, setTitle] = useState("")
    const [inputTestTitle, setInputTestTitle] = useState("")


    useEffect(
        ()=>{ 
            setTitle(inputTestTitle)
        },
        [inputTestTitle]
      );

    function handlerInputTestTitle(event){
        setInputTestTitle(event.target.value)
    };

    function handlerClickSumbmit(){
        fetchNewTest(
            {title},
            handlerResponse
        ) 
    };

    function handlerResponse(response) {
        updateDataFunction()
        navigate("/test_list")
    };

    return(
        <>
            <label>Introduce título de nuevo Test</label>
            <input onInput={handlerInputTestTitle} type="text"/>
            <button onClick={handlerClickSumbmit}>Subir</button>
        </>
    )
};

export default CreateTest