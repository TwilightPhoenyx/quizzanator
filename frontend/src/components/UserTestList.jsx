import TestInfo from "./TestInfo.jsx"


function UserTestList({loadUserTests, loadedTests, isPublic}){

    return(
        <>
            <ul>
            {loadedTests.map(
                test=><li key={test.id}>
                    <TestInfo loadData={loadUserTests} testData={test} isPublic={isPublic}/>
                </li>
                )
            }
            </ul>
        </>
    );

}

export default UserTestList;