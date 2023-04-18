import { pathAPITest } from "./config.mjs"
import handlerExceptions from "./handlerExceptions.mjs"

const baseUrl = window.location.hostname === "localhost" ? "http://localhost:8000" : ""


async function fetchNewTest(testData, handlerResponse=()=>{}) {
    try {
        const testDataJSON = JSON.stringify(testData)
        const response = await fetch(
            baseUrl+pathAPITest,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: testDataJSON
            }
        )
        handlerResponse(response)
    } catch (exception) {
        handlerExceptions(exception)
    }
};

async function fetchLoadTests(handlerData=()=>{}) {
    try {
        const response = await fetch(baseUrl+pathAPITest)
        if (response.ok) {
            const data = await response.json()
            handlerData(data)
        } else {
            alert("No se pudo obtener la lista de tests. Intentélo más tarde.")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};

export {
    fetchLoadTests,
    fetchNewTest
};