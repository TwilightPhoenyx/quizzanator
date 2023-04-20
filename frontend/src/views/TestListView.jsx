import TestInfo from "../components/TestInfo.jsx"

function TestListView ({loadedTests, updateDataFunction}){

    return(
        <ul>Listado de Test
        {loadedTests.map(
            test=><li key={test.id}>
                <TestInfo testData={test} updateDataFunction={updateDataFunction}/>
            </li>
            )
        }
        </ul>
    );

}

export default TestListView

