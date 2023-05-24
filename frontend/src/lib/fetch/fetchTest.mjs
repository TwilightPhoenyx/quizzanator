import { baseUrl, pathAPIVersion, pathAPITest } from "../config.mjs"
import handlerExceptions from "../handlerExceptions.mjs"



//POST

async function fetchNewTest(testData, handlerResponse=()=>{}) {
    try {
        const testDataJSON = JSON.stringify(testData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: testDataJSON
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

async function fetchLoadTests( optionalId, handlerResponse=()=>{}) {
    try {
        const response = await fetch(baseUrl + pathAPIVersion + pathAPITest + optionalId)
        if (response.ok) {
            const data = await response.json()
            handlerResponse(data)
        } else {
            alert("No se pudo obtener la lista de tests. Intentélo más tarde.")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};

//PUT

async function fetchUpdateTest(TestId, testData, handlerResponse=()=>{}) {
    try {
        const testDataJSON = JSON.stringify(testData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId,
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
            alert("No se pudo actualizar el elemento. Inténtelo más tarde")
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

async function fetchDeleteTest(TestId, handlerResponse=()=>{}) {
    try {
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPITest + TestId,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            }
            )
        if (response.ok) {
            handlerResponse(response)
        } else {
            alert("No se pudo borrar el elemento. Inténtelo más tarde")
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