import { baseUrl, pathAPIVersion, pathAPIUser, pathAPISession} from "../config.mjs"
import handlerExceptions from "../handlerExceptions.mjs"



//POST

//Sign In
async function fetchNewUser(userData, handlerResponse=()=>{}) {
    try {
        const userDataJSON = JSON.stringify(userData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPIUser,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userDataJSON
            }
        )
        if (response.ok) {
            handlerResponse(response)
        } else {
            alert("Error en el registro. Inténtelo más tarde")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};

//Login
async function fetchNewSession(userData, handlerResponse=()=>{}) {
    try {
        const userDataJSON = JSON.stringify(userData)
        const response = await fetch(
            baseUrl + pathAPIVersion + pathAPISession,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: userDataJSON
            }
        )
        if (response.ok) {
            const token = await response.text()
            handlerResponse(token)
        } else {
            console.log(response)
            alert("No se pudo iniciar sesión. Compruebe los datos")
        }
    } catch (exception) {
        handlerExceptions(exception)
    }
};

export {
    fetchNewUser,
    fetchNewSession,
}