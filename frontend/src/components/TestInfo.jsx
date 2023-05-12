import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../services/ContextComponent.jsx";

import { fetchDeleteTest } from "../lib/fetch/fetchTest.mjs";

import styles from "./styles/TestInfo.module.css"
import thumbsUpIcon from "../img/thumbs-up-icon.png"
import thumbsDownIcon from "../img/thumbs-down-icon.png"


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
        <span className={styles.testListElement}>
            <Link to={"/take_a_test/" + TestId + "/" + testData.title} >
                <p className={styles.testTitleDisplay}>
                    ⮞ {testData.title}
                </p>
            </Link>
            <span className={styles.listElementData}>
                <span>
                    <p className={styles.scoreDisplay}>🗲{testData.averageScore}%</p>
                    {/*<p className={styles.smallText}>de {testData.timesCompleted}</p>*/}
                </span>
                <span className={styles.likesDisplay}>
                    <img 
                        className={styles.icon} 
                        src={likePercentage >= 50 ? thumbsUpIcon : thumbsDownIcon} 
                        alt="Icono de Pulgar" 
                    />
                    {likePercentage}%
                </span>
                <button className={styles.deleteButton} onClick={handlerClickDelete}>✘</button>
            </span>
        </span>
    )

};

export default TestInfo;