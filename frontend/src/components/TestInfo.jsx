import { useEffect, useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../services/ContextComponent.jsx";

import { fetchDeleteTest } from "../lib/fetch/fetchTest.mjs";

import styles from "./styles/TestInfo.module.css"
import thumbsUpIcon from "../img/thumbs-up-icon.png"
import thumbsDownIcon from "../img/thumbs-down-icon.png"


function TestInfo({loadData, testData, isPublic}){

    const { token, setNotification } = useContext(Context); //Tomamos el sólo loadData del objeto guadrado en Context
    const navigate = useNavigate();

    const [likePercentage, setLikePercentage] = useState();
    const timesLiked = testData.numberOfLikes;
    const timesDisliked = testData.numberOfDislikes;
    const TestId = testData.id;
    const UserId = testData.UserId;

    useEffect(
        calculateLikePercentage,
        []
    );

    function handlerClickDeleteTest(){
        fetchDeleteTest(
            TestId,
            token,
            handlerResponse,
            setNotification
        )
    };

    function handlerClickEditTest(){
        navigate("/test_creation/"+ TestId)
    }

    function handlerResponse(_) {
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
        <span className={
            [
                styles.listElementContainer,
                testData.isPublished === true ? styles.blueBackground : styles.grayBackground,
            ].join(" ")       
        }>
            {isPublic && 
                <Link to={"/take_a_test/" + TestId + "/" + testData.title} >
                    <p className={
                        [
                            styles.testTitleDisplay,
                            styles.higlightListLinkHover
                        ].join(" ")
                    }>
                        ⮞ {testData.title}
                    </p>
                </Link>
            }
            {isPublic === false && 
                <p className={styles.testTitleDisplay}>
                        {testData.title}
                </p>
            }
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
                {isPublic === false && <button className="mini-button" onClick={handlerClickEditTest}>✎</button>}
                {isPublic === false && <button className="mini-button" onClick={handlerClickDeleteTest}>✘</button>}
            </span>
        </span>
    )

};

export default TestInfo;