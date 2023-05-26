import TestInfo from "../components/TestInfo.jsx"

import "./styles/TestListView.module.css"

function TestListView ({loadedTests}){

    return(
        <>
            <h2>Escoge un test y ponte a prueba:</h2>
            <ul>
            {loadedTests.map(
                test=><li key={test.id}>
                    <TestInfo testData={test} isPublic={true}/>
                </li>
                )
            }
            </ul>
        </>
    );

}

export default TestListView;

