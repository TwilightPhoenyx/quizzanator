import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../services/ContextComponent.jsx";

import { fetchDeleteTest } from "../lib/fetch/fetchTest.mjs";




function TestInfo({testData}){

    const { loadData } = useContext(Context) //Tomamos el sólo loadData del objeto guadrado en Context

    const [likePercentage, setLikePercentage] = useState()
    const timesLiked = testData.numberOfLikes
    const timesDisliked = testData.numberOfDislikes
    const TestId = testData.id

    useEffect(
        calculateLikePercentage,
        []
    );

    function handlerClickDelete(){
        fetchDeleteTest(
            TestId,
            handlerResponse
        )
    };

    function handlerResponse(response) {
        loadData()
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
        <div>
                <Link to={"/take_a_test/" + TestId + "/" + testData.title}>
                    {testData.title} / 
                    👍{likePercentage}% /
                    Nota Media: {testData.averageScore}% / 
                    {testData.timesCompleted} veces hecho
                </Link>
            <button onClick={handlerClickDelete}>Borrar Test</button>
        </div>
    )

};

export default TestInfo;