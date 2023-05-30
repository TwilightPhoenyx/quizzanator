import { baseUrl, pathAPIVersion, pathAPITest } from "../config.mjs"
import handlerExceptions from "../handlerExceptions.mjs"



//POST

async function fetchNewTest(testData, jwt, handlerResponse=()=>{}, notification) {
    try {
        const testDataJSON = JSON.stringify(testData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer "+jwt
                },
                body: testDataJSON
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

async function fetchLoadTests( optionalId, optionalUser, handlerResponse=()=>{}, notification) {
    try {
        const response = await fetch(baseUrl + pathAPIVersion + pathAPITest + optionalId + optionalUser)
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            notification("No se pudo obtener la lista de tests")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};

async function fetchLoadUserTests( optionalId, jwt, handlerResponse=()=>{}, notification) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + "/user" + pathAPITest + optionalId,
            {
                headers: {
                    authorization: "Bearer "+jwt
                },
            }
        )
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            notification("No se pudo obtener la lista de tests")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};

//PUT

async function fetchUpdateTest(TestId, testData, jwt, handlerResponse=()=>{}, notification) {
    try {
        const testDataJSON = JSON.stringify(testData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    authorization: "Bearer "+jwt
                },
                body: testDataJSON
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

async function fetchUpdateTestStats(TestId, testData, handlerResponse=()=>{}, notification) {
    try {
        const testDataJSON = JSON.stringify(testData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId + "/stats/",
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: testDataJSON
            }
        )
        if (response.ok) {
            handlerResponse(response)
        } else {
            notification("Error al actualizar las estadísticas")
        }
    } catch (exception) {
        handlerExceptions(exception, notification)
    }
};


//DELETE

async function fetchDeleteTest(TestId, jwt, handlerResponse=()=>{}, notification) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId,
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
    fetchLoadTests,
    fetchLoadUserTests,
    fetchNewTest,
    fetchUpdateTest,
    fetchUpdateTestStats,
    fetchDeleteTest
};