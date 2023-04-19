import TestInfo from "./TestInfo";

function LoadTests ({loadedTests, updateDataFunction}){

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

export default LoadTests

