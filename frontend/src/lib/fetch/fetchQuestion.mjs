import { baseUrl, pathAPIVersion, pathAPITest, pathAPIQuestion, pathAPIAnswer } from "../config.mjs"
import handlerExceptions from "../handlerExceptions.mjs"



//POST

async function fetchNewQuestion(TestId, questionData, jwt, handlerResponse=()=>{}) {
    try {
        const questionDataJSON = JSON.stringify(questionData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId + pathAPIQuestion,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer "+jwt
                },
                body: questionDataJSON
            }
        )
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            alert("No se pudo crear el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};


//GET

async function fetchLoadQuestion( optionalId, TestId, handlerResponse=()=>{}) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId + pathAPIQuestion + optionalId
            )
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            alert("No se pudo obtener los elementos")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};

async function fetchLoadAnswers(QuestionId, handlerResponse=()=>{}) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPIQuestion + QuestionId + pathAPIAnswer
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


//PUT

async function fetchUpdateQuestion(QuestionId, questionData, jwt, handlerResponse=()=>{}) {
    try {
        const questionDataJSON = JSON.stringify(questionData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPIQuestion + QuestionId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer "+jwt
                },
                body: questionDataJSON
            }
        )
        if (response.ok) {
            handlerResponse(response)
        } else {
            alert("No se pudo actualizar el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};


//DELETE

async function fetchDeleteQuestion(QuestionId, jwt, handlerResponse=()=>{}) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPIQuestion + QuestionId,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer "+jwt
                }
            }
            )
        if (response.ok) {
            handlerResponse(response)
        } else {
            alert("No se pudo borrar el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};


export {
    fetchNewQuestion,
    fetchLoadQuestion,
    fetchLoadAnswers,
    fetchUpdateQuestion,
    fetchDeleteQuestion,
};