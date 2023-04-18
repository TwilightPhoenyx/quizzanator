function TestInfo({testData, updateDataFunction}){

    return(
        <p>
            {testData.title} / 
            {testData.averageScore}% / 
            {testData.numberOfLikes}👍 /
            {testData.numberOfDislikes}👎 /
            {testData.timesCompleted} veces hecho
        </p>
    )

};

export default TestInfo;