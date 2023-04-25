import TestInfo from "../components/TestInfo.jsx"
import { useContext } from "react";
import { Context } from "../services/ContextComponent.jsx";

function TestListView ({loadedTests}){


    return(
        <ul>Listado de Test
        {loadedTests.map(
            test=><li key={test.id}>
                <TestInfo testData={test}/>
            </li>
            )
        }
        </ul>
    );

}

export default TestListView;

