import { useEffect, useState, useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";
import TestInfo from "./TestInfo.jsx"

import { fetchLoadUserTests } from "../lib/fetch/fetchTest.mjs";

import styles from "./styles/UserTestList.module.css"


function UserTestList (){

    const { token, setNotification } = useContext(Context);
    const [loadedTests, setLoadedTests] = useState([])

    useEffect(
        loadUserTests,
        []
    );
    
    function loadUserTests(){
        fetchLoadUserTests("", token, setLoadedTests, setNotification);
    };     

    return(
        <>
            <ul>
            {loadedTests.map(
                test=><li key={test.id}>
                    <TestInfo loadData={loadUserTests} testData={test} isPublic={false}/>
                </li>
                )
            }
            </ul>
        </>
    );

}

export default UserTestList;