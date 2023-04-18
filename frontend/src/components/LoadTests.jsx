
function LoadTests ({loadedTests, updateDataFunction}){

    return(
        <>
            <h2>Listado de Tests</h2>
            {loadedTests.map( test=> <p key={test.id}>
                                    {test.title} / 
                                    {test.averageScore}% / 
                                    {test.numberOfLikes}👍 /
                                    {test.numberOfDislikes}👎 /
                                    {test.timesCompleted} veces hecho
                                    </p>
            )}
        </>
    )

}

export default LoadTests

