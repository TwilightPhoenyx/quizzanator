import { baseUrl, pathAPIVersion, pathAPITest } from "../config.mjs"
import handlerExceptions from "../handlerExceptions.mjs"



//POST

async function fetchNewTest(testData, jwt, handlerResponse=()=>{}) {
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
            alert("No se pudo crear el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};


//GET

async function fetchLoadTests( optionalId, handlerResponse=()=>{}) {
    try {
        const response = await fetch(baseUrl + pathAPIVersion + pathAPITest + optionalId)
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            alert("No se pudo obtener la lista de tests")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};

//PUT

async function fetchUpdateTest(TestId, testData, jwt, handlerResponse=()=>{}) {
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
            alert("No se pudo actualizar el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};

async function fetchUpdateTestStats(TestId, testData, handlerResponse=()=>{}) {
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
            alert("Error al actualizar las estadísticas")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};


//DELETE

async function fetchDeleteTest(TestId, jwt, handlerResponse=()=>{}) {
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
            alert("No se pudo borrar el elemento")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};


export {
    fetchLoadTests,
    fetchNewTest,
    fetchUpdateTest,
    fetchUpdateTestStats,
    fetchDeleteTest
};