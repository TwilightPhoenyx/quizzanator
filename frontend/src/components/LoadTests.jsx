import TestInfo from "./TestInfo";

function LoadTests ({loadedTests, updateDataFunction}){

    return(
        <ol>Listado de Test
        {loadedTests.map(
            test=><li key={test.id}>
                <TestInfo testData={test} updateDataFunction={updateDataFunction}/>
            </li>
            )
        }
        </ol>
    );

}

export default LoadTests

