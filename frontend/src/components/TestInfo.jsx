import { useEffect, useState } from "react";
import { useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchDeleteTest } from "../lib/fetch/fetchTest.mjs";

function TestInfo({testData}){

    const { updateData } = useContext(Context) //Tomamos el sólo updateData del objeto guadrado en Context

    const [likePercentage, setLikePercentage] = useState()
    const timesLiked = testData.numberOfLikes
    const timesDisliked = testData.numberOfDislikes
    const testId = testData.id

    useEffect(
        calculateLikePercentage,
        []
    );

    function handlerClickDelete(){
        fetchDeleteTest(
            testId,
            handlerResponse
        )
    };

    function handlerResponse(response) {
        updateData()
    };


    function calculateLikePercentage(){
        let totalVotes = timesLiked + timesDisliked

        if (totalVotes > 0){
            setLikePercentage(
                ((timesLiked/totalVotes)*100).toFixed(0)
            )
        } else {
            setLikePercentage(50)
        }
    };

    return(
        <p>
            {testData.title} / 
            👍{likePercentage}% /
            Nota Media: {testData.averageScore}% / 
            {testData.timesCompleted} veces hecho
            <button onClick={handlerClickDelete}>Borrar Test</button>
        </p>
    )

};

export default TestInfo;