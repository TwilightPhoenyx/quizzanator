import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

import { fetchLoadTests, fetchUpdateTest } from "../lib/fetch/fetchTest.mjs";
import { queryOptionalParamId } from "../lib/config.mjs";

import styles from "./styles/TestResultView.module.css"
import thumbsUpIcon from "../img/thumbs-up-icon.png"
import thumbsDownIcon from "../img/thumbs-down-icon.png"


function TestResultsView({TestId, correctAnswers, answerIndex}){

    const { loadData } = useContext(Context)
    const navigate = useNavigate()
    const numberOfQuestions = answerIndex +1;
    const percentageScore = ((correctAnswers/numberOfQuestions)*100);

    const [testData, setTestData] = useState([]);
    const [isDataLoaded, setIsDataLoaded] = useState(false)
    const [vote, setVote] = useState("none");
    let [numberOfLikes, setNumberOfLikes] = useState();
    let [numberOfDislikes, setNumberOfDislikes] = useState();
    let [timesCompleted, setTimesCompleted] = useState();
    let [averageScore, setAverageScore] = useState(0);

    useEffect(
        ()=>{
            fetchLoadTests(queryOptionalParamId + TestId, handlerResponseLoadData);
        },
        []
    );

    useEffect(
        ()=>{
            if (isDataLoaded){
                setAverageScore(
                    parseInt(
                        ((testData.averageScore*testData.timesCompleted) + percentageScore)/(testData.timesCompleted+1).toFixed(0)
                    )
                    
                    )
                setTimesCompleted(testData.timesCompleted+1)
                setNumberOfLikes(testData.numberOfLikes)
                setNumberOfDislikes(testData.numberOfDislikes)
            }
        },
        [isDataLoaded]
    );

    useEffect(
        ()=>{
            if (vote === "like"){
                setNumberOfLikes(testData.numberOfLikes+1)
                setNumberOfDislikes(testData.numberOfDislikes)
            } else if (vote === "dislike"){
                setNumberOfLikes(testData.numberOfLikes)
                setNumberOfDislikes(testData.numberOfDislikes+1)
            }
        },
        [vote]
    );

    function handlerClickVote(event){
        setVote(event.target.value)
    };

    function handlerResponseLoadData(data){
        setTestData(data)
        setIsDataLoaded(true)
    };

    function handlerClickReturnToList(){
        fetchUpdateTest(
            TestId,
            { numberOfLikes, numberOfDislikes, timesCompleted, averageScore },
            handlerResponse
        )
    };

    function handlerResponse(_){
        loadData()
        navigate("/")
    };

    return(
        <>
            <h2>Acertaste {correctAnswers} de {numberOfQuestions}</h2>
            <p className={styles.scoreDisplay}>🗲{percentageScore}%</p>
            <div className={styles.voteButtonsContainer}>
                <input type="image"
                    className={
                        [
                            styles.voteButton,
                            vote === "like" ? styles.lockedVote : ""
                        ].join(" ") 
                    }
                    img src={thumbsUpIcon} 
                    alt="Icono de Pulgar Arriba"
                    onClick={handlerClickVote} 
                    value="like"
                />
                <input type="image" 
                    className={
                        [
                            styles.voteButton,
                            vote === "dislike" ? styles.lockedVote : ""
                        ].join(" ") 
                    }
                    src={thumbsDownIcon} 
                    alt="Icono de Pulgar Abajo" 
                    onClick={handlerClickVote} 
                    value="dislike" 
                />
            </div>
            <p className={vote === "none" ? styles.invisibleText : styles.blueText}>
                ¡Gracias por tu opinion!
            </p>
            <button onClick={handlerClickReturnToList}>Volver</button>
        </>
    );

};

export default TestResultsView