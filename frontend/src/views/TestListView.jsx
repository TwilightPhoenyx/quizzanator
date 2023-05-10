import TestInfo from "../components/TestInfo.jsx"

import "./styles/TestListView.module.css"

function TestListView ({loadedTests}){

    return(
        <>
            <h2>Escoge un test y ponte a prueba:</h2>
            <ul className>
            {loadedTests.map(
                test=><li key={test.id}>
                    <TestInfo testData={test}/>
                </li>
                )
            }
            </ul>
        </>
    );

}

export default TestListView;

