import { baseUrl, pathAPIVersion, pathAPITest, pathAPIQuestion, pathAPIAnswer } from "../config.mjs"
import handlerExceptions from "../handlerExceptions.mjs"



//POST

async function fetchNewQuestion(TestId, questionData, jwt, handlerResponse=()=>{}, notification) {
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
            notification("No se pudo crear el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};


//GET

async function fetchLoadQuestion( optionalId, TestId, handlerResponse=()=>{}, notification) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId + pathAPIQuestion + optionalId
            )
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            notification("No se pudo obtener los elementos")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};

async function fetchLoadAnswers(QuestionId, handlerResponse=()=>{}, notification) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPIQuestion + QuestionId + pathAPIAnswer
            )
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            notification("No se pudo obtener los elementos. Intentélo más tarde.")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};


//PUT

async function fetchUpdateQuestion(QuestionId, questionData, jwt, handlerResponse=()=>{}, notification) {
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
            notification("No se pudo actualizar el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};


//DELETE

async function fetchDeleteQuestion(QuestionId, jwt, handlerResponse=()=>{}, notification) {
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
            notification("No se pudo borrar el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};


export {
    fetchNewQuestion,
    fetchLoadQuestion,
    fetchLoadAnswers,
    fetchUpdateQuestion,
    fetchDeleteQuestion,
};