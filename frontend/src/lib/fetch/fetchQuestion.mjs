import { baseUrl, pathAPIVersion, pathAPITest, pathAPIQuestion } from "../config.mjs"
import handlerExceptions from "../handlerExceptions.mjs"



//POST

async function fetchNewQuestion(TestId, questionData, handlerResponse=()=>{}) {
    try {
        const questionDataJSON = JSON.stringify(questionData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId + pathAPIQuestion,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: questionDataJSON
            }
        )
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            alert("No se pudo crear el elemento. Inténtelo más tarde")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};


//GET

async function fetchLoadQuestion(TestId, handlerResponse=()=>{}) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId + pathAPIQuestion
            )
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            alert("No se pudo obtener los elementos. Intentélo más tarde.")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};

export {
    fetchNewQuestion,
    fetchLoadQuestion
};