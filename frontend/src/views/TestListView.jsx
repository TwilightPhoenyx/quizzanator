import TestInfo from "../components/TestInfo.jsx"

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

